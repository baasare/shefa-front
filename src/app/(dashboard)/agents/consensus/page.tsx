'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, ChevronDown, CheckCircle2, Loader2, Sparkles, Brain, Lock, Activity, AlertCircle } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';
import { getPortfolios, Portfolio } from '@/lib/api/portfolios';
import { routes } from '@/lib/config/routes';

const availableAgents = [
    { id: 'analysis', name: 'Analysis Agent', icon: Brain },
    { id: 'trade', name: 'Trade Agent', icon: Activity },
    { id: 'risk', name: 'Risk Agent', icon: Lock },
];

export default function ConsensusPage() {
    const [selectedAgents, setSelectedAgents] = useState<string[]>(['analysis', 'risk']);
    const [symbols, setSymbols] = useState('TSLA, AAPL');
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [running, setRunning] = useState(false);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [taskState, setTaskState] = useState<'idle' | 'pending' | 'running' | 'success' | 'error'>('idle');
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const [expandedAgent, setExpandedAgent] = useState<string | null>('analysis');

    // Load portfolios on mount
    useEffect(() => {
        async function loadPortfolios() {
            try {
                const data = await getPortfolios();
                setPortfolios(data);
                if (data.length > 0) {
                    setSelectedPortfolio(data[0].id);
                }
            } catch (err) {
                console.error('Failed to load portfolios:', err);
            }
        }
        loadPortfolios();
    }, []);

    // Poll task status
    useEffect(() => {
        if (!taskId) return;

        const interval = setInterval(async () => {
            try {
                const status = await agentApi.getTaskStatus(taskId);

                if (status.state === 'SUCCESS') {
                    setTaskState('success');
                    setResults(status.result);
                    setRunning(false);
                    clearInterval(interval);
                } else if (status.state === 'FAILURE') {
                    setTaskState('error');
                    setError(status.error || 'Consensus analysis failed');
                    setRunning(false);
                    clearInterval(interval);
                } else if (status.state === 'STARTED') {
                    setTaskState('running');
                } else {
                    setTaskState('pending');
                }
            } catch (err: unknown) {
                console.error('Failed to check task status:', err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [taskId]);

    function toggleAgent(id: string) {
        setSelectedAgents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }

    async function handleRunConsensus() {
        if (selectedAgents.length < 2 || !symbols.trim() || !selectedPortfolio) {
            setError('Please select at least 2 agents, enter symbols, and select a portfolio');
            return;
        }

        setRunning(true);
        setResults(null);
        setError(null);
        setTaskState('pending');

        try {
            // Parse symbols from comma-separated string
            const symbolArray = symbols.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

            if (symbolArray.length === 0) {
                setError('Please enter at least one symbol');
                setRunning(false);
                return;
            }

            const response = await agentApi.multiAgentConsensus(selectedPortfolio, symbolArray);
            setTaskId(response.task_id);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string } } };
            setError(error.response?.data?.error || 'Failed to start consensus analysis');
            setRunning(false);
            setTaskState('error');
        }
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
                    {/* Portfolio Selection */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Portfolio *</label>
                        <select
                            value={selectedPortfolio}
                            onChange={(e) => setSelectedPortfolio(e.target.value)}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
                        >
                            {portfolios.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

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
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Symbols (comma-separated) *</label>
                        <input
                            type="text"
                            value={symbols}
                            onChange={(e) => setSymbols(e.target.value)}
                            placeholder="e.g. AAPL, MSFT, TSLA"
                            className="font-mono w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 py-3 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-[rgb(var(--primary))] uppercase"
                        />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgb(var(--destructive))]/10 border border-[rgb(var(--destructive))]/20">
                            <AlertCircle className="h-4 w-4 text-[rgb(var(--destructive))]" />
                            <span className="text-sm text-[rgb(var(--destructive))]">{error}</span>
                        </div>
                    )}

                    {/* Task Status */}
                    {taskId && taskState !== 'success' && taskState !== 'error' && (
                        <div className="flex items-center gap-2 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin text-[rgb(var(--primary))]" />
                            <span className="text-[rgb(var(--muted-foreground))]">
                                {taskState === 'pending' ? 'Queuing analysis...' : 'Analysis in progress...'}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={handleRunConsensus}
                        disabled={running || selectedAgents.length < 2 || !symbols.trim() || !selectedPortfolio}
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
                            {/* Results Display */}
                            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden shadow-sm relative pt-1">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--success))]" />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-[rgb(var(--foreground))] flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-[rgb(var(--success))]" />
                                            Consensus Analysis Results
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-[rgb(var(--foreground))]">Symbols:</span>{' '}
                                            <span className="text-sm font-mono text-[rgb(var(--muted-foreground))]">{symbols}</span>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[rgb(var(--muted))]/20">
                                            <pre className="text-xs text-[rgb(var(--foreground))] whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                                                {JSON.stringify(results, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
