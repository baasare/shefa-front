import { Metadata } from 'next';
import { Shield, Key, Smartphone, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Security — ShefaFx',
    description: 'Manage your password and two-factor authentication.',
};

export default function SecuritySettingsPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Security</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your password and two-factor authentication</p>
            </div>

            {/* Password */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Key className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Change Password</h2>
                </div>
                <div className="space-y-4">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                        <div key={label}>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">{label}</label>
                            <input type="password" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                    ))}
                </div>
                <button className="rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all">
                    Update Password
                </button>
            </div>

            {/* 2FA */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Two-Factor Authentication</h2>
                    </div>
                    <span className="rounded-full bg-[rgb(var(--warning))]/10 border border-[rgb(var(--warning))]/20 px-2.5 py-1 text-xs font-medium text-[rgb(var(--warning))]">
                        Not Enabled
                    </span>
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                    Add an extra layer of security to your account. We recommend using an authenticator app like Google Authenticator or Authy.
                </p>
                <button className="rounded-full bg-[rgb(var(--primary))] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all">
                    Enable 2FA
                </button>
            </div>

            {/* Sessions */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Active Sessions</h2>
                </div>
                <div className="space-y-3">
                    {[
                        { device: 'MacBook Pro — Chrome', location: 'New York, US', time: 'Current session', current: true },
                        { device: 'iPhone 15 — Safari', location: 'New York, US', time: '2 hours ago', current: false },
                    ].map((session) => (
                        <div key={session.device} className="flex items-center justify-between py-3 border-b border-[rgb(var(--border))] last:border-0">
                            <div>
                                <p className="text-sm font-medium text-[rgb(var(--foreground))]">{session.device}</p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))]">{session.location} · {session.time}</p>
                            </div>
                            {session.current ? (
                                <span className="text-xs font-medium text-[rgb(var(--success))]">Active</span>
                            ) : (
                                <button className="text-xs text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity">Revoke</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-xl border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-[rgb(var(--destructive))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Danger Zone</h2>
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">Permanently delete your account and all associated data.</p>
                <button className="rounded-full border border-[rgb(var(--destructive))]/50 px-5 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/10 transition-all">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
