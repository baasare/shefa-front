'use client';

import {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Mail, Loader2} from 'lucide-react';
import Link from 'next/link';
import {AuthCard, AuthButton, AuthInput, FormField} from '@/components/features/auth/AuthCard';
import {resendEmail} from '@/lib/api/authClient';

function VerifyEmailContent() {
    const params = useSearchParams();
    const [email, setEmail] = useState(params.get('email') || '');
    const [busy, setBusy] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (!cooldown) return;
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    return <AuthCard title={params.get('created') === '1' ? 'Account created' : 'Verify your email'}
        subtitle="One more step: open the verification link in your inbox, then sign in.">
        <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10">
                <Mail className="h-8 w-8 text-[rgb(var(--primary))]" />
            </div>
            {params.get('created') === '1' && <p role="status" className="text-sm text-center text-[rgb(var(--foreground))]">Your account was created successfully. A verification email is on its way to <strong>{params.get('email')}</strong>.</p>}
            <p className="text-sm text-[rgb(var(--muted-foreground))]">Check your spam folder too. If the email hasn’t arrived, request a fresh link below. You don’t need to register again.</p>
            {message && <p role="status" className="rounded-lg bg-[rgb(var(--primary))]/10 p-3 text-sm">{message}</p>}
            {error && <p role="alert" className="rounded-lg bg-[rgb(var(--destructive))]/10 p-3 text-sm text-[rgb(var(--destructive))]">{error}</p>}
            <form className="space-y-4" onSubmit={async event => {
                event.preventDefault(); setBusy(true); setError(''); setMessage('');
                try { await resendEmail(email); setMessage('If this address has an unverified account, a new verification link is on its way.'); setCooldown(60); }
                catch (err) { const data = (err as {response?: {data?: {detail?: string}}}).response?.data; setError(data?.detail || 'We couldn’t send the link. Please try again shortly.'); }
                finally { setBusy(false); }
            }}>
                <FormField label="Email address"><AuthInput id="email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} /></FormField>
                <AuthButton type="submit" loading={busy} disabled={busy || cooldown > 0}>{cooldown ? `Resend in ${cooldown}s` : 'Resend verification email'}</AuthButton>
            </form>
            <Link href="/login" className="block text-center text-sm text-[rgb(var(--primary))] hover:underline">Already verified? Sign in</Link>
        </div>
    </AuthCard>;
}
export default function VerifyEmailPage() {
    return <Suspense fallback={<Loader2 className="animate-spin" />}><VerifyEmailContent /></Suspense>;
}
