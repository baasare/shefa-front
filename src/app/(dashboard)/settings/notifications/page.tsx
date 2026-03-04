"use client";

import {settingsNav} from "@/lib/config/navigation";
import Link from "next/link";
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {cn} from "@/lib/utils/cn";
import {usePathname} from "next/navigation";

const categories = [
    {
        label: 'AI Agent Activity',
        items: [
            {label: 'Trade executed', email: true, push: true},
            {label: 'Approval required', email: true, push: true},
            {label: 'Strategy paused (risk)', email: true, push: false},
            {label: 'Agent error', email: true, push: true},
        ],
    },
    {
        label: 'Portfolio',
        items: [
            {label: 'Daily portfolio summary', email: true, push: false},
            {label: 'Significant P&L change (>5%)', email: true, push: true},
            {label: 'Position opened/closed', email: false, push: false},
        ],
    },
    {
        label: 'Account',
        items: [
            {label: 'Login from new device', email: true, push: true},
            {label: 'Password changed', email: true, push: false},
            {label: 'Subscription renewal', email: true, push: false},
        ],
    },
];

function getIcon(name: string | undefined): LucideIcon {
    if (!name) return LucideIcons.Circle;
    return ((LucideIcons as unknown) as Record<string, LucideIcon>)[name] ?? LucideIcons.Circle;
}

function Toggle({defaultChecked}: { defaultChecked: boolean }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer"/>
            <div
                className="w-9 h-5 bg-[rgb(var(--muted))] rounded-full peer peer-checked:bg-[rgb(var(--primary))] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"/>
        </label>
    );
}

export default function NotificationSettingsPage() {
     const pathname = usePathname();
    return (
        <div className="flex gap-6">
            {/* Settings sidebar */}
            <aside className="hidden md:block w-52 flex-shrink-0">
                <nav className="space-y-0.5">
                    {settingsNav.map((item) => {
                        const Icon = getIcon(item.icon);
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                                    isActive ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] font-medium' : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
                                )}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5}/>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="space-y-6 max-w-2xl">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Notifications</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Control which events trigger email
                        and push notifications</p>
                </div>

                {categories.map((cat) => (
                    <div key={cat.label}
                         className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                        <div
                            className="flex items-center justify-between px-5 py-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30">
                            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">{cat.label}</h2>
                            <div
                                className="hidden sm:flex items-center gap-8 text-xs font-medium text-[rgb(var(--muted-foreground))] pr-1">
                                <span>Email</span>
                                <span>Push</span>
                            </div>
                        </div>
                        <div className="divide-y divide-[rgb(var(--border))]">
                            {cat.items.map((item) => (
                                <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                                    <span className="text-sm text-[rgb(var(--foreground))]">{item.label}</span>
                                    <div className="flex items-center gap-6">
                                        <Toggle defaultChecked={item.email}/>
                                        <Toggle defaultChecked={item.push}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    className="rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all">
                    Save Preferences
                </button>
            </div>
        </div>
    );
}
