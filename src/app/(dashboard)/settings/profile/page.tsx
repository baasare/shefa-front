'use client';

import { useState } from 'react';
import Link from 'next/link';
import { settingsNav } from '@/lib/config/navigation';
import { Check, User } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

function getIcon(name: string | undefined): LucideIcon {
    if (!name) return LucideIcons.Circle;
    return ((LucideIcons as unknown) as Record<string, LucideIcon>)[name] ?? LucideIcons.Circle;
}

export default function ProfileSettingsPage() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ firstName: 'Alex', lastName: 'Johnson', email: 'alex@example.com', phone: '+1 (555) 000-0000', timezone: 'America/New_York', currency: 'USD' });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    }

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
                                <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Profile</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Update your personal information</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/30">
                        <User className="h-8 w-8 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <button className="text-sm font-medium text-[rgb(var(--primary))] hover:underline">Upload Photo</button>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">JPG, PNG or WebP. Max 2MB.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">First Name</label>
                            <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Last Name</label>
                            <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Phone</label>
                            <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Timezone</label>
                            <select name="timezone" value={form.timezone} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                                <option value="America/New_York">Eastern Time (ET)</option>
                                <option value="America/Chicago">Central Time (CT)</option>
                                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                <option value="Europe/London">London (GMT)</option>
                                <option value="Europe/Zurich">Zurich (CET)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Display Currency</label>
                            <select name="currency" value={form.currency} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                                <option value="USD">USD — US Dollar</option>
                                <option value="EUR">EUR — Euro</option>
                                <option value="GBP">GBP — British Pound</option>
                                <option value="CHF">CHF — Swiss Franc</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" disabled={loading || success} className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60">
                        {success ? <><Check className="h-4 w-4" strokeWidth={2} />Saved!</> : loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Saving...</> : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
