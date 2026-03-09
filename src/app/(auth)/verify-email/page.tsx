'use client';

import {Suspense, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle} from 'lucide-react';
import Link from 'next/link';
import {AuthLayout} from '@/components/features/auth/AuthLayout';
import {AuthCard, AuthButton} from '@/components/features/auth/AuthCard';
import {resendEmail} from '@/lib/api/authClient';
import {routes} from '@/lib/config/routes';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [isResending, setIsResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResend = async () => {
        if (!email) {
            setResendStatus('error');
            setErrorMessage('Email address is missing. Please try signing up again.');
            return;
        }

        setIsResending(true);
        setResendStatus('idle');
        try {
            await resendEmail(email);
            setResendStatus('success');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { detail?: string } } };
            setResendStatus('error');
            setErrorMessage(error.response?.data?.detail || 'Failed to resend verification email.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <AuthCard
            title="Check your email"
            subtitle={
                email
                    ? `We've sent a verification link to ${email}. Please check your inbox and click the link to activate your account.`
                    : 'We\'ve sent a verification link to your email address. Please check your inbox and click the link to activate your account.'
            }
        >
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--primary))]/10 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-[rgb(var(--primary))]" strokeWidth={1.5}/>
                </div>

                <div className="w-full space-y-4">
                    {resendStatus === 'success' && (
                        <div
                            className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400 flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0"/>
                            <p>Verification email resent successfully!</p>
                        </div>
                    )}

                    {resendStatus === 'error' && (
                        <div
                            className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm text-[rgb(var(--destructive))] flex items-start gap-3">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0"/>
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <div className="text-sm text-center text-[rgb(var(--muted-foreground))] px-4">
                        Didn't receive it? Check your spam folder or{' '}
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-[rgb(var(--primary))] hover:underline font-medium disabled:opacity-50 inline-flex items-center gap-1"
                        >
                            {isResending && <Loader2 className="h-3 w-3 animate-spin"/>}
                            resend
                        </button>
                        .
                    </div>

                    <div className="pt-2">
                        <Link href={routes.auth.register}>
                            <AuthButton className="w-full">
                                <ArrowLeft className="h-4 w-4 mr-2"/>
                                Back to registration
                            </AuthButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthCard>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <AuthCard title="Loading..." subtitle="Please wait while we prepare the page">
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]"/>
                </div>
            </AuthCard>
        }>
            <VerifyEmailContent/>
        </Suspense>
    );
}
