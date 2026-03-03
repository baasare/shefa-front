/**
 * AuthCard Component
 * Shared card shell used by ALL auth pages.
 * Consistent: width, padding, shadow, border, radius, background.
 */

import { cn } from '@/lib/utils/cn';

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    /** Optional header slot (rendered above title) */
    header?: React.ReactNode;
    /** Optional footer slot (rendered below children) */
    footer?: React.ReactNode;
}

export function AuthCard({
    title,
    subtitle,
    children,
    className,
    header,
    footer,
}: AuthCardProps) {
    return (
        <div
            className={cn(
                'w-full max-w-[480px]',
                'rounded-2xl border border-[rgb(var(--border))]',
                'bg-[rgb(var(--card))]',
                'shadow-[var(--shadow-lg)]',
                'flex flex-col',
                className
            )}
        >
            {/* Card Header */}
            <div className="flex flex-col items-center px-8 pt-8 pb-6 border-b border-[rgb(var(--border))]">
                {header}
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] text-center">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))] text-center">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Card Body */}
            <div className="flex-1 px-8 py-6">{children}</div>

            {/* Card Footer */}
            {footer && (
                <div className="px-8 pb-8 pt-0 text-center">{footer}</div>
            )}
        </div>
    );
}

/** Google OAuth Button — shared across LoginForm and RegisterForm */
export function GoogleOAuthButton({ label = 'Continue with Google' }: { label?: string }) {
    return (
        <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 h-12 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] transition-all duration-[var(--transition-fast)]"
        >
            {/* Google G icon */}
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {label}
        </button>
    );
}

/** Divider — "or continue with email" */
export function AuthDivider({ text = 'or continue with email' }: { text?: string }) {
    return (
        <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[rgb(var(--border))]" />
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="bg-[rgb(var(--card))] px-4 text-[rgb(var(--muted-foreground))]">{text}</span>
            </div>
        </div>
    );
}

/** Form field wrapper with label + error */
interface FormFieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
}

export function FormField({ label, error, children, required }: FormFieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[rgb(var(--foreground))]">
                {label}
                {required && <span className="text-[rgb(var(--destructive))] ml-0.5">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-xs text-[rgb(var(--destructive))] mt-1">{error}</p>
            )}
        </div>
    );
}

/** Standard text Input styled with design tokens */
export function AuthInput({
    className,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                'w-full h-12 rounded-lg px-4',
                'bg-[rgb(var(--background))] border border-[rgb(var(--border))]',
                'text-[rgb(var(--foreground))] text-sm',
                'placeholder:text-[rgb(var(--muted-foreground))]',
                'focus:outline-none focus:border-[rgb(var(--primary))] focus:ring-1 focus:ring-[rgb(var(--ring))]',
                'transition-all duration-[var(--transition-fast)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
        />
    );
}

/** Primary submit button */
export function AuthButton({
    loading,
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={cn(
                'w-full h-12 rounded-lg',
                'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]',
                'text-sm font-semibold',
                'hover:opacity-90 active:opacity-80',
                'shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2',
                'transition-all duration-[var(--transition-fast)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2',
                className
            )}
        >
            {loading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    );
}
