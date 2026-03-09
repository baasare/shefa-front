'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { settingsNav } from '@/lib/config/navigation';
import { Check, User, AlertCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { getUserProfile, updateUserProfile, type User as UserType } from '@/lib/api/users';

function getIcon(name: string | undefined): LucideIcon {
    if (!name) return LucideIcons.Circle;
    return ((LucideIcons as unknown) as Record<string, LucideIcon>)[name] ?? LucideIcons.Circle;
}

export default function ProfileSettingsPage() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        timezone: 'US/Eastern',
        defaultPaperTrading: true,
    });

    useEffect(() => {
        loadUserProfile();
    }, []);

    async function loadUserProfile() {
        try {
            setFetchLoading(true);
            const userData = await getUserProfile();
            setUser(userData);
            setForm({
                firstName: userData.first_name || '',
                lastName: userData.last_name || '',
                email: userData.email || '',
                phoneNumber: userData.phone_number || '',
                timezone: userData.profile?.timezone || 'US/Eastern',
                defaultPaperTrading: userData.profile?.default_paper_trading ?? true,
            });
        } catch (err) {
            setError('Failed to load profile');
            console.error('Error loading profile:', err);
        } finally {
            setFetchLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((p) => ({ ...p, [name]: checked }));
        } else {
            setForm((p) => ({ ...p, [name]: value }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updatedUser = await updateUserProfile({
                first_name: form.firstName,
                last_name: form.lastName,
                phone_number: form.phoneNumber,
                profile: {
                    timezone: form.timezone,
                    default_paper_trading: form.defaultPaperTrading,
                },
            });

            setUser(updatedUser);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || 'Failed to update profile');
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    }

    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />
            </div>
        );
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

                {error && (
                    <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/30">
                        {user?.first_name ? (
                            <span className="text-xl font-semibold text-[rgb(var(--primary))]">
                                {user.first_name.charAt(0).toUpperCase()}
                                {user.last_name?.charAt(0).toUpperCase() || ''}
                            </span>
                        ) : (
                            <User className="h-8 w-8 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        )}
                    </div>
                    {/*<div>*/}
                    {/*    <button type="button" className="text-sm font-medium text-[rgb(var(--primary))] hover:underline">Upload Photo</button>*/}
                    {/*    <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">JPG, PNG or WebP. Max 2MB.</p>*/}
                    {/*</div>*/}
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
                            <input name="email" type="email" value={form.email} disabled className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 px-3 py-2.5 text-sm text-[rgb(var(--muted-foreground))] cursor-not-allowed" />
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">Email cannot be changed</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Phone Number</label>
                            <input name="phoneNumber" type="tel" value={form.phoneNumber} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Timezone</label>
                            <select name="timezone" value={form.timezone} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                                <option value="US/Eastern">Eastern Time (ET)</option>
                                <option value="US/Central">Central Time (CT)</option>
                                <option value="US/Mountain">Mountain Time (MT)</option>
                                <option value="US/Pacific">Pacific Time (PT)</option>
                                <option value="Europe/London">London (GMT)</option>
                                <option value="UTC">UTC</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between sm:col-span-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 py-3">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))]">Default to Paper Trading</label>
                                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">Use paper trading mode by default for new strategies</p>
                            </div>
                            <input
                                type="checkbox"
                                name="defaultPaperTrading"
                                checked={form.defaultPaperTrading}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-[rgb(var(--border))] text-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--ring))]"
                            />
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
