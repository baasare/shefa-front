import axios from 'axios';
import {API_BASE} from './config';
import {isAppPath} from '@/lib/config/domain-routing';

// State and PKCE are generated and checked by the API, bound to its session cookie.
export async function redirectToGoogleAuth(): Promise<void> {
    const redirect = new URLSearchParams(window.location.search).get('redirect');
    if (redirect && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes('\\') && isAppPath(redirect)) {
        sessionStorage.setItem('auth_redirect', redirect);
    } else {
        sessionStorage.removeItem('auth_redirect');
    }
    const {data} = await axios.get<{url: string}>(`${API_BASE}auth/google/start/`, {withCredentials: true});
    window.location.assign(data.url);
}
