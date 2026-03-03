import { Metadata } from 'next';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { AuthCard } from '@/components/features/auth/AuthCard';
import { RegisterForm } from '@/components/features/auth/RegisterForm';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your ShefaFx account.',
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Start trading smarter with AI today."
      header={<BrandLogo size="lg" href={undefined} showWordmark={false} />}
      footer={
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Already have an account?{' '}
          <Link
            href={routes.auth.login}
            className="font-medium text-[rgb(var(--primary))] hover:underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
