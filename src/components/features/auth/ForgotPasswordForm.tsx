/**
 * ForgotPasswordForm
 * Collects email and requests a password reset link.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { FormField, AuthInput, AuthButton } from './AuthCard';
import { requestPasswordReset } from '@/lib/api/authClient';
import { routes } from '@/lib/config/routes';

const forgotSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm() {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<ForgotFormData>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data: ForgotFormData) => {
        setServerError(null);
        try {
            await requestPasswordReset(data.email);
            setSubmitted(true);
        } catch {
            setServerError('Something went wrong. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="h-16 w-16 rounded-full bg-[rgb(var(--success))]/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[rgb(var(--success))]" strokeWidth={1.5} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Check your email</h2>
                    <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
                        We sent a reset link to{' '}
                        <span className="font-medium text-[rgb(var(--foreground))]">{getValues('email')}</span>
                    </p>
                    <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                        Didn't receive it? Check your spam folder.
                    </p>
                </div>
                {/*<Link*/}
                {/*    href={routes.auth.login}*/}
                {/*    className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--primary))] hover:underline underline-offset-2"*/}
                {/*>*/}
                {/*    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />*/}
                {/*    Back to Log In*/}
                {/*</Link>*/}
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <p className="text-sm text-[rgb(var(--muted-foreground))] text-center -mt-2">
                Enter the email linked to your account and we'll send a reset link.
            </p>

            {serverError && (
                <div className="rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-3 text-sm text-[rgb(var(--destructive))]">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField label="Email Address" error={errors.email?.message} required>
                    <AuthInput
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                    />
                </FormField>

                <AuthButton loading={isSubmitting} type="submit">
                    <Mail className="h-4 w-4" strokeWidth={2} />
                    Send Reset Link
                </AuthButton>
            </form>
        </div>
    );
}
