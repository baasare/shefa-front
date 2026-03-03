/**
 * Auth Group Layout
 * Wraps all auth pages with AuthLayout (minimal top bar: logo + theme toggle).
 * No dashboard sidebar. No onboarding stepper.
 */

import { AuthLayout } from '@/components/features/auth/AuthLayout';

export default function AuthGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthLayout>{children}</AuthLayout>;
}
