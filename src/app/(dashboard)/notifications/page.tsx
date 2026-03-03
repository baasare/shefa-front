import { Metadata } from 'next';
import { Bell, Check, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Notifications — ShefaFx',
  description: 'Your trading platform notifications.',
};

const notifications = [
  {
    id: 1,
    title: 'Trade Executed',
    body: 'AAPL Buy order for 10 shares filled @ $182.50',
    time: '2 min ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'Approval Required',
    body: 'TSLA Sell order is awaiting your manual approval',
    time: '18 min ago',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    title: 'Daily Summary Ready',
    body: "Today's portfolio performance: +$840.25 (+1.81%). 12 trades executed.",
    time: '4 hours ago',
    type: 'info',
    read: true,
  },
  {
    id: 4,
    title: 'ETH Risk Alert',
    body: 'ETH position exceeded 5% drawdown threshold. ML Sentiment strategy paused.',
    time: '6 hours ago',
    type: 'error',
    read: true,
  },
  {
    id: 5,
    title: 'Strategy Activated',
    body: 'Momentum Trend strategy has been re-enabled and is now live.',
    time: 'Yesterday',
    type: 'info',
    read: true,
  },
];

const typeColors: Record<string, string> = {
  success: 'bg-[rgb(var(--success))]/10 border-[rgb(var(--success))]/20 text-[rgb(var(--success))]',
  warning: 'bg-[rgb(var(--warning))]/10 border-[rgb(var(--warning))]/20 text-[rgb(var(--warning))]',
  error: 'bg-[rgb(var(--destructive))]/10 border-[rgb(var(--destructive))]/20 text-[rgb(var(--destructive))]',
  info: 'bg-[rgb(var(--primary))]/10 border-[rgb(var(--primary))]/20 text-[rgb(var(--primary))]',
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Notifications</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all">
            <Check className="h-4 w-4" strokeWidth={1.5} />
            Mark all read
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-2 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/10 transition-all">
            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            Clear all
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] divide-y divide-[rgb(var(--border))] overflow-hidden">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[rgb(var(--muted))]/20 ${!notif.read ? '' : ''}`}
          >
            <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border ${typeColors[notif.type]}`}>
              <Bell className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm font-semibold ${!notif.read ? 'text-[rgb(var(--foreground))]' : 'text-[rgb(var(--muted-foreground))]'}`}>
                  {notif.title}
                  {!notif.read && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))] align-middle" />
                  )}
                </p>
                <span className="text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap flex-shrink-0">{notif.time}</span>
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5 leading-relaxed">{notif.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
