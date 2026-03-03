/**
 * Mock data for Trading Orders
 * Replace with real API client when backend is ready.
 */

export type OrderStatus = 'Filled' | 'Pending' | 'Cancelled' | 'Rejected';
export type OrderSide = 'Buy' | 'Sell';
export type OrderType = 'Market' | 'Limit' | 'Stop' | 'Stop-Limit';

export interface Order {
    id: string;
    symbol: string;
    name: string;
    side: OrderSide;
    type: OrderType;
    qty: number;
    price: number;
    total: number;
    filledQty: number;
    status: OrderStatus;
    strategy: string;
    agentId: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
}

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        side: 'Buy',
        type: 'Market',
        qty: 10,
        price: 182.5,
        total: 1825.0,
        filledQty: 10,
        status: 'Filled',
        strategy: 'Momentum Trend',
        agentId: 'trade',
        createdAt: '2024-12-20T16:27:03Z',
        updatedAt: '2024-12-20T16:27:05Z',
    },
    {
        id: 'ORD-002',
        symbol: 'BTC',
        name: 'Bitcoin',
        side: 'Buy',
        type: 'Limit',
        qty: 0.25,
        price: 61200,
        total: 15300,
        filledQty: 0.25,
        status: 'Filled',
        strategy: 'ML Sentiment',
        agentId: 'trade',
        createdAt: '2024-12-20T16:10:15Z',
        updatedAt: '2024-12-20T16:10:20Z',
    },
    {
        id: 'ORD-003',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        side: 'Sell',
        type: 'Limit',
        qty: 5,
        price: 248.3,
        total: 1241.5,
        filledQty: 0,
        status: 'Pending',
        strategy: 'Momentum Trend',
        agentId: 'approval',
        note: 'Awaiting human approval (risk flagged)',
        createdAt: '2024-12-20T16:14:00Z',
        updatedAt: '2024-12-20T16:14:00Z',
    },
    {
        id: 'ORD-004',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        side: 'Buy',
        type: 'Market',
        qty: 3,
        price: 418.3,
        total: 1254.9,
        filledQty: 3,
        status: 'Filled',
        strategy: 'Mean Reversion',
        agentId: 'trade',
        createdAt: '2024-12-20T15:52:11Z',
        updatedAt: '2024-12-20T15:52:13Z',
    },
    {
        id: 'ORD-005',
        symbol: 'ETH',
        name: 'Ethereum',
        side: 'Sell',
        type: 'Market',
        qty: 1,
        price: 3450,
        total: 3450,
        filledQty: 0,
        status: 'Cancelled',
        strategy: 'ML Sentiment',
        agentId: 'trade',
        note: 'Cancelled due to risk threshold breach',
        createdAt: '2024-12-20T15:40:22Z',
        updatedAt: '2024-12-20T15:41:00Z',
    },
    {
        id: 'ORD-006',
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        side: 'Buy',
        type: 'Limit',
        qty: 2,
        price: 875.4,
        total: 1750.8,
        filledQty: 0,
        status: 'Rejected',
        strategy: 'Momentum Trend',
        agentId: 'trade',
        note: 'Rejected: exceeded daily order limit',
        createdAt: '2024-12-20T15:28:44Z',
        updatedAt: '2024-12-20T15:28:45Z',
    },
];

export function getOrderById(id: string): Order | undefined {
    return mockOrders.find((o) => o.id === id);
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
    return mockOrders.filter((o) => o.status === status);
}
