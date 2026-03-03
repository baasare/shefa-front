import { Metadata } from 'next';
import { Suspense } from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { AuthCard } from '@/components/features/auth/AuthCard';
import { VerifyEmailForm } from '@/components/features/auth/VerifyEmailForm';

export const metadata: Metadata = {
    title: 'Verify Email',
    description: 'Verify your email address to access your ShefaFx account.',
};

export default function VerifyEmailPage() {
    return (
        <AuthCard
            title="Verify your email"
            header={<BrandLogo size="lg" href={undefined} showWordmark={false} />}
        >
            <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-[rgb(var(--muted))]" />}>
                <VerifyEmailForm />
            </Suspense>
        </AuthCard>
    );
}
