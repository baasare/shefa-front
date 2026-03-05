'use client';

import { useState, useEffect } from 'react';
import { Shield, Key, Smartphone, AlertTriangle, Check, AlertCircle, Trash2 } from 'lucide-react';
import { changePassword, getActiveSessions, deleteAccount, revokeSession } from '@/lib/api/users';
import { useRouter } from 'next/navigation';
import { settingsNav } from "@/lib/config/navigation";
import Link from "next/link";
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { cn } from "@/lib/utils/cn";

interface Session {
    session_key: string;
    expire_date: string;
    is_current: boolean;
    device: string;
    browser: string;
    os: string;
    location: string;
    ip_address: string;
}

function getIcon(name: string | undefined): LucideIcon {
    if (!name) return LucideIcons.Circle;
    return ((LucideIcons as unknown) as Record<string, LucideIcon>)[name] ?? LucideIcons.Circle;
}

export default function SecuritySettingsPage() {
    const pathname = usePathname();
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [sessions, setSessions] = useState<Session[]>([]);
    const [sessionsLoading, setSessionsLoading] = useState(true);
    const [sessionsError, setSessionsError] = useState<string | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [revokingSession, setRevokingSession] = useState<string | null>(null);

    useEffect(() => {
        loadActiveSessions();
    }, []);

    async function loadActiveSessions() {
        try {
            setSessionsLoading(true);
            const data = await getActiveSessions();
            setSessions(data.sessions);
        } catch (err) {
            console.error('Error loading sessions:', err);
            setSessionsError('Failed to load active sessions');
        } finally {
            setSessionsLoading(false);
        }
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setPasswordForm((p) => ({ ...p, [name]: value }));
    }

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordError(null);

        // Validate passwords match
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            setPasswordLoading(false);
            return;
        }

        // Validate password strength
        if (passwordForm.newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            setPasswordLoading(false);
            return;
        }

        try {
            await changePassword({
                old_password: passwordForm.oldPassword,
                new_password1: passwordForm.newPassword,
                new_password2: passwordForm.confirmPassword,
            });

            setPasswordSuccess(true);
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (err: any) {
            const errorMsg = err.response?.data?.non_field_errors?.[0] ||
                err.response?.data?.old_password?.[0] ||
                err.response?.data?.new_password2?.[0] ||
                err.response?.data?.detail ||
                'Failed to change password';
            setPasswordError(errorMsg);
        } finally {
            setPasswordLoading(false);
        }
    }

    async function handleDeleteAccount() {
        if (deleteConfirmText !== 'DELETE') {
            setDeleteError('Please type DELETE to confirm');
            return;
        }

        setDeleteLoading(true);
        setDeleteError(null);

        try {
            await deleteAccount();
            // Clear local storage and redirect to login
            localStorage.clear();
            router.push('/login?deleted=true');
        } catch (err: any) {
            setDeleteError(err.response?.data?.message || 'Failed to delete account');
        } finally {
            setDeleteLoading(false);
        }
    }

    async function handleRevokeSession(sessionKey: string) {
        try {
            setRevokingSession(sessionKey);
            await revokeSession(sessionKey);
            await loadActiveSessions();
        } catch (err) {
            console.error('Error revoking session:', err);
            setSessionsError('Failed to revoke session');
        } finally {
            setRevokingSession(null);
        }
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 24) {
            return `Expires in ${diffHours} hours`;
        }
        return `Expires ${date.toLocaleDateString()}`;
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

            <div className="space-y-6 max-w-2xl">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Security</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your password and two-factor
                        authentication</p>
                </div>

                {/* Password */}
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Key className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Change Password</h2>
                    </div>

                    {passwordError && (
                        <div
                            className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 mb-4">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {passwordError}
                        </div>
                    )}

                    {passwordSuccess && (
                        <div
                            className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 mb-4">
                            <Check className="h-4 w-4 flex-shrink-0" />
                            Password changed successfully
                        </div>
                    )}

                    {user?.is_social_user ? (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="h-4 w-4" />
                                <span className="font-semibold">Social Account Managed</span>
                            </div>
                            <p>
                                Your account is connected via Google. To ensure your security, please manage your password directly in your Google Account settings.
                            </p>
                            <a
                                href="https://myaccount.google.com/signinoptions/password"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 text-[rgb(var(--primary))] hover:underline font-medium"
                            >
                                Go to Google Security Settings &rarr;
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Current
                                    Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordForm.oldPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">New
                                    Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    minLength={8}
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                />
                                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">Must be at least 8
                                    characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Confirm
                                    New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={passwordLoading || passwordSuccess}
                                className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60"
                            >
                                {passwordSuccess ? (
                                    <>
                                        <Check className="h-4 w-4" strokeWidth={2} />
                                        Updated!
                                    </>
                                ) : passwordLoading ? (
                                    <>
                                        <span
                                            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Password'
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* 2FA */}
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Two-Factor
                                Authentication</h2>
                        </div>
                        <span
                            className="rounded-full bg-[rgb(var(--warning))]/10 border border-[rgb(var(--warning))]/20 px-2.5 py-1 text-xs font-medium text-[rgb(var(--warning))]">
                            Coming soon{/*Not Enabled*/}
                        </span>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Add an extra layer of security to your account. We recommend using an authenticator app like
                        Google Authenticator or Authy.
                    </p>
                    {/*<button*/}
                    {/*    className="rounded-full bg-[rgb(var(--primary))] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all">*/}
                    {/*    Enable 2FA*/}
                    {/*</button>*/}
                </div>

                {/* Sessions */}
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Active Sessions</h2>
                    </div>

                    {sessionsError && (
                        <div
                            className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 mb-4">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            {sessionsError}
                        </div>
                    )}

                    {sessionsLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div
                                className="h-6 w-6 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
                        </div>
                    ) : sessions.length === 0 ? (
                        <p className="text-sm text-[rgb(var(--muted-foreground))] py-4">No active sessions found</p>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session, index) => (
                                <div key={session.session_key}
                                    className="flex items-center justify-between py-3 border-b border-[rgb(var(--border))] last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                                            {session.device} — {session.browser}
                                        </p>
                                        <p className="text-xs text-[rgb(var(--muted-foreground))]">
                                            {session.location} · {session.ip_address} · {formatDate(session.expire_date)}
                                        </p>
                                    </div>
                                    {session.is_current ? (
                                        <span className="text-xs font-medium text-[rgb(var(--success))]">Active</span>
                                    ) : (
                                        <button
                                            onClick={() => handleRevokeSession(session.session_key)}
                                            disabled={revokingSession === session.session_key}
                                            className="text-xs text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity disabled:opacity-50"
                                        >
                                            {revokingSession === session.session_key ? 'Revoking...' : 'Revoke'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Danger zone */}
                <div
                    className="rounded-xl border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/5 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-[rgb(var(--destructive))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Danger Zone</h2>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="rounded-full border border-[rgb(var(--destructive))]/50 px-5 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/10 transition-all"
                    >
                        Delete Account
                    </button>
                </div>

                {/* Delete Account Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[rgb(var(--card))] rounded-xl max-w-md w-full p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                    <Trash2 className="h-5 w-5 text-red-600" strokeWidth={2} />
                                </div>
                                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))]">Delete Account</h3>
                            </div>

                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                Are you sure you want to delete your account? All of your data will be permanently
                                removed. This action cannot be undone.
                            </p>

                            {deleteError && (
                                <div
                                    className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    {deleteError}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                                    Type <span className="font-mono font-bold">DELETE</span> to confirm
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    placeholder="DELETE"
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteConfirmText('');
                                        setDeleteError(null);
                                    }}
                                    disabled={deleteLoading}
                                    className="flex-1 rounded-full border border-[rgb(var(--border))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteLoading || deleteConfirmText !== 'DELETE'}
                                    className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-all disabled:opacity-60"
                                >
                                    {deleteLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span
                                                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Deleting...
                                        </span>
                                    ) : (
                                        'Delete Account'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
