
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SymptomChecker } from '@/components/symptom-checker';
import { FakeNewsFilter } from '@/components/fake-news-filter';
import { FileScan, HeartPulse, Map, Newspaper, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/translation-context';
import { MentalHealthAssistant } from '@/components/mental-health-assistant';
import { ReportAnalyzer } from '@/components/report-analyzer';
import { NearbyServicesFinder } from '@/components/nearby-services-finder';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-gov');
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t('home.hero.title')}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t('home.hero.description')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <a href="#features">{t('home.hero.getStarted')}</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/power-bi-portal">{t('home.hero.viewAnalytics')}</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={1200}
                  height={800}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              )}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto w-full max-w-3xl">
              <Tabs defaultValue="symptom-checker">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="symptom-checker">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    {t('home.tabs.symptomChecker')}
                  </TabsTrigger>
                  <TabsTrigger value="news-filter">
                    <Newspaper className="mr-2 h-4 w-4" />
                    {t('home.tabs.newsVerifier')}
                  </TabsTrigger>
                  <TabsTrigger value="mental-health">
                    <HeartPulse className="mr-2 h-4 w-4" />
                    {t('home.tabs.mentalHealthAssistant')}
                  </TabsTrigger>
                  <TabsTrigger value="report-analyzer">
                    <FileScan className="mr-2 h-4 w-4" />
                    {t('home.tabs.reportAnalyzer')}
                  </TabsTrigger>
                  <TabsTrigger value="nearby-services">
                    <Map className="mr-2 h-4 w-4" />
                    {t('home.tabs.nearbyServices')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="symptom-checker" className="mt-4">
                  <SymptomChecker />
                </TabsContent>
                <TabsContent value="news-filter" className="mt-4">
                  <FakeNewsFilter />
                </TabsContent>
                <TabsContent value="mental-health" className="mt-4">
                  <MentalHealthAssistant />
                </TabsContent>
                <TabsContent value="report-analyzer" className="mt-4">
                  <ReportAnalyzer />
                </TabsContent>
                <TabsContent value="nearby-services" className="mt-4">
                  <NearbyServicesFinder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
