'use client';

import { useState, useEffect } from 'react';
import { Brain, Sparkles, LineChart, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';
import { getPortfolios } from '@/lib/api/portfolios';

const analysisTypes = [
    { id: 'technical', icon: LineChart, label: 'Technical Analysis', desc: 'EMA, RSI, MACD, Bollinger Bands and more.' },
    { id: 'sentiment', icon: Sparkles, label: 'Sentiment Analysis', desc: 'NLP scan across news and social media.' },
    { id: 'fundamental', icon: FileText, label: 'Fundamental Analysis', desc: 'Earnings, PE ratio, revenue growth.' },
];

export default function AgentAnalysisClient() {
    const [symbol, setSymbol] = useState('');
    const [analysisType, setAnalysisType] = useState('technical');
    const [timeFrame, setTimeFrame] = useState('short');
    const [instructions, setInstructions] = useState('');
    const [portfolios, setPortfolios] = useState<any[]>([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [loading, setLoading] = useState(false);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [taskState, setTaskState] = useState<'idle' | 'pending' | 'running' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

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
                    setResult(status.result);
                    setLoading(false);
                    clearInterval(interval);
                } else if (status.state === 'FAILURE') {
                    setTaskState('error');
                    setError(status.error || 'Analysis failed');
                    setLoading(false);
                    clearInterval(interval);
                } else if (status.state === 'STARTED') {
                    setTaskState('running');
                } else {
                    setTaskState('pending');
                }
            } catch (err: any) {
                console.error('Failed to check task status:', err);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(interval);
    }, [taskId]);

    async function handleRunAnalysis() {
        if (!symbol.trim()) {
            setError('Please enter a symbol');
            return;
        }

        if (!selectedPortfolio) {
            setError('Please select a portfolio');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setTaskState('pending');

        try {
            const response = await agentApi.analyzeStock(selectedPortfolio, symbol.toUpperCase());
            setTaskId(response.task_id);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to start analysis');
            setLoading(false);
            setTaskState('error');
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">New Analysis</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                    Request the built-in multi-agent system to evaluate a market
                </p>
            </div>

            {/* Request form */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                    <Brain className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Analysis Request</h2>
                </div>

                {/* Portfolio Selection */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Portfolio *</label>
                    <select
                        value={selectedPortfolio}
                        onChange={(e) => setSelectedPortfolio(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    >
                        {portfolios.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Symbol Input */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Symbol / Ticker *</label>
                    <input
                        type="text"
                        placeholder="e.g. AAPL, MSFT, TSLA"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] font-mono uppercase"
                    />
                </div>

                {/* Analysis Type */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Analysis Type *</label>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {analysisTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = analysisType === type.id;
                            return (
                                <label
                                    key={type.id}
                                    className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                                        isSelected
                                            ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                                            : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/40'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="analysisType"
                                        value={type.id}
                                        checked={isSelected}
                                        onChange={(e) => setAnalysisType(e.target.value)}
                                        className="sr-only"
                                    />
                                    <Icon className="h-5 w-5 text-[rgb(var(--primary))] mb-2" strokeWidth={1.5} />
                                    <span className="text-sm font-medium text-[rgb(var(--foreground))]">{type.label}</span>
                                    <span className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{type.desc}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Time Frame */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Time Frame</label>
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    >
                        <option value="short">Short-term (1–5 days)</option>
                        <option value="medium">Medium-term (1–4 weeks)</option>
                        <option value="long">Long-term (1–6 months)</option>
                    </select>
                </div>

                {/* Additional Instructions */}
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Additional Instructions</label>
                    <textarea
                        rows={3}
                        placeholder="Any specific focus areas for the analysis..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
                    />
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[rgb(var(--destructive))]/10 border border-[rgb(var(--destructive))]/20">
                        <AlertCircle className="h-4 w-4 text-[rgb(var(--destructive))]" />
                        <span className="text-sm text-[rgb(var(--destructive))]">{error}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleRunAnalysis}
                    disabled={loading || !symbol.trim() || !selectedPortfolio}
                    className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Brain className="h-4 w-4" strokeWidth={1.5} />
                            Run Analysis
                        </>
                    )}
                </button>

                {/* Task Status */}
                {taskId && (
                    <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm">
                            {taskState === 'pending' && (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin text-[rgb(var(--primary))]" />
                                    <span className="text-[rgb(var(--muted-foreground))]">Queuing analysis...</span>
                                </>
                            )}
                            {taskState === 'running' && (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin text-[rgb(var(--primary))]" />
                                    <span className="text-[rgb(var(--muted-foreground))]">Analysis in progress...</span>
                                </>
                            )}
                            {taskState === 'success' && (
                                <>
                                    <CheckCircle2 className="h-4 w-4 text-[rgb(var(--success))]" />
                                    <span className="text-[rgb(var(--success))]">Analysis complete!</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Results Display */}
            {result && (
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-[rgb(var(--success))]" />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Analysis Results</h2>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-[rgb(var(--foreground))]">Symbol:</span>{' '}
                            <span className="text-sm font-mono text-[rgb(var(--muted-foreground))]">{symbol}</span>
                        </div>
                        <div className="p-4 rounded-lg bg-[rgb(var(--muted))]/20">
                            <pre className="text-xs text-[rgb(var(--foreground))] whitespace-pre-wrap font-mono">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
