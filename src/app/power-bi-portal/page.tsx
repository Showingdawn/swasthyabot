import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart } from 'lucide-react';

export default function PowerBIPortal() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-24">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <AreaChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Power BI Analytics Portal</CardTitle>
                  <CardDescription>
                    Visualizing Health Data for the State of Odisha
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                <div className="text-center text-muted-foreground">
                  <p className="font-semibold">Power BI Report Embedding</p>
                  <p className="text-sm">
                    Your interactive Power BI dashboard will be displayed here.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
