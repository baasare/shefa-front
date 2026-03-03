/**
 * VerifyEmailForm
 * Reads `key` from URL search params.
 * POST /api/auth/registration/verify-email/
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { verifyEmail } from '@/lib/api/authClient';
import { routes } from '@/lib/config/routes';

type Status = 'pending' | 'verifying' | 'success' | 'error';

export function VerifyEmailForm() {
    const searchParams = useSearchParams();
    const key = searchParams.get('key');
    const [status, setStatus] = useState<Status>(key ? 'verifying' : 'pending');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!key) return;

        const doVerify = async () => {
            try {
                await verifyEmail(key);
                setStatus('success');
            } catch (err: any) {
                setError(
                    err?.response?.data?.key?.[0] ??
                    'Verification failed. The link may be invalid or expired.'
                );
                setStatus('error');
            }
        };

        doVerify();
    }, [key]);

    if (status === 'verifying') {
        return (
            <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-10 w-10 animate-spin text-[rgb(var(--primary))]" strokeWidth={1.5} />
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Verifying your email…</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-4">
                <div className="h-16 w-16 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[rgb(var(--success))]" strokeWidth={1.5} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Email Verified!</h2>
                    <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                        Your email has been confirmed. You can now log in to your account.
                    </p>
                </div>
                <Link
                    href={routes.auth.login}
                    className="inline-flex items-center justify-center w-full h-12 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Continue to Log In
                </Link>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-4">
                <div className="h-16 w-16 rounded-full bg-[rgb(var(--destructive))]/10 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-[rgb(var(--destructive))]" strokeWidth={1.5} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Verification Failed</h2>
                    <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">{error}</p>
                </div>
                <Link
                    href={routes.auth.login}
                    className="text-sm font-medium text-[rgb(var(--primary))] hover:underline underline-offset-2"
                >
                    Back to Log In
                </Link>
            </div>
        );
    }

    // No key in URL — show instructions
    return (
        <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="h-16 w-16 rounded-full bg-[rgb(var(--primary))]/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-[rgb(var(--primary))]" strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Check Your Email</h2>
                <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                    We sent a verification link to your email address. Click the link to verify your account.
                </p>
                <p className="mt-3 text-xs text-[rgb(var(--muted-foreground))]">
                    Didn't receive it? Check your spam folder or{' '}
                    <Link href={routes.auth.login} className="text-[rgb(var(--primary))] hover:underline">
                        contact support
                    </Link>.
                </p>
            </div>
        </div>
    );
}
