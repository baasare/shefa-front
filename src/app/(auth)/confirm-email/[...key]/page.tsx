'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AuthLayout } from '@/components/features/auth/AuthLayout';
import { AuthCard, AuthButton } from '@/components/features/auth/AuthCard';
import { verifyEmail } from '@/lib/api/authClient';
import { routes } from '@/lib/config/routes';

export default function ConfirmEmailPage() {
    const params = useParams();
    const router = useRouter();
    // Handle catch-all route and decode the key
    // The key may be URL-encoded (%3A for colons), so we need to decode it
    const keyParam = params.key;
    const rawKey = Array.isArray(keyParam) ? keyParam.join(':') : keyParam as string;
    const key = decodeURIComponent(rawKey);

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const verificationStarted = useRef(false);

    useEffect(() => {
        if (!key || verificationStarted.current) return;

        const performVerification = async () => {
            verificationStarted.current = true;
            try {
                await verifyEmail(key);
                setStatus('success');
                // Auto redirect to login after 3 seconds
                setTimeout(() => {
                    router.push(routes.auth.login);
                }, 3000);
            } catch (err: any) {
                setStatus('error');
                setErrorMessage(
                    err.response?.data?.detail ||
                    err.response?.data?.non_field_errors?.[0] ||
                    'The verification link is invalid or has expired.'
                );
            }
        };

        performVerification();
    }, [key, router]);

    return (
            <AuthCard
                title={
                    status === 'loading' ? 'Verifying your email' :
                        status === 'success' ? 'Email verified!' :
                            'Verification failed'
                }
                subtitle={
                    status === 'loading' ? 'Please wait while we verify your email...' :
                        status === 'success' ? 'Your email has been verified! You can now log in to your account.' :
                            'We encountered an issue while verifying your email address.'
                }
            >
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-[rgb(var(--primary))]" />
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </div>

                            {/*<Link href={routes.auth.login} className="w-full">*/}
                            {/*    <AuthButton className="w-full">*/}
                            {/*        Continue to Login*/}
                            {/*        <ArrowRight className="h-4 w-4 ml-2" />*/}
                            {/*    </AuthButton>*/}
                            {/*</Link>*/}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center space-y-6 w-full">
                            <div className="w-16 h-16 rounded-full bg-[rgb(var(--destructive))]/10 flex items-center justify-center">
                                <AlertCircle className="h-8 w-8 text-[rgb(var(--destructive))]" />
                            </div>

                            <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm text-[rgb(var(--destructive))] w-full text-center">
                                {errorMessage}
                            </div>

                            <div className="flex flex-col w-full gap-3">
                                <Link href={routes.auth.register} className="w-full">
                                    <AuthButton className="w-full">
                                        Sign up again
                                    </AuthButton>
                                </Link>
                                <Link href={routes.auth.login} className="w-full text-center text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
                                    Return to login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </AuthCard>
    );
}
