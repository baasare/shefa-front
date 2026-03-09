/**
 * Google OAuth Integration
 * Handles Google Sign-In flow with backend integration
 */

import apiClient from './client';
import { tokenStorage } from './authClient';
import { isAppPath } from '@/lib/config/domain-routing';

interface GoogleAuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

/**
 * Initiate Google OAuth flow
 * Opens Google login popup and handles the OAuth callback
 */
export async function loginWithGoogle(): Promise<GoogleAuthResponse> {
  return new Promise((resolve, reject) => {
    // Google OAuth configuration
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      reject(new Error('Google Client ID not configured'));
      return;
    }

    const redirectUri = `${window.location.origin}/callback`;
    const scope = 'profile email';
    const responseType = 'code';

    // Build Google OAuth URL
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', googleClientId);
    googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
    googleAuthUrl.searchParams.set('response_type', responseType);
    googleAuthUrl.searchParams.set('scope', scope);
    googleAuthUrl.searchParams.set('access_type', 'online');
    googleAuthUrl.searchParams.set('prompt', 'select_account');

    // Open popup window
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      googleAuthUrl.toString(),
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    if (!popup) {
      reject(new Error('Failed to open popup. Please allow popups for this site.'));
      return;
    }

    // Listen for callback message
    const messageHandler = async (event: MessageEvent) => {
      // Verify origin
      if (event.origin !== window.location.origin) return;

      // Check for Google OAuth code
      if (event.data.type === 'google-oauth-code') {
        window.removeEventListener('message', messageHandler);

        const { code } = event.data;

        try {
          // Exchange code for tokens via backend
          const response = await apiClient.post<GoogleAuthResponse>('auth/google/', {
            code,
          });

          // Store tokens
          tokenStorage.setTokens(response.data.access, response.data.refresh);

          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      } else if (event.data.type === 'google-oauth-error') {
        window.removeEventListener('message', messageHandler);
        reject(new Error(event.data.error || 'Google authentication failed'));
      }
    };

    window.addEventListener('message', messageHandler);

    // Check if popup was closed
    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval);
        window.removeEventListener('message', messageHandler);
        reject(new Error('Authentication cancelled'));
      }
    }, 500);
  });
}

/**
 * Alternative: Direct redirect flow (no popup)
 * Redirects entire page to Google OAuth
 */
export function redirectToGoogleAuth(): void {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error('Google Client ID not configured');
    return;
  }

  const redirectUri = `${window.location.origin}/callback`;
  const scope = 'profile email';
  const responseType = 'code';

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', googleClientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', responseType);
  googleAuthUrl.searchParams.set('scope', scope);
  googleAuthUrl.searchParams.set('access_type', 'online');
  googleAuthUrl.searchParams.set('prompt', 'select_account');

  const currentUrl = new URL(window.location.href);
  const redirectParam = currentUrl.searchParams.get('redirect');
  const redirectTarget =
    redirectParam && redirectParam.startsWith('/') && isAppPath(redirectParam)
      ? redirectParam
      : currentUrl.pathname;

  sessionStorage.setItem('auth_redirect', redirectTarget);

  window.location.href = googleAuthUrl.toString();
}
