/**
 * RegisterForm
 * Account credentials only (name, email, password).
 * NOT onboarding — no stepper here.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import {
    GoogleOAuthButton,
    AuthDivider,
    FormField,
    AuthInput,
    AuthButton,
} from './AuthCard';
import { useAuthStore } from '@/lib/store/authStore';
import { routes } from '@/lib/config/routes';

const registerSchema = z
    .object({
        first_name: z.string().min(1, 'First name is required'),
        last_name: z.string().min(1, 'Last name is required'),
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Must contain at least one number'),
        password_confirm: z.string().min(8, 'Please confirm your password'),
    })
    .refine((d) => d.password === d.password_confirm, {
        message: 'Passwords do not match',
        path: ['password_confirm'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter();
    const registerUser = useAuthStore((state) => state.register);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setServerError(null);
        try {
            // Use auth store register which updates state
            await registerUser({
                email: data.email,
                password1: data.password,
                password2: data.password_confirm,
                first_name: data.first_name,
                last_name: data.last_name,
            });
            // After registration, go to verify email page
            router.push(`${routes.auth.verifyEmail}?email=${encodeURIComponent(data.email)}`);
        } catch (err: any) {
            const errData = err?.response?.data;
            const firstError =
                errData?.email?.[0] ??
                errData?.password1?.[0] ??
                errData?.password2?.[0] ??
                errData?.non_field_errors?.[0] ??
                'Registration failed. Please try again.';
            setServerError(firstError);
        }
    };

    return (
        <div className="space-y-5">
            <GoogleOAuthButton label="Sign up with Google" />
            <AuthDivider text="or sign up with email" />

            {serverError && (
                <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm text-[rgb(var(--destructive))]">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-3">
                    <FormField label="First Name" error={errors.first_name?.message} required>
                        <AuthInput
                            {...register('first_name')}
                            id="first_name"
                            type="text"
                            placeholder="Jane"
                            autoComplete="given-name"
                        />
                    </FormField>
                    <FormField label="Last Name" error={errors.last_name?.message} required>
                        <AuthInput
                            {...register('last_name')}
                            id="last_name"
                            type="text"
                            placeholder="Smith"
                            autoComplete="family-name"
                        />
                    </FormField>
                </div>

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
                            placeholder="Min 8 chars, 1 uppercase, 1 number"
                            autoComplete="new-password"
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

                <FormField label="Confirm Password" error={errors.password_confirm?.message} required>
                    <AuthInput
                        {...register('password_confirm')}
                        id="password_confirm"
                        type="password"
                        placeholder="Repeat your password"
                        autoComplete="new-password"
                    />
                </FormField>

                <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <Link href="/legal/terms" className="text-[rgb(var(--primary))] hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/privacy" className="text-[rgb(var(--primary))] hover:underline">
                        Privacy Policy
                    </Link>.
                </p>

                <AuthButton loading={isSubmitting} type="submit">
                    <UserPlus className="h-4 w-4" strokeWidth={2} />
                    Create Account
                </AuthButton>
            </form>
        </div>
    );
}
