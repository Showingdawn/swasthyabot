
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { TranslationProvider } from '@/context/translation-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'SwasthyaBot - Ministry of Health, Govt. of Odisha',
  description:
    'An AI-powered health assistant for symptom checking, fake news filtering, and personalized health tips, for the Ministry of Health, Government of Odisha.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <TranslationProvider>{children}</TranslationProvider>
        <Toaster />
      </body>
    </html>
  );
}
