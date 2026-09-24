'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { createParser } from 'eventsource-parser';
import { Activity, Bot, Loader2, Pause, Play, Plus, RefreshCw, Square, Sparkles } from 'lucide-react';
import { botsApi, PaperBot, PaperBotEvent, PaperBotInput, PaperBotRun } from '@/lib/api/bots';
import { tokenStorage } from '@/lib/utils/cookies';
import { API_BASE } from '@/lib/api/config';

const blank: PaperBotInput = {
  name: '', idea: '', symbols: ['AAPL'], max_order_value: 100,
  max_open_positions: 3, daily_loss_limit_pct: 2, run_frequency_minutes: 15,
};

function messageFrom(error: unknown) {
  const e = error as { response?: { data?: { detail?: string; [key: string]: unknown } }; message?: string };
  const data = e.response?.data;
  if (typeof data?.detail === 'string') return data.detail;
  if (data) return Object.entries(data).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`).join(' · ');
  return e.message || 'Request failed. Please try again.';
}

export default function PaperTradingClient() {
  const [bots, setBots] = useState<PaperBot[]>([]);
  const [events, setEvents] = useState<Record<string, PaperBotEvent[]>>({});
  const [runs, setRuns] = useState<Record<string, PaperBotRun[]>>({});
  const [form, setForm] = useState<PaperBotInput>(blank);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refresh = useCallback(async () => {
    const items = await botsApi.list();
    setBots(items);
    const detailPairs = await Promise.all(items.map(async (bot) => {
      try {
        const [eventItems, runItems] = await Promise.all([botsApi.events(bot.id), botsApi.runs(bot.id)]);
        return [bot.id, eventItems, runItems] as [string, PaperBotEvent[], PaperBotRun[]];
      } catch { return [bot.id, [], []] as [string, PaperBotEvent[], PaperBotRun[]]; }
    }));
    setEvents(Object.fromEntries(detailPairs.map(([id, value]) => [id, value])));
    setRuns(Object.fromEntries(detailPairs.map(([id, , value]) => [id, value])));
  }, []);

  useEffect(() => {
    refresh().catch((e) => setError(messageFrom(e))).finally(() => setLoading(false));
  }, [refresh]);

  useEffect(() => {
    const activeBots = bots.filter(bot => bot.status === 'active');
    if (!activeBots.length) return;
    const controllers = activeBots.map(bot => {
      const controller = new AbortController();
      let retryTimer: ReturnType<typeof setTimeout> | undefined;
      let lastEventId = 0;
      const connect = async () => {
        try {
          const token = tokenStorage.getAccess();
          if (!token) return;
          const response = await fetch(`${API_BASE}bots/${bot.id}/stream/`, {
            headers: { Authorization: `Bearer ${token}`, ...(lastEventId ? { 'Last-Event-ID': String(lastEventId) } : {}) },
            cache: 'no-store', signal: controller.signal,
          });
          if (!response.ok || !response.body) throw new Error('Bot activity stream unavailable');
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const parser = createParser({ onEvent: (message) => {
            try {
              const event = JSON.parse(message.data) as PaperBotEvent;
              lastEventId = Number(message.id || event.id || lastEventId);
              setEvents(current => ({ ...current, [bot.id]: [...(current[bot.id] || []).filter(item => item.id !== event.id), event].slice(-200) }));
              if (event.event_type === 'run_completed' || event.event_type === 'error') {
                botsApi.runs(bot.id).then(items => setRuns(current => ({ ...current, [bot.id]: items }))).catch(() => {});
              }
            } catch { /* Ignore malformed server events and keep the stream alive. */ }
          } });
          while (!controller.signal.aborted) {
            const { value, done } = await reader.read();
            if (done) break;
            parser.feed(decoder.decode(value, { stream: true }));
          }
          if (!controller.signal.aborted) retryTimer = setTimeout(connect, 1500);
        } catch {
          if (!controller.signal.aborted) retryTimer = setTimeout(connect, 3000);
        }
      };
      connect();
      return { controller, stop: () => { controller.abort(); if (retryTimer) clearTimeout(retryTimer); } };
    });
    return () => controllers.forEach(item => item.stop());
  }, [bots]);

  async function createBot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setNotice(''); setSaving(true);
    try {
      const created = await botsApi.create({ ...form, symbols: form.symbols.map(s => s.trim().toUpperCase()).filter(Boolean) });
      setForm(blank); await refresh(); setNotice(`${created.name} saved as a paper-trading draft.`);
    } catch (e) { setError(messageFrom(e)); }
    finally { setSaving(false); }
  }

  async function draftWithAI() {
    if (!form.idea.trim()) { setError('Describe the trading idea first.'); return; }
    setError(''); setDrafting(true);
    try {
      const draft = await botsApi.draft(form.idea);
      setForm(current => ({ ...current, name: draft.name, idea: draft.instructions }));
      setNotice(draft.summary);
    } catch (e) { setError(messageFrom(e)); }
    finally { setDrafting(false); }
  }

  async function act(bot: PaperBot, action: 'start' | 'pause' | 'stop' | 'run') {
    setError(''); setNotice(''); setBusy(`${bot.id}:${action}`);
    try {
      if (action === 'start') await botsApi.start(bot.id);
      if (action === 'pause') await botsApi.pause(bot.id);
      if (action === 'stop') await botsApi.stop(bot.id);
      if (action === 'run') await botsApi.run(bot.id);
      setNotice(action === 'run' ? `A paper run for ${bot.name} was queued.` : `${bot.name} ${action === 'start' ? 'started' : action === 'pause' ? 'paused' : 'stopped'}.`);
      await refresh();
    } catch (e) { setError(messageFrom(e)); }
    finally { setBusy(null); }
  }

  return <div className="mx-auto max-w-5xl space-y-6">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div><div className="flex items-center gap-2 text-[rgb(var(--primary))]"><Bot className="h-5 w-5"/><span className="text-sm font-semibold">Version 3 · Paper only</span></div>
        <h1 className="mt-2 text-2xl font-bold text-[rgb(var(--foreground))]">AI paper trading</h1>
        <p className="mt-1 max-w-2xl text-sm text-[rgb(var(--muted-foreground))]">Turn a plain-language idea into a bounded paper bot. AI suggests buy, sell, or hold; server-side rules control every order.</p></div>
      <button onClick={() => { setLoading(true); refresh().catch(e => setError(messageFrom(e))).finally(() => setLoading(false)); }} className="inline-flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm"><RefreshCw className="h-4 w-4"/>Refresh</button>
    </header>

    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-[rgb(var(--foreground))]"><strong>Paper account only.</strong> This version does not support live trading, short selling, options, or crypto. A verified Alpaca paper connection and configured background worker are required to run a bot.</div>
    {error && <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600">{error}</div>}
    {notice && <div role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700">{notice}</div>}

    <section className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
      <h2 className="flex items-center gap-2 text-lg font-semibold"><Plus className="h-5 w-5"/>Create a bot</h2>
      <form onSubmit={createBot} className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Bot name<input required maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 py-2" placeholder="Steady trend watcher"/></label>
        <label className="text-sm font-medium">Stock or ETF symbols<input required value={form.symbols.join(', ')} onChange={e => setForm({ ...form, symbols: e.target.value.split(',').map(s => s.trim()) })} className="mt-1 w-full rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 py-2" placeholder="AAPL, MSFT"/></label>
        <label className="text-sm font-medium md:col-span-2">What should it look for?<textarea required minLength={1} maxLength={2000} rows={4} value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })} className="mt-1 w-full rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 py-2" placeholder="Only consider buying when the recent trend is positive. If the data is unclear, hold."/></label>
        <div className="flex flex-wrap items-end gap-3 md:col-span-2">
          <button type="button" disabled={drafting || !form.idea.trim()} onClick={draftWithAI} className="inline-flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm disabled:opacity-50">{drafting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4"/>}Improve with AI</button>
          <label className="text-sm">Max order $<input type="number" min={1} max={1000} step={1} value={form.max_order_value} onChange={e => setForm({ ...form, max_order_value: Number(e.target.value) })} className="ml-1 w-24 rounded-lg border border-[rgb(var(--border))] bg-transparent px-2 py-2"/></label>
          <label className="text-sm">Daily loss stop %<input type="number" min={0.1} max={5} step={0.1} value={form.daily_loss_limit_pct} onChange={e => setForm({ ...form, daily_loss_limit_pct: Number(e.target.value) })} className="ml-1 w-20 rounded-lg border border-[rgb(var(--border))] bg-transparent px-2 py-2"/></label>
          <button disabled={saving} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving && <Loader2 className="h-4 w-4 animate-spin"/>}Save draft</button>
        </div>
      </form>
    </section>

    <section className="space-y-3">
      <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Your paper bots</h2><span className="text-xs text-[rgb(var(--muted-foreground))]">Never connected to a live brokerage account</span></div>
      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin"/></div> : bots.length === 0 ? <div className="rounded-xl border border-dashed border-[rgb(var(--border))] p-10 text-center text-sm text-[rgb(var(--muted-foreground))]">No bots yet. Create a draft above, then connect and verify an Alpaca paper account to start it.</div> : bots.map(bot => <article key={bot.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{bot.name}</h3><span className="rounded-full bg-[rgb(var(--muted))] px-2 py-0.5 text-xs capitalize">{bot.status}</span></div><p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{bot.symbols.join(', ')} · up to ${bot.max_order_value} per order · {bot.run_frequency_minutes} min</p><p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm">{bot.idea}</p></div>
          <div className="flex flex-wrap gap-2">{bot.status === 'draft' || bot.status === 'paused' || bot.status === 'stopped' ? <button disabled={!!busy} onClick={() => act(bot, 'start')} className="inline-flex items-center gap-1 rounded-lg bg-[rgb(var(--primary))] px-3 py-2 text-sm text-white disabled:opacity-50"><Play className="h-4 w-4"/>Start</button> : null}{bot.status === 'active' ? <><button disabled={!!busy} onClick={() => act(bot, 'run')} className="inline-flex items-center gap-1 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm disabled:opacity-50"><Activity className="h-4 w-4"/>Run now</button><button disabled={!!busy} onClick={() => act(bot, 'pause')} className="inline-flex items-center gap-1 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm disabled:opacity-50"><Pause className="h-4 w-4"/>Pause</button></> : null}{bot.status !== 'stopped' ? <button disabled={!!busy} onClick={() => act(bot, 'stop')} className="inline-flex items-center gap-1 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-sm disabled:opacity-50"><Square className="h-4 w-4"/>Stop</button> : null}</div>
        </div>
        {!!runs[bot.id]?.length && <div className="mt-4 border-t border-[rgb(var(--border))] pt-3"><h4 className="mb-2 text-sm font-medium">Recent runs</h4><div className="space-y-2">{runs[bot.id].slice(0, 3).map(run => <div key={run.id} className="rounded-lg bg-[rgb(var(--muted))]/40 px-3 py-2 text-xs"><span className="font-medium capitalize">{run.status}</span><span className="ml-2 text-[rgb(var(--muted-foreground))]">{new Date(run.queued_at).toLocaleString()}</span>{run.error_message && <p className="mt-1 text-red-600">{run.error_message}</p>}{run.result?.decisions?.map((decision, i) => <p key={i} className="mt-1">{String(decision.symbol || '')}: {String(decision.action || '—')} {String(decision.explanation || decision.error || decision.blocked_reason || '')}</p>)}</div>)}</div></div>}
        {!!events[bot.id]?.length && <details className="mt-3"><summary className="cursor-pointer text-sm text-[rgb(var(--muted-foreground))]">Activity ({events[bot.id].length})</summary><ul className="mt-2 space-y-1">{events[bot.id].slice(-8).reverse().map(event => <li key={event.id} className="text-xs"><span className="mr-2 text-[rgb(var(--muted-foreground))]">{new Date(event.created_at).toLocaleTimeString()}</span>{event.message}</li>)}</ul></details>}
      </article>)}
    </section>
    <p className="text-xs text-[rgb(var(--muted-foreground))]">AI outputs are suggestions. Paper fills may not reflect real execution. Nothing here guarantees performance.</p>
  </div>;
}
