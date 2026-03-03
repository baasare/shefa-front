/**
 * Mock data for Portfolio Positions
 * Replace with real API calls via a client module when backend is ready.
 */

export interface Position {
    id: string;
    symbol: string;
    name: string;
    assetClass: 'Stock' | 'Crypto' | 'ETF' | 'Forex';
    qty: number;
    avgCost: number;
    currentPrice: number;
    value: number;
    pnl: number;
    pnlPct: number;
    strategy: string;
    openedAt: string;
    lastUpdated: string;
}

export const mockPositions: Position[] = [
    {
        id: 'pos-001',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        assetClass: 'Stock',
        qty: 25,
        avgCost: 168.2,
        currentPrice: 182.5,
        value: 4562.5,
        pnl: 357.5,
        pnlPct: 8.5,
        strategy: 'Momentum Trend',
        openedAt: '2024-11-15',
        lastUpdated: '2024-12-20',
    },
    {
        id: 'pos-002',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        assetClass: 'Stock',
        qty: 10,
        avgCost: 395.1,
        currentPrice: 418.3,
        value: 4183.0,
        pnl: 232.0,
        pnlPct: 5.9,
        strategy: 'Mean Reversion',
        openedAt: '2024-10-08',
        lastUpdated: '2024-12-20',
    },
    {
        id: 'pos-003',
        symbol: 'BTC',
        name: 'Bitcoin',
        assetClass: 'Crypto',
        qty: 0.5,
        avgCost: 58000,
        currentPrice: 61200,
        value: 30600,
        pnl: 1600,
        pnlPct: 5.5,
        strategy: 'ML Sentiment',
        openedAt: '2024-09-01',
        lastUpdated: '2024-12-20',
    },
    {
        id: 'pos-004',
        symbol: 'ETH',
        name: 'Ethereum',
        assetClass: 'Crypto',
        qty: 3,
        avgCost: 3600,
        currentPrice: 3450,
        value: 10350,
        pnl: -450,
        pnlPct: -4.2,
        strategy: 'ML Sentiment',
        openedAt: '2024-11-20',
        lastUpdated: '2024-12-20',
    },
    {
        id: 'pos-005',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        assetClass: 'Stock',
        qty: 8,
        avgCost: 265.0,
        currentPrice: 248.3,
        value: 1986.4,
        pnl: -133.6,
        pnlPct: -6.3,
        strategy: 'Momentum Trend',
        openedAt: '2024-12-01',
        lastUpdated: '2024-12-20',
    },
    {
        id: 'pos-006',
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        assetClass: 'Stock',
        qty: 5,
        avgCost: 820.0,
        currentPrice: 875.4,
        value: 4377.0,
        pnl: 277.0,
        pnlPct: 6.8,
        strategy: 'Momentum Trend',
        openedAt: '2024-10-25',
        lastUpdated: '2024-12-20',
    },
];

export function getPositionById(id: string): Position | undefined {
    return mockPositions.find((p) => p.id === id);
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(value);
}
