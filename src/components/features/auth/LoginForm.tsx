/**
 * LoginForm
 * React Hook Form + Zod validation
 * Calls authClient.login() — stores tokens on success
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import {
    GoogleOAuthButton,
    AuthDivider,
    FormField,
    AuthInput,
    AuthButton,
} from './AuthCard';
import { useAuthStore } from '@/lib/store/authStore';
import { routes } from '@/lib/config/routes';

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setServerError(null);
        try {
            // Use auth store login which updates state
            await login(data.email, data.password);

            // Get user from auth store to check onboarding status
            const userState = useAuthStore.getState();
            const user = userState.user;

            // Check for redirect query parameter
            const searchParams = new URLSearchParams(window.location.search);
            const redirect = searchParams.get('redirect');

            // Determine destination path
            let destinationPath: string;
            if (user && !user.onboarding_completed) {
                destinationPath = routes.onboarding.welcome;
            } else if (redirect && redirect.startsWith('/')) {
                destinationPath = redirect;
            } else {
                destinationPath = routes.dashboard.home;
            }

            // Check if we're on production and need to redirect to app subdomain
            const hostname = window.location.hostname;
            if (hostname === 'shefafx.com' || hostname === 'www.shefafx.com') {
                // Redirect to app subdomain in production
                window.location.href = `https://app.shefafx.com${destinationPath}`;
            } else {
                // Local development or already on app subdomain
                router.push(destinationPath);
            }
        } catch (err: any) {
            setServerError(
                err?.response?.data?.non_field_errors?.[0] ??
                err?.response?.data?.detail ??
                'Invalid email or password. Please try again.'
            );
        }
    };

    return (
        <div className="space-y-5">
            <GoogleOAuthButton label="Continue with Google" />
            <AuthDivider />

            {serverError && (
                <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm text-[rgb(var(--destructive))]">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField label="Email" error={errors.email?.message} required>
                    <AuthInput
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                </FormField>

                <FormField label="Password" error={errors.password?.message} required>
                    <div className="relative">
                        <AuthInput
                            {...register('password')}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                            ) : (
                                <Eye className="h-4 w-4" strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                </FormField>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                    {/*<label className="flex cursor-pointer items-center gap-2">*/}
                    {/*    <input*/}
                    {/*        {...register('rememberMe')}*/}
                    {/*        type="checkbox"*/}
                    {/*        className="h-4 w-4 rounded border-[rgb(var(--border))] accent-[rgb(var(--primary))]"*/}
                    {/*    />*/}
                    {/*    <span className="text-sm text-[rgb(var(--muted-foreground))]">Remember me</span>*/}
                    {/*</label>*/}
                    <Link
                        href={routes.auth.forgotPassword}
                        className="text-sm font-medium text-[rgb(var(--primary))] hover:underline underline-offset-2 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <AuthButton loading={isSubmitting} type="submit">
                    Log In
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </AuthButton>
            </form>
        </div>
    );
}
