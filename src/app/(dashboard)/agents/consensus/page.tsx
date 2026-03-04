'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, ChevronDown, CheckCircle2, Loader2, Sparkles, Brain, Lock, Activity } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';
import { routes } from '@/lib/config/routes';

const availableAgents = [
    { id: 'analysis', name: 'Analysis Agent', icon: Brain },
    { id: 'trade', name: 'Trade Agent', icon: Activity },
    { id: 'risk', name: 'Risk Agent', icon: Lock },
];

export default function ConsensusPage() {
    const [selectedAgents, setSelectedAgents] = useState<string[]>(['analysis', 'risk']);
    const [prompt, setPrompt] = useState('Analyze the current technical breakout in TSLA and determine if a 5% portfolio allocation is within our VaR limits.');
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState<{
        status: string;
        finalConsensus: string;
        agentOutputs: { agentId: string; title: string; output: string }[];
    } | null>(null);

    const [expandedAgent, setExpandedAgent] = useState<string | null>('analysis');

    function toggleAgent(id: string) {
        setSelectedAgents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }

    async function handleRunConsensus() {
        if (selectedAgents.length < 2 || !prompt.trim()) return;

        setRunning(true);
        setResults(null);

        // Simulate multi-agent processing delay
        await new Promise(res => setTimeout(res, 2500));

        setResults({
            status: 'BULLISH',
            finalConsensus: 'Based on the combined analysis, TSLA is showing a strong technical breakout with high volume. The risk assessment confirms that a 5% allocation falls well within the 12% daily VaR limit. The consensus is to proceed with the execution.',
            agentOutputs: [
                {
                    agentId: 'analysis',
                    title: 'Analysis Agent',
                    output: 'TSLA has broken above the $242 resistance level on 150% average daily volume. MACD is crossing over, and RSI is at 62, indicating strong upward momentum without being overbought. Near-term price target is $265.'
                },
                {
                    agentId: 'risk',
                    title: 'Risk Agent',
                    output: 'A 5% allocation at current prices ($245) adds 0.8% to overall portfolio VaR. Current portfolio VaR is 4.2%, bringing total to 5.0%. This is well below our maximum threshold of 12%. Drawdown risk is acceptable. Approved.'
                },
                selectedAgents.includes('trade') ? {
                    agentId: 'trade',
                    title: 'Trade Agent',
                    output: 'Recommended execution: TWAP over next 30 minutes to minimize slippage. Limit price cap at $246.50. Stop loss suggested at $235.00.'
                } : null
            ].filter(Boolean) as { agentId: string; title: string; output: string }[]
        });

        setRunning(false);
    }

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div>
                <Link
                    href={routes.dashboard.agents.index}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Agents / Consensus
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Multi-Agent Consensus Analysis</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Trigger coordinated reasoning across multiple specialized AI agents simultaneously</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Input Column */}
                <div className="lg:col-span-5 space-y-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-3">Target Agents (Select at least 2)</label>
                        <div className="flex flex-wrap gap-2">
                            {availableAgents.map((agent) => {
                                const isSelected = selectedAgents.includes(agent.id);
                                const Icon = agent.icon;
                                return (
                                    <button
                                        key={agent.id}
                                        onClick={() => toggleAgent(agent.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${isSelected
                                                ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                                : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                                        {agent.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Analysis Prompt</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={8}
                            className="font-mono w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 py-3 text-sm leading-relaxed text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] resize-y"
                            placeholder="What scenario should the agents analyze together?"
                        />
                    </div>

                    <button
                        onClick={handleRunConsensus}
                        disabled={running || selectedAgents.length < 2 || !prompt.trim()}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-3 text-sm font-medium text-white shadow hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {running ? (
                            <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> Analyzing...</>
                        ) : (
                            <><Sparkles className="h-4 w-4" strokeWidth={2} /> Run Consensus Analysis</>
                        )}
                    </button>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                    {running && !results && (
                        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-pulse">
                            <Sparkles className="h-10 w-10 text-[rgb(var(--primary))] mb-4 animate-bounce" />
                            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Agents are deliberating...</h2>
                            <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2 max-w-sm">
                                Compacting insights from {selectedAgents.length} specialized models into a unified risk/reward profile.
                            </p>
                        </div>
                    )}

                    {!running && !results && (
                        <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/20 min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                            <Play className="h-10 w-10 text-[rgb(var(--muted-foreground))] mb-4 opacity-50" />
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">Select agents and run analysis to see results.</p>
                        </div>
                    )}

                    {results && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Final Consensus Summary */}
                            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden shadow-sm relative pt-1">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--success))]" />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-[rgb(var(--foreground))] flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-[rgb(var(--success))]" />
                                            Final Consensus
                                        </h2>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--success))]/10 px-2.5 py-1 text-xs font-bold text-[rgb(var(--success))] tracking-wider">
                                            {results.status}
                                        </span>
                                    </div>
                                    <p className="text-[rgb(var(--foreground))] text-sm leading-relaxed bg-[rgb(var(--muted))]/30 p-4 rounded-lg border border-[rgb(var(--border))]">
                                        {results.finalConsensus}
                                    </p>
                                </div>
                            </div>

                            {/* Per-Agent Outputs */}
                            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden shadow-sm">
                                <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
                                    <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Individual Agent Reasoning</h3>
                                </div>
                                <div className="divide-y divide-[rgb(var(--border))]">
                                    {results.agentOutputs.map((out) => (
                                        <div key={out.agentId} className="flex flex-col">
                                            <button
                                                onClick={() => setExpandedAgent(expandedAgent === out.agentId ? null : out.agentId)}
                                                className="flex items-center justify-between px-5 py-4 bg-[rgb(var(--card))] hover:bg-[rgb(var(--muted))]/30 transition-colors w-full text-left"
                                            >
                                                <span className="text-sm font-medium text-[rgb(var(--foreground))] flex items-center gap-2">
                                                    {out.title}
                                                </span>
                                                <ChevronDown className={`h-4 w-4 text-[rgb(var(--muted-foreground))] transition-transform ${expandedAgent === out.agentId ? 'rotate-180' : ''}`} />
                                            </button>
                                            {expandedAgent === out.agentId && (
                                                <div className="px-5 pb-4 pt-1 bg-[rgb(var(--muted))]/10">
                                                    <p className="text-xs text-[rgb(var(--muted-foreground))] font-mono leading-relaxed p-3 rounded bg-[rgb(var(--background))] border border-[rgb(var(--border))]">
                                                        {out.output}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
