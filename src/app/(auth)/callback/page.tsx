'use client';
import {useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {API_BASE} from '@/lib/api/config';
import {useAuthStore} from '@/lib/store/authStore';
import {getCurrentUser, tokenStorage} from '@/lib/api/authClient';
import {isAppPath} from '@/lib/config/domain-routing';
import {AuthCard} from '@/components/features/auth/AuthCard';

export default function CallbackPage() {
    const router = useRouter();
    const params = useSearchParams();
    const started = useRef(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const code = params.get('code');
        const state = params.get('state');
        // Keep authorization codes out of subsequent history/referrers.
        window.history.replaceState(null, '', '/callback');
        if (params.get('error') || !code || !state) {
            setError('Google sign-in was cancelled or could not be completed. Please try again.');
            return;
        }
        (async () => {
            try {
                const {data} = await axios.post(`${API_BASE}auth/google/`, {code, state}, {withCredentials: true});
                tokenStorage.setTokens(data.access, data.refresh);
                const user = await getCurrentUser();
                useAuthStore.setState({user, isAuthenticated: true, isLoading: false});
                const redirect = sessionStorage.getItem('auth_redirect');
                sessionStorage.removeItem('auth_redirect');
                const safe = redirect && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes('\\') && isAppPath(redirect);
                router.replace(!user.onboarding_completed ? '/welcome' : safe ? redirect : '/dashboard');
            } catch (err) {
                tokenStorage.clearTokens();
                const data = (err as {response?: {data?: {detail?: string; non_field_errors?: string[]}}}).response?.data;
                setError(data?.detail || data?.non_field_errors?.[0] || 'Google sign-in failed. Please start again.');
            }
        })();
    }, [params, router]);
    return <AuthCard title={error ? 'Sign-in couldn’t finish' : 'Signing you in'} subtitle={error || 'Please wait while we securely connect your Google account.'}>
        {error ? <Link href="/login" className="block rounded-lg bg-[rgb(var(--primary))] p-3 text-center font-semibold text-white">Return to sign in</Link> : <div role="status" aria-label="Signing in" className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />}
    </AuthCard>;
}
