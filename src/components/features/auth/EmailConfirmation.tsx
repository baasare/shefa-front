'use client';
import {useState} from 'react';
import Link from 'next/link';
import {CheckCircle2, Mail} from 'lucide-react';
import {AuthCard, AuthButton} from './AuthCard';
import {verifyEmail} from '@/lib/api/authClient';

export function EmailConfirmation({confirmationKey}: {confirmationKey: string}) {
    const [status, setStatus] = useState<'ready' | 'busy' | 'success' | 'error'>('ready');
    const [error, setError] = useState('');
    return <AuthCard title={status === 'success' ? 'Email verified' : 'Confirm your email'}
        subtitle={status === 'success' ? 'Your account is ready. Sign in to finish setting up your profile.' : 'Confirm this email address to activate your ShefaFx account.'}>
        <div className="space-y-6 text-center">
            {status === 'success' ? <CheckCircle2 className="mx-auto h-12 w-12 text-[rgb(var(--success))]" /> : <Mail className="mx-auto h-12 w-12 text-[rgb(var(--primary))]" />}
            {status === 'success' ? <Link href="/login?verified=1" className="block rounded-lg bg-[rgb(var(--primary))] p-3 font-semibold text-white">Continue to sign in</Link> : <>
                {error && <p role="alert" className="text-sm text-[rgb(var(--destructive))]">{error}</p>}
                <AuthButton loading={status === 'busy'} onClick={async () => {
                    setStatus('busy'); setError('');
                    try { await verifyEmail(confirmationKey); setStatus('success'); }
                    catch { setError('This link is invalid, expired, or already used. Try signing in, or request a new verification email.'); setStatus('error'); }
                }}>Verify email address</AuthButton>
                <Link href="/verify-email" className="block text-sm text-[rgb(var(--primary))] hover:underline">Request a new verification link</Link>
                <Link href="/login" className="block text-sm text-[rgb(var(--muted-foreground))] hover:underline">Return to sign in</Link>
            </>}
        </div>
    </AuthCard>;
}
