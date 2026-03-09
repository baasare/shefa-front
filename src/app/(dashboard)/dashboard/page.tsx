'use client';

import { useEffect, useState } from 'react';
import { portfolios, strategies as strategiesApi, orders as ordersApi } from '@/lib/api';
import type { Portfolio } from '@/lib/api/portfolios';
import type { Strategy } from '@/lib/api/strategies';
import type { Order } from '@/lib/api/orders';

interface DashboardStats {
  portfolioValue: string;
  portfolioChange: string;
  todayPnl: string;
  todayPnlPercent: string;
  activeStrategies: number;
  pausedStrategies: number;
  pendingApprovals: number;
}

interface AgentActivity {
  agent: string;
  action: string;
  time: string;
  status: 'done' | 'pending';
}

const statusColors: Record<string, string> = {
  Filled: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
  Pending: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
  Cancelled: 'text-[rgb(var(--muted-foreground))] bg-[rgb(var(--muted))]',
};

const agentStatusColors: Record<string, string> = {
  done: 'bg-[rgb(var(--success))]',
  pending: 'bg-[rgb(var(--warning))] animate-pulse',
};

const agentActivity: AgentActivity[] = [
  { agent: 'Market Scanner', action: 'Identified 3 momentum opportunities in tech sector', time: '2 min ago', status: 'done' },
  { agent: 'Risk Manager', action: 'Analyzing portfolio exposure across positions', time: '5 min ago', status: 'pending' },
  { agent: 'Signal Generator', action: 'Generated buy signal for AAPL at $150.25', time: '12 min ago', status: 'done' },
  { agent: 'Order Manager', action: 'Executed 2 trades, awaiting 1 approval', time: '18 min ago', status: 'done' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [strategiesList, setStrategiesList] = useState<Strategy[]>([]);
  const [recentOrdersList, setRecentOrdersList] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [portfoliosList, strategiesData, ordersData, pendingApprovals] = await Promise.all([
          portfolios.getPortfolios(),
          strategiesApi.getStrategies(),
          ordersApi.getOrders({ limit: 5 }),
          ordersApi.getPendingApprovals(),
        ]);

        // Ensure strategiesData and ordersData are arrays
        const strategiesArray = Array.isArray(strategiesData) ? strategiesData : [];
        const ordersArray = Array.isArray(ordersData) ? ordersData : [];

        // Calculate stats from portfolio data
        const activePortfolio = portfoliosList.find(p => p.is_active) || portfoliosList[0];

        if (activePortfolio) {
          const portfolioValue = parseFloat(activePortfolio.current_equity || '0');
          const initialCapital = parseFloat(activePortfolio.initial_capital || '0');
          const totalPnl = parseFloat(activePortfolio.total_pl || '0');
          const totalPnlPercent = parseFloat(activePortfolio.total_pl_percentage || '0');

          // For "today's P&L" we'd need snapshots - for now use total
          const todayPnl = totalPnl;
          const todayPnlPercent = totalPnlPercent;

          setStats({
            portfolioValue: `$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            portfolioChange: `${totalPnlPercent >= 0 ? '+' : ''}${totalPnlPercent.toFixed(2)}%`,
            todayPnl: `${todayPnl >= 0 ? '+' : ''}$${Math.abs(todayPnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            todayPnlPercent: `${todayPnlPercent >= 0 ? '+' : ''}${todayPnlPercent.toFixed(2)}%`,
            activeStrategies: strategiesArray.filter(s => s.status === 'active').length,
            pausedStrategies: strategiesArray.filter(s => s.status === 'paused').length,
            pendingApprovals: pendingApprovals.length,
          });
        }

        setStrategiesList(strategiesArray.slice(0, 3)); // Top 3 strategies
        setRecentOrdersList(ordersArray.slice(0, 4)); // Recent 4 orders
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        console.error('Failed to fetch dashboard data:', error);
        setError(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 p-6">
        <h3 className="text-lg font-semibold text-[rgb(var(--destructive))] mb-2">Error Loading Dashboard</h3>
        <p className="text-sm text-[rgb(var(--destructive))]/80">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[rgb(var(--destructive))] text-white rounded-lg text-sm font-medium hover:opacity-90"
        >
          Retry
        </button>
      </div>
    );
  }

  const statsCards = [
    {
      label: 'Portfolio Value',
      value: stats?.portfolioValue || '$0.00',
      change: stats?.portfolioChange || '0%',
      changeLabel: 'all time',
      positive: parseFloat(stats?.portfolioChange || '0') >= 0,
    },
    {
      label: "Today's P&L",
      value: stats?.todayPnl || '$0.00',
      change: stats?.todayPnlPercent || '0%',
      changeLabel: 'today',
      positive: parseFloat(stats?.todayPnl || '0') >= 0,
    },
    {
      label: 'Active Strategies',
      value: String(stats?.activeStrategies || 0),
      change: stats?.pausedStrategies ? `${stats.pausedStrategies} paused` : 'All active',
      changeLabel: '',
      positive: null,
    },
    {
      label: 'Pending Approvals',
      value: String(stats?.pendingApprovals || 0),
      change: stats?.pendingApprovals ? 'Review required' : 'None pending',
      changeLabel: '',
      positive: !stats?.pendingApprovals,
      badge: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
          Good morning 👋
        </h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
          Here&apos;s your trading overview for{' '}
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5"
          >
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold font-mono ${stat.positive === true
                ? 'text-[rgb(var(--success))]'
                : stat.positive === false
                  ? 'text-[rgb(var(--destructive))]'
                  : 'text-[rgb(var(--foreground))]'
              }`}>
              {stat.value}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className={`text-xs font-medium ${stat.positive === true
                  ? 'text-[rgb(var(--success))]'
                  : stat.positive === false
                    ? 'text-[rgb(var(--warning))]'
                    : 'text-[rgb(var(--muted-foreground))]'
                }`}>
                {stat.change}
              </span>
              {stat.changeLabel && (
                <span className="text-xs text-[rgb(var(--muted-foreground))]">{stat.changeLabel}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart panel */}
        <div className="lg:col-span-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
              Portfolio Performance
            </h2>
            <div className="flex gap-1.5 rounded-lg bg-[rgb(var(--muted))] p-1">
              {['7d', '30d', '90d', '1y'].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${i === 1
                      ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                      : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative chart */}
          <div className="h-48 w-full relative rounded-lg overflow-hidden bg-[rgb(var(--background))]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(30,111,255)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(30,111,255)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0,160 C40,155 60,140 80,130 C100,120 110,135 130,115 C150,95 160,80 180,70 C200,60 210,75 230,65 C250,55 260,40 280,35 C300,30 320,45 340,38 C360,32 380,25 400,20 L400,200 L0,200 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,160 C40,155 60,140 80,130 C100,120 110,135 130,115 C150,95 160,80 180,70 C200,60 210,75 230,65 C250,55 260,40 280,35 C300,30 320,45 340,38 C360,32 380,25 400,20"
                fill="none"
                stroke="rgb(30,111,255)"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute bottom-3 left-3 text-xs text-[rgb(var(--muted-foreground))]">30 days ago</div>
            <div className="absolute bottom-3 right-3 text-xs text-[rgb(var(--muted-foreground))]">Today</div>
            <div className="absolute top-3 right-3 rounded-md bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/20 px-2 py-1 text-xs font-semibold text-[rgb(var(--success))]">
              +12.4%
            </div>
          </div>
        </div>

        {/* AI Agent Activity */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">
            AI Agent Activity
          </h2>
          <ul className="space-y-3">
            {agentActivity.map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="relative flex-shrink-0 mt-1">
                  <div className={`h-2 w-2 rounded-full ${agentStatusColors[item.status]}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[rgb(var(--foreground))] mb-0.5">{item.agent}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] leading-snug">{item.action}</p>
                  <p className="text-[10px] text-[rgb(var(--muted-foreground))]/60 mt-1">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="/agents"
            className="mt-4 block text-xs text-center text-[rgb(var(--primary))] hover:underline"
          >
            View all agent logs →
          </a>
        </div>
      </div>

      {/* Active strategies */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Active Strategies</h2>
          <a href="/strategies" className="text-xs text-[rgb(var(--primary))] hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Strategy', 'Status', 'P&L', 'Win Rate', 'Actions'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {strategiesList.length > 0 ? (
                strategiesList.map((s) => (
                  <tr key={s.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[rgb(var(--foreground))]">{s.name}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${
                        s.status === 'active'
                          ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                          : s.status === 'paused'
                          ? 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]'
                          : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          s.status === 'active' ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'
                        }`} />
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--muted-foreground))]">
                      N/A
                    </td>
                    <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">N/A</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <a href={`/strategies/${s.id}/edit`} className="text-xs text-[rgb(var(--primary))] hover:underline">
                          Edit
                        </a>
                        <button className="text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
                          {s.status === 'active' ? 'Pause' : 'Resume'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
                    No active strategies. <a href="/strategies/create" className="text-[rgb(var(--primary))] hover:underline">Create one</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Recent Orders</h2>
          <a href="/orders" className="text-xs text-[rgb(var(--primary))] hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Symbol', 'Side', 'Qty', 'Price', 'Status'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {recentOrdersList.length > 0 ? (
                recentOrdersList.map((order) => (
                  <tr key={order.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{order.symbol}</td>
                    <td className="px-5 py-3.5">
                      <span className={`font-medium ${order.side === 'buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                        {order.side.charAt(0).toUpperCase() + order.side.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{order.quantity}</td>
                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">
                      {order.price ? `$${parseFloat(order.price).toFixed(2)}` : 'Market'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === 'filled' ? statusColors['Filled'] :
                        order.status === 'pending_approval' || order.status === 'submitted' ? statusColors['Pending'] :
                        statusColors['Cancelled']
                      }`}>
                        {order.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
