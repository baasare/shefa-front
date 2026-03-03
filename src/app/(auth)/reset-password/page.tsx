import { Metadata } from 'next';
import { Suspense } from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { AuthCard } from '@/components/features/auth/AuthCard';
import { ResetPasswordForm } from '@/components/features/auth/ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Reset Password',
    description: 'Set a new password for your ShefaFx account.',
};

export default function ResetPasswordPage() {
    return (
        <AuthCard
            title="Create new password"
            subtitle="Your new password must be different from the previous one."
            header={<BrandLogo size="lg" href={undefined} showWordmark={false} />}
        >
            <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-[rgb(var(--muted))]" />}>
                <ResetPasswordForm />
            </Suspense>
        </AuthCard>
    );
}
