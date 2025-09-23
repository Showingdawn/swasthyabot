
'use client';

import { useFormState } from 'react-dom';
import { getHealthTipsAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, TriangleAlert } from 'lucide-react';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function SymptomChecker() {
  const [state, formAction] = useFormState(getHealthTipsAction, initialState as any);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Symptom Checker & Health Tips</CardTitle>
        <CardDescription>
          Describe your symptoms to receive personalized, AI-generated tips.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <Textarea
              id="symptoms"
              name="symptoms"
              placeholder="e.g., 'For the last two days, I have had a sore throat, a mild fever of 100°F, and a persistent dry cough.'"
              className="min-h-[120px]"
              required
            />
            {state?.errors?.symptoms && <p className="text-sm font-medium text-destructive">{state.errors.symptoms[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <SubmitButton>Get Health Tips</SubmitButton>

            {state.message === 'AI error. Please try again later.' && (
                <p className="text-sm font-medium text-destructive">{state.message}</p>
            )}

            {state.data && (
            <div className="w-full space-y-6 pt-4">
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Personalized Health Tips</AlertTitle>
                <AlertDescription>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {state.data.healthTips}
                  </div>
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Important Disclaimer</AlertTitle>
                <AlertDescription>
                  This information is AI-generated and for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
