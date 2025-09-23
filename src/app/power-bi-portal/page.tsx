import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

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
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>How to Embed Your Report</AlertTitle>
                <AlertDescription>
                  In the Power BI service, open your report and go to{' '}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    File &gt; Embed report &gt; Publish to web (public)
                  </code>
                  . Copy the HTML iframe snippet and replace the placeholder below with your actual report code.
                </AlertDescription>
              </Alert>

              <div className="aspect-video w-full overflow-hidden rounded-lg border">
                {/* 
                  Replace this placeholder iframe with the one you get from Power BI's "Publish to web" feature.
                  It will look something like this:
                  <iframe title="Your Report Title" width="100%" height="100%" src="https://app.powerbi.com/view?r=..." frameBorder="0" allowFullScreen="true"></iframe>
                */}
                <div className="flex h-full w-full items-center justify-center bg-muted text-center text-muted-foreground">
                  <div>
                    <p className="font-semibold">Your Power BI Report Goes Here</p>
                    <p className="text-sm">
                      Replace this element with the iframe from Power BI.
                    </p>
                  </div>
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
