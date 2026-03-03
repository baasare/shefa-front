'use client';

import { useState } from 'react';
import { User, Shield, Bell, CreditCard, Link2, Key, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'brokers', label: 'Brokers', icon: Link2 },
  { id: 'api', label: 'API Keys', icon: Key },
];

function ProfileTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-5">Personal Information</h3>
        <div className="flex items-center gap-5 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary))]/50 flex items-center justify-center text-xl font-bold text-white">
            A
          </div>
          <div>
            <p className="font-semibold text-[rgb(var(--foreground))]">Alex Johnson</p>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">alex@example.com</p>
            <button className="mt-1 text-xs text-[rgb(var(--primary))] hover:underline">Change photo</button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'First Name', value: 'Alex' },
            { label: 'Last Name', value: 'Johnson' },
            { label: 'Email', value: 'alex@example.com' },
            { label: 'Phone', value: '+1 (555) 000-1234' },
            { label: 'Country', value: 'United States', full: true },
          ].map((field) => (
            <div key={field.label} className={field.full ? 'sm:col-span-2' : ''}>
              <label className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1.5 block">{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-4 py-2.5 text-sm text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <button className="rounded-full bg-[rgb(var(--primary))] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      {[
        { title: 'Password', desc: 'Last changed 30 days ago', action: 'Change Password' },
        { title: 'Two-Factor Authentication', desc: '2FA is currently disabled', action: 'Enable 2FA', warn: true },
        { title: 'Active Sessions', desc: '1 active session (this device)', action: 'Manage Sessions' },
      ].map((item) => (
        <div key={item.title} className="flex items-center justify-between rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
          <div>
            <p className="font-medium text-[rgb(var(--foreground))]">{item.title}</p>
            <p className={`text-sm mt-0.5 ${item.warn ? 'text-[rgb(var(--warning))]' : 'text-[rgb(var(--muted-foreground))]'}`}>{item.desc}</p>
          </div>
          <button className="text-sm text-[rgb(var(--primary))] hover:underline">{item.action}</button>
        </div>
      ))}
    </div>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    tradeExecuted: true,
    approvalRequired: true,
    dailySummary: true,
    weeklyReport: false,
    marketAlerts: true,
    agentErrors: true,
  });
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] divide-y divide-[rgb(var(--border))]">
      {Object.entries(prefs).map(([key, val]) => {
        const labels: Record<string, { title: string; desc: string }> = {
          tradeExecuted: { title: 'Trade Executed', desc: 'When an agent places a trade' },
          approvalRequired: { title: 'Approval Required', desc: 'When a trade needs your review' },
          dailySummary: { title: 'Daily Summary', desc: 'End of day portfolio report' },
          weeklyReport: { title: 'Weekly Report', desc: 'Weekly performance digest' },
          marketAlerts: { title: 'Market Alerts', desc: 'Big market moves on watchlist' },
          agentErrors: { title: 'Agent Errors', desc: 'Critical agent failures' },
        };
        return (
          <div key={key} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="font-medium text-sm text-[rgb(var(--foreground))]">{labels[key].title}</p>
              <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{labels[key].desc}</p>
            </div>
            <button
              onClick={() => setPrefs((p) => ({ ...p, [key]: !val }))}
              className={cn(
                'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200',
                val ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--border))]'
              )}
            >
              <span className={cn('inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200', val ? 'translate-x-4' : 'translate-x-1')} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-12 text-center">
      <p className="text-[rgb(var(--muted-foreground))]">{title} settings coming soon.</p>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Settings</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Tab sidebar */}
        <nav className="sm:w-48 flex-shrink-0">
          <ul className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-left',
                      activeTab === tab.id
                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20'
                        : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tab content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'billing' && <PlaceholderTab title="Billing" />}
          {activeTab === 'brokers' && <PlaceholderTab title="Broker connections" />}
          {activeTab === 'api' && <PlaceholderTab title="API keys" />}
        </div>
      </div>
    </div>
  );
}
