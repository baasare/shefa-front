import { Metadata } from 'next';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { AuthCard } from '@/components/features/auth/AuthCard';
import { LoginForm } from '@/components/features/auth/LoginForm';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your ShefaFx account.',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Log in to ShefaFx"
      subtitle="Welcome back! Please enter your details."
      header={<BrandLogo size="lg" href={undefined} showWordmark={false} />}
      footer={
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Don&apos;t have an account?{' '}
          <Link
            href={routes.auth.register}
            className="font-medium text-[rgb(var(--primary))] hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
