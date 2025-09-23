
'use client';

import Link from 'next/link';
import { OdishaLogo } from '@/components/icons';
import { useTranslation } from '@/context/translation-context';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <OdishaLogo className="h-6 w-6 text-primary" />
            <span className="font-bold">{t('header.title')}</span>
          </Link>
        </div>
        <p className="max-w-md text-balance text-center text-sm text-muted-foreground">
          <strong>{t('footer.disclaimer').split(':')[0]}:</strong> {t('footer.disclaimer').split(': ')[1]}
        </p>
      </div>
    </footer>
  );
}
