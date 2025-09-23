
'use client';

import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { checkFakeNewsAction } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function FakeNewsFilter() {
  const [state, formAction] = useFormState(checkFakeNewsAction, initialState as any);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fake News Verifier</CardTitle>
        <CardDescription>
          Paste a health-related news article below to check its authenticity.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="newsArticle">News Article</Label>
            <Textarea
              id="newsArticle"
              name="newsArticle"
              placeholder="Paste the full text of the news article here..."
              className="min-h-[150px]"
              required
            />
            {state?.errors?.newsArticle && <p className="text-sm font-medium text-destructive">{state.errors.newsArticle[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton>Verify News</SubmitButton>
          
          {state.message === 'AI error. Please try again later.' && (
            <p className="text-sm font-medium text-destructive">{state.message}</p>
          )}

          {state.data && (
            <div className="w-full space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">RESULT</h3>
                <div className="flex items-center gap-2">
                  {state.data.isFakeNews ? (
                    <Badge variant="destructive" className="text-base">
                      <ShieldAlert className="mr-2 h-5 w-5" />
                      Likely Fake News
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-success text-base text-white dark:text-black">
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Likely Authentic
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">CONFIDENCE</h3>
                 <div className="flex items-center gap-4">
                    <Progress value={state.data.confidenceScore * 100} />
                    <span className="font-bold text-lg text-primary">
                      {Math.round(state.data.confidenceScore * 100)}%
                    </span>
                 </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">REASONING</h3>
                <blockquote className="border-l-2 pl-6 text-muted-foreground">
                  {state.data.reason}
                </blockquote>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
