import React from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import {useAuthStore} from '@/lib/store/authStore';
import AuthLayout from '@/app/(auth)/layout';
import {RegisterForm} from '@/components/features/auth/RegisterForm';
import {EmailConfirmation} from '@/components/features/auth/EmailConfirmation';
import {tokenStorage} from '@/lib/api/authClient';
import * as authClient from '@/lib/api/authClient';
import {getNavigationUrlForHost} from '@/lib/config/domain-routing';

const navigation = vi.hoisted(() => ({push: vi.fn(), replace: vi.fn()}));
vi.mock('next/navigation', () => ({useRouter: () => navigation}));
vi.mock('@/components/features/auth/AuthLayout', () => ({AuthLayout: ({children}: {children: React.ReactNode}) => <main>{children}</main>}));

beforeEach(() => {
    const storage = new Map<string, string>();
    vi.stubGlobal('localStorage', {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, String(value)),
        removeItem: (key: string) => storage.delete(key),
        clear: () => storage.clear(),
    });
    useAuthStore.setState({user: null, isAuthenticated: false, isLoading: false});
});
afterEach(() => {cleanup(); vi.restoreAllMocks();});

function fillRegistration() {
    const fields = {first_name: 'Jane', last_name: 'Test', email: 'jane@example.com', password: 'StrongPass984!', password_confirm: 'StrongPass984!'};
    for (const [id, value] of Object.entries(fields)) fireEvent.change(document.getElementById(id)!, {target: {value}});
    fireEvent.click(screen.getByRole('button', {name: 'Create Account'}));
}
describe('registration', () => {
    it('keeps the form mounted and navigates to the success page without inventing tokens', async () => {
        let finish!: (value: unknown) => void;
        vi.spyOn(axios, 'post').mockImplementationOnce(() => new Promise(resolve => {finish = resolve;}));
        render(<AuthLayout><RegisterForm /></AuthLayout>);
        fillRegistration();
        await waitFor(() => expect(useAuthStore.getState().isLoading).toBe(true));
        expect(document.getElementById('email')).not.toBeNull();
        finish({data: {detail: 'Verification e-mail sent.'}});
        await waitFor(() => expect(navigation.push).toHaveBeenCalledWith('/verify-email?created=1&email=jane%40example.com'));
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
        expect(tokenStorage.getAccess()).toBeNull();
        expect(tokenStorage.getRefresh()).toBeNull();
    });
    it('retains the entered email and shows delivery errors', async () => {
        vi.spyOn(axios, 'post').mockRejectedValueOnce({response: {data: {detail: 'We could not send the email right now. Please try again shortly.'}}});
        render(<AuthLayout><RegisterForm /></AuthLayout>);
        fillRegistration();
        expect((await screen.findByRole('alert')).textContent).toContain('could not send');
        expect((document.getElementById('email') as HTMLInputElement).value).toBe('jane@example.com');
    });
});
it('verification waits for a deliberate click, then offers sign-in without redirecting to protected onboarding', async () => {
    const verify = vi.spyOn(authClient, 'verifyEmail').mockResolvedValueOnce();
    render(<EmailConfirmation confirmationKey="test-key" />);
    expect(verify).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', {name: 'Verify email address'}));
    expect((await screen.findByRole('link', {name: 'Continue to sign in'})).getAttribute('href')).toBe('/login?verified=1');
    expect(verify).toHaveBeenCalledOnce();
});
it('keeps dashboard navigation on the authenticated origin', () => {
    expect(getNavigationUrlForHost('/dashboard', 'shefafx.com')).toBe('/dashboard');
});
it('ignores tokens written as undefined by the old signup flow', () => {
    localStorage.setItem('access_token', 'undefined');
    localStorage.setItem('refresh_token', 'undefined');
    expect(tokenStorage.getAccess()).toBeNull();
    expect(tokenStorage.getRefresh()).toBeNull();
});
