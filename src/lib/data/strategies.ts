/**
 * Mock data for Trading Strategies
 * Replace with real API client when backend is ready.
 */

export interface Strategy {
    id: string;
    name: string;
    description: string;
    type: string;
    status: 'Running' | 'Paused' | 'Draft' | 'Backtesting';
    assets: string[];
    riskLevel: 'Low' | 'Medium' | 'High';
    maxDrawdown: string;
    targetReturn: string;
    pnl: number;
    pnlPct: number;
    winRate: number;
    trades: number;
    createdAt: string;
    updatedAt: string;
}

export const mockStrategies: Strategy[] = [
    {
        id: '1',
        name: 'Momentum Trend',
        description:
            'Follows medium-term momentum signals using EMA crossovers and volume confirmation. Trades US large-cap stocks.',
        type: 'Trend Following',
        status: 'Running',
        assets: ['Stocks', 'ETFs'],
        riskLevel: 'Medium',
        maxDrawdown: '12%',
        targetReturn: '18%',
        pnl: 1234.5,
        pnlPct: 6.8,
        winRate: 68,
        trades: 42,
        createdAt: '2024-09-01',
        updatedAt: '2024-12-20',
    },
    {
        id: '2',
        name: 'Mean Reversion',
        description:
            'Exploits short-term price deviations from historical mean using Bollinger Bands and RSI. Works best in range-bound markets.',
        type: 'Statistical Arbitrage',
        status: 'Running',
        assets: ['Stocks', 'Forex'],
        riskLevel: 'Low',
        maxDrawdown: '8%',
        targetReturn: '12%',
        pnl: 562.8,
        pnlPct: 4.2,
        winRate: 72,
        trades: 29,
        createdAt: '2024-10-15',
        updatedAt: '2024-12-18',
    },
    {
        id: '3',
        name: 'ML Sentiment',
        description:
            'Uses NLP models to parse news and social sentiment for trade signals. Experimental strategy currently under review.',
        type: 'NLP / Sentiment',
        status: 'Paused',
        assets: ['Stocks', 'Crypto'],
        riskLevel: 'High',
        maxDrawdown: '20%',
        targetReturn: '30%',
        pnl: -128.2,
        pnlPct: -1.1,
        winRate: 61,
        trades: 18,
        createdAt: '2024-11-01',
        updatedAt: '2024-12-10',
    },
];

export interface StrategyTemplate {
    id: string;
    name: string;
    description: string;
    type: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedReturn: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    popular?: boolean;
}

export const strategyTemplates: StrategyTemplate[] = [
    {
        id: 'tpl-momentum',
        name: 'Classic Momentum',
        description: 'EMA crossover with volume confirmation.',
        type: 'Trend Following',
        difficulty: 'Beginner',
        estimatedReturn: '10–15% / yr',
        riskLevel: 'Medium',
        popular: true,
    },
    {
        id: 'tpl-mean-rev',
        name: 'RSI Mean Reversion',
        description: 'Buy oversold, sell overbought with RSI + Bollinger Bands.',
        type: 'Statistical Arbitrage',
        difficulty: 'Intermediate',
        estimatedReturn: '8–12% / yr',
        riskLevel: 'Low',
        popular: true,
    },
    {
        id: 'tpl-breakout',
        name: 'Volatility Breakout',
        description: 'Trade momentum on price breaking key S/R levels.',
        type: 'Breakout',
        difficulty: 'Intermediate',
        estimatedReturn: '15–25% / yr',
        riskLevel: 'High',
    },
    {
        id: 'tpl-sentiment',
        name: 'News Sentiment',
        description: 'NLP-powered trade signals from financial news.',
        type: 'NLP / Sentiment',
        difficulty: 'Advanced',
        estimatedReturn: '20–35% / yr',
        riskLevel: 'High',
    },
    {
        id: 'tpl-pairs',
        name: 'Pairs Trading',
        description: 'Market-neutral strategy trading correlated asset pairs.',
        type: 'Pairs Trading',
        difficulty: 'Advanced',
        estimatedReturn: '6–10% / yr',
        riskLevel: 'Low',
    },
    {
        id: 'tpl-ml-price',
        name: 'ML Price Prediction',
        description: 'LSTM model forecasting short-term price movements.',
        type: 'Machine Learning',
        difficulty: 'Advanced',
        estimatedReturn: '15–30% / yr',
        riskLevel: 'High',
    },
];

export function getStrategyById(id: string): Strategy | undefined {
    return mockStrategies.find((s) => s.id === id);
}
