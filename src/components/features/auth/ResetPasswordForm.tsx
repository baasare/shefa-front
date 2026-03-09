/**
 * ResetPasswordForm
 * Reads uid + token from URL search params.
 * POST /api/auth/password/reset/confirm/
 */

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { FormField, AuthInput, AuthButton } from './AuthCard';
import { resetPassword } from '@/lib/api/authClient';
import { routes } from '@/lib/config/routes';

const resetSchema = z
    .object({
        new_password1: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Must contain at least one number'),
        new_password2: z.string().min(1, 'Please confirm your password'),
    })
    .refine((d) => d.new_password1 === d.new_password2, {
        message: 'Passwords do not match',
        path: ['new_password2'],
    });

type ResetFormData = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
    uid?: string;
    token?: string;
}

export function ResetPasswordForm({ uid: uidProp, token: tokenProp }: ResetPasswordFormProps = {}) {
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    // Support both URL params and search params for flexibility
    const uid = uidProp ?? searchParams.get('uid') ?? '';
    const token = tokenProp ?? searchParams.get('token') ?? '';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetFormData>({ resolver: zodResolver(resetSchema) });

    const onSubmit = async (data: ResetFormData) => {
        if (!uid || !token) {
            setServerError('Invalid reset link. Please request a new one.');
            return;
        }
        setServerError(null);
        try {
            await resetPassword({ uid, token, ...data });
            setSuccess(true);
        } catch (err: unknown) {
            // Handle different error responses from the backend
            const errorData = (err as { response?: { data?: Record<string, string[] | string> } })?.response?.data;
            if (errorData) {
                // Check for specific field errors
                const errorMessage =
                    errorData.token?.[0] ||
                    errorData.uid?.[0] ||
                    errorData.new_password1?.[0] ||
                    errorData.new_password2?.[0] ||
                    errorData.non_field_errors?.[0] ||
                    errorData.detail ||
                    'Password reset failed. The link may have expired.';
                setServerError(errorMessage);
            } else {
                setServerError('Unable to reset password. Please try again or request a new reset link.');
            }
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="h-16 w-16 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[rgb(var(--success))]" strokeWidth={1.5} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Password Reset!</h2>
                    <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                        Your password has been updated successfully.
                    </p>
                </div>
                <Link
                    href={routes.auth.login}
                    className="inline-flex items-center justify-center w-full h-12 rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Continue to Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <p className="text-sm text-[rgb(var(--muted-foreground))] text-center -mt-2">
                Choose a new password for your account.
            </p>

            {serverError && (
                <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm">
                    <p className="text-[rgb(var(--destructive))] font-medium">{serverError}</p>
                    {(serverError.toLowerCase().includes('expired') || serverError.toLowerCase().includes('invalid')) && (
                        <p className="mt-2 text-[rgb(var(--destructive))]/80">
                            <Link href={routes.auth.forgotPassword} className="underline hover:no-underline font-medium">
                                Request a new password reset link
                            </Link>
                        </p>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField label="New Password" error={errors.new_password1?.message} required>
                    <div className="relative">
                        <AuthInput
                            {...register('new_password1')}
                            id="new_password1"
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
                            {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                        </button>
                    </div>
                </FormField>

                <FormField label="Confirm New Password" error={errors.new_password2?.message} required>
                    <AuthInput
                        {...register('new_password2')}
                        id="new_password2"
                        type="password"
                        placeholder="Repeat your new password"
                        autoComplete="new-password"
                    />
                </FormField>

                <AuthButton loading={isSubmitting} type="submit">
                    <Lock className="h-4 w-4" strokeWidth={2} />
                    Reset Password
                </AuthButton>
            </form>
        </div>
    );
}
