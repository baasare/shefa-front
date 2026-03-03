import { Metadata } from 'next';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { AuthCard } from '@/components/features/auth/AuthCard';
import { ForgotPasswordForm } from '@/components/features/auth/ForgotPasswordForm';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your ShefaFx account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="We'll send you a reset link."
      header={<BrandLogo size="lg" href={undefined} showWordmark={false} />}
      footer={
        <Link
          href={routes.auth.login}
          className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
        >
          ← Back to Log In
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
