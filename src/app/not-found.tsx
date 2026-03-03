import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/config/routes';

export default function NotFound() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
      <Button className="mt-8" asChild>
        <Link href={routes.home}>Go Home</Link>
      </Button>
    </div>
  );
}
