
'use client';

import Link from 'next/link';
import { OdishaLogo } from '@/components/icons';
import { useTranslation } from '@/context/translation-context';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <OdishaLogo className="h-6 w-6 text-primary" />
            <span className="font-bold">{t('header.title')}</span>
          </Link>
        </div>
        <p className="text-balance text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t('header.subtitle')}
        </p>
      </div>
    </footer>
  );
}
