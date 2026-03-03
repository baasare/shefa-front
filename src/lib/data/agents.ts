/**
 * Mock data for AI Agents
 * Replace with real API client when backend is ready.
 */

export type AgentStatus = 'Active' | 'Monitoring' | 'Waiting' | 'Paused' | 'Error';
export type LogType = 'info' | 'success' | 'warning' | 'error';

export interface AgentLog {
    id: string;
    time: string;
    agentId: string;
    agentName: string;
    event: string;
    type: LogType;
    details?: string;
}

export interface AgentDecision {
    id: string;
    agentId: string;
    agentName: string;
    action: string;
    symbol: string;
    reasoning: string;
    confidence: number;
    riskScore: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Executed';
    createdAt: string;
}

export const mockAgentLogs: AgentLog[] = [
    {
        id: 'log-001',
        time: '16:32:11',
        agentId: 'analysis',
        agentName: 'Analysis Agent',
        event: 'BTC sentiment score: 0.78 (Bullish)',
        type: 'info',
        details: 'Processed 1,240 news articles and 8,500 social posts',
    },
    {
        id: 'log-002',
        time: '16:29:04',
        agentId: 'risk',
        agentName: 'Risk Agent',
        event: 'Portfolio VaR within 5% daily limit',
        type: 'success',
        details: 'Current VaR: 3.2% | Limit: 5.0%',
    },
    {
        id: 'log-003',
        time: '16:27:05',
        agentId: 'trade',
        agentName: 'Trade Agent',
        event: 'AAPL Buy order filled — 10 shares at $182.50',
        type: 'success',
        details: 'Order ORD-001 fully filled on NYSE',
    },
    {
        id: 'log-004',
        time: '16:14:00',
        agentId: 'approval',
        agentName: 'Approval Agent',
        event: 'TSLA Sell flagged for human review',
        type: 'warning',
        details: 'Confidence: 82% | Risk score: 7.2/10 — exceeds auto-execute threshold',
    },
    {
        id: 'log-005',
        time: '16:08:33',
        agentId: 'analysis',
        agentName: 'Analysis Agent',
        event: 'MSFT earnings beat — signal upgraded to Strong Buy',
        type: 'info',
        details: 'EPS beat by 8.3%. Price target revised to $440.',
    },
    {
        id: 'log-006',
        time: '15:55:12',
        agentId: 'risk',
        agentName: 'Risk Agent',
        event: 'ETH drawdown exceeded 5% threshold — strategy paused',
        type: 'error',
        details: 'ML Sentiment strategy auto-paused. Current drawdown: 6.1%',
    },
    {
        id: 'log-007',
        time: '15:42:00',
        agentId: 'trade',
        agentName: 'Trade Agent',
        event: 'BTC Limit order placed at $61,200',
        type: 'info',
        details: 'Order ORD-002 submitted to exchange',
    },
    {
        id: 'log-008',
        time: '15:30:18',
        agentId: 'analysis',
        agentName: 'Analysis Agent',
        event: 'Market scan completed: 3 signals generated',
        type: 'success',
        details: 'Strong signals for AAPL (Buy), BTC (Buy), MSFT (Hold)',
    },
];

export const mockDecisions: AgentDecision[] = [
    {
        id: 'dec-001',
        agentId: 'approval',
        agentName: 'Approval Agent',
        action: 'Sell',
        symbol: 'TSLA',
        reasoning:
            'Momentum reversal detected. RSI overbought at 78, MACD bearish crossover. Strategy target reached at +15%.',
        confidence: 82,
        riskScore: 7.2,
        status: 'Pending',
        createdAt: '2024-12-20T16:14:00Z',
    },
    {
        id: 'dec-002',
        agentId: 'approval',
        agentName: 'Approval Agent',
        action: 'Buy',
        symbol: 'NVDA',
        reasoning:
            'Breakout above key resistance at $870. Volume 2.3x average. AI chip demand catalyst from CES announcement.',
        confidence: 75,
        riskScore: 6.8,
        status: 'Pending',
        createdAt: '2024-12-20T15:28:44Z',
    },
    {
        id: 'dec-003',
        agentId: 'approval',
        agentName: 'Approval Agent',
        action: 'Buy',
        symbol: 'AAPL',
        reasoning: 'EMA 20 crossed above EMA 50. Volume confirmed. Sentiment bullish post earnings.',
        confidence: 91,
        riskScore: 4.1,
        status: 'Approved',
        createdAt: '2024-12-20T16:20:00Z',
    },
];
