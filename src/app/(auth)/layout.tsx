import { AuthLayout } from '@/components/features/auth/AuthLayout';

// Keep forms mounted during submission; each flow owns its success navigation.
export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
