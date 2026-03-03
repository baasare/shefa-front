'use client';

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#eff6ff] to-[#f5f3ff] dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[480px] bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 sm:p-10 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reset your password
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center max-w-sm">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              id="email"
              placeholder="Enter your email address"
              type="email"
            />
          </div>

          <button
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
            type="submit"
          >
            <span>Send Reset Link</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href={routes.auth.login}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <span>←</span>
            Back to Log in
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © 2024 ShefaFx. All rights reserved.
      </div>
    </div>
  );
}
