/**
 * Breadcrumbs Component
 * Navigation breadcrumbs for page hierarchy
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {paths.map((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/');
        const isLast = index === paths.length - 1;
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

        return (
          <Fragment key={href}>
            <span>/</span>
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground">
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
