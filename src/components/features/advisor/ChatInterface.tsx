'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Loader2, SendHorizontal, User } from 'lucide-react';
import { TradeApprovalCall, TradeApprovalCard } from './TradeApprovalCard';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface ChatInterfaceProps {
  portfolioId?: string;
}

interface ParsedSseEvent {
  event: string;
  data: string;
}

const QUICK_PROMPTS = [
  'Should I buy AAPL this week?',
  'Explain whether TSLA looks risky right now.',
  'Give me a beginner-friendly market update.',
];

function parseSseBlock(block: string): ParsedSseEvent | null {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return null;
  }

  let event = 'message';
  let data = '';

  for (const line of lines) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
      continue;
    }
    if (line.startsWith('data:')) {
      data += line.slice(5).trim();
    }
  }

  return { event, data };
}

export function ChatInterface({ portfolioId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [toolCalls, setToolCalls] = useState<TradeApprovalCall[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, toolCalls]);

  const canSubmit = input.trim().length > 0 && !isStreaming;

  const activePromptButtons = useMemo(
    () => QUICK_PROMPTS.filter((prompt) => !messages.some((msg) => msg.content === prompt)),
    [messages],
  );

  async function streamAssistantResponse(nextMessages: ChatMessage[]) {
    const assistantMessageId = `assistant_${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);
    setIsStreaming(true);
    setStreamError(null);

    const accessToken =
      (typeof window !== 'undefined' && localStorage.getItem('access_token')) ||
      (typeof window !== 'undefined' && localStorage.getItem('authToken')) ||
      '';

    try {
      const response = await fetch('/api/advisor/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'x-access-token': accessToken } : {}),
        },
        body: JSON.stringify({
          id: assistantMessageId,
          portfolio_id: portfolioId,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Advisor stream failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split('\n\n');
        buffer = blocks.pop() ?? '';

        for (const block of blocks) {
          const parsed = parseSseBlock(block);
          if (!parsed || !parsed.data) {
            continue;
          }

          if (parsed.event === 'text-delta') {
            const payload = JSON.parse(parsed.data) as { delta?: string };
            const delta = payload.delta ?? '';
            if (!delta) {
              continue;
            }

            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessageId
                  ? { ...message, content: message.content + delta }
                  : message,
              ),
            );
            continue;
          }

          if (parsed.event === 'tool-call') {
            const payload = JSON.parse(parsed.data) as Partial<TradeApprovalCall>;
            if (!payload?.id) {
              continue;
            }

            const normalizedCall: TradeApprovalCall = {
              id: payload.id,
              toolName: payload.toolName || 'trade_approval',
              args: {
                symbol: payload.args?.symbol || 'N/A',
                action: payload.args?.action || 'buy',
                notional_usd: Number(payload.args?.notional_usd ?? 0),
                reason: payload.args?.reason,
              },
              state: 'pending',
            };

            setToolCalls((prev) => {
              if (prev.some((toolCall) => toolCall.id === normalizedCall.id)) {
                return prev;
              }
              return [...prev, normalizedCall];
            });
            continue;
          }

          if (parsed.event === 'error') {
            const payload = JSON.parse(parsed.data) as { message?: string; error?: string };
            setStreamError(payload.message || payload.error || 'Advisor stream failed');
          }
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected advisor chat error';
      setStreamError(message);
    } finally {
      setIsStreaming(false);
    }
  }

  async function handleSendMessage(text: string) {
    const normalized = text.trim();
    if (!normalized || isStreaming) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: normalized,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    await streamAssistantResponse(nextMessages);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await handleSendMessage(input);
  }

  function handleToolCallState(callId: string, state: 'approved' | 'rejected') {
    setToolCalls((prev) =>
      prev.map((call) => (call.id === callId ? { ...call, state } : call)),
    );
  }

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="border-b border-[rgb(var(--border))] px-5 py-4">
        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">AI Financial Advisor</h2>
        <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
          Ask plain-English questions. You will get real-time guidance and trade approvals when needed.
        </p>
      </div>

      <div className="space-y-4 p-5">
        {!messages.length && (
          <div className="rounded-lg border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 p-4">
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Start by asking about a stock, your risk level, or what today&apos;s market means in simple terms.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activePromptButtons.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isStreaming}
                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))] transition hover:text-[rgb(var(--foreground))] disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10">
                    <Bot className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[rgb(var(--primary))] text-white'
                      : 'border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))]'
                  }`}
                >
                  {message.content || (isStreaming && !isUser ? '...' : '')}
                </div>

                {isUser && (
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(var(--muted))]">
                    <User className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            );
          })}

          {toolCalls.length > 0 && (
            <div className="space-y-3 pt-2">
              {toolCalls.map((call) => (
                <TradeApprovalCard
                  key={call.id}
                  call={call}
                  onApprove={(callId) => handleToolCallState(callId, 'approved')}
                  onReject={(callId) => handleToolCallState(callId, 'rejected')}
                />
              ))}
            </div>
          )}

          {isStreaming && (
            <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Streaming analysis...
            </div>
          )}

          {streamError && (
            <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-3 py-2 text-xs text-[rgb(var(--destructive))]">
              {streamError}
            </div>
          )}

          <div ref={scrollAnchorRef} />
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-[rgb(var(--border))] pt-4">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask your advisor a question..."
            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--primary))] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
