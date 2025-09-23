
import Link from 'next/link';
import { Logo } from '@/components/icons';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">Swasthya Lite</span>
          </Link>
        </div>
        <p className="max-w-md text-balance text-center text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> This is an AI-powered tool for informational
          purposes only and not a substitute for professional medical advice.
          Always consult a healthcare provider for any medical concerns.
        </p>
      </div>
    </footer>
  );
}
