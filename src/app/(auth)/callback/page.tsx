/**
 * OAuth Callback Page
 * Handles Google OAuth redirect and exchanges code for tokens
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import * as authClient from '@/lib/api/authClient';
import apiClient from '@/lib/api/client';
import { tokenStorage } from '@/lib/api/authClient';
import { routes } from '@/lib/config/routes';
import { isAppPath } from '@/lib/config/domain-routing';
import { getNavigationUrl } from '@/lib/utils/navigation';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const redirectTo = (path: string) => {
    const navigationUrl = getNavigationUrl(path);
    if (navigationUrl.startsWith('http')) {
      window.location.href = navigationUrl;
      return;
    }

    router.push(path);
  };

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      // If opened in popup, send message to opener
      if (window.opener) {
        if (errorParam) {
          window.opener.postMessage(
            {
              type: 'google-oauth-error',
              error: errorParam,
            },
            window.location.origin
          );
          window.close();
          return;
        }

        if (code) {
          window.opener.postMessage(
            {
              type: 'google-oauth-code',
              code,
            },
            window.location.origin
          );
          window.close();
          return;
        }
      }

      // Handle redirect flow (not popup)
      if (errorParam) {
        setError('Authentication failed. Please try again.');
        setTimeout(() => redirectTo(routes.auth.login), 3000);
        return;
      }

      if (!code) {
        setError('No authorization code received.');
        setTimeout(() => redirectTo(routes.auth.login), 3000);
        return;
      }

      try {
        // Exchange code for tokens

        const response = await apiClient.post('auth/google/', {
          code: code,
        });

        // dj-rest-auth returns different token field names
        const accessToken = response.data.access_token || response.data.access || response.data.key;
        const refreshToken = response.data.refresh_token || response.data.refresh;

        if (!accessToken) {
          throw new Error('No access token received from server');
        }

        // Store tokens
        tokenStorage.setTokens(accessToken, refreshToken || '');

        // Fetch full user profile to get all fields including onboarding_completed
        const freshUser = await authClient.getCurrentUser();

        // Update auth store
        useAuthStore.setState({
          user: freshUser,
          isAuthenticated: true,
          isLoading: false,
        });

        // Get redirect path from session storage or default to dashboard
        const storedRedirect = sessionStorage.getItem('auth_redirect');
        sessionStorage.removeItem('auth_redirect');

        let redirectPath: string = routes.dashboard.home;
        if (!freshUser.onboarding_completed) {
          redirectPath = routes.onboarding.welcome;
        } else if (storedRedirect && storedRedirect.startsWith('/') && isAppPath(storedRedirect)) {
          redirectPath = storedRedirect;
        }

        redirectTo(redirectPath);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { detail?: string; non_field_errors?: string[]; code?: string[]; error?: string } } };
        console.error('OAuth callback error:', error);
        console.error('Error response:', error?.response?.data);

        // Get detailed error message
        let errorMessage = 'Authentication failed. Please try again.';

        if (error?.response?.data) {
          const errData = error.response.data;
          errorMessage =
            errData.detail ||
            errData.non_field_errors?.[0] ||
            errData.code?.[0] ||
            errData.error ||
            'Authentication failed. Please try again.';
        }

        setError(errorMessage);
        setTimeout(() => redirectTo(routes.auth.login), 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))]">
        <div className="max-w-md rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[rgb(var(--destructive))]/10 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-[rgb(var(--destructive))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
            Authentication Failed
          </h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">{error}</p>
          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))]">
      <div className="max-w-md rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />
        </div>
        <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">
          Completing Sign In
        </h2>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Please wait while we log you in...
        </p>
      </div>
    </div>
  );
}
