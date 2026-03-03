/**
 * Marketing Site Footer
 * Navigation links sourced from footerNav config.
 * Uses BrandLogo for consistent brand presence.
 */

import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { footerNav } from '@/lib/config/navigation';
import { Github, Twitter, Linkedin } from 'lucide-react';

const navSections = [
  { title: 'Product', items: footerNav.product },
  { title: 'Company', items: footerNav.company },
  { title: 'Resources', items: footerNav.resources },
  { title: 'Legal', items: footerNav.legal },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-1">
            <BrandLogo href="/" size="md" className="mb-4" />
            <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed max-w-[200px]">
              AI-powered trading agents that work 24/7 for you.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--primary))]/50 hover:text-[rgb(var(--foreground))] transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-4">
            {navSections.map(({ title, items }) => (
              <div key={title}>
                <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors duration-[var(--transition-fast)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[rgb(var(--border))] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            © {new Date().getFullYear()} ShefaFx. All rights reserved.
          </p>
          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            Trading involves significant risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
