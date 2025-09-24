
'use client';

import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Phone, TriangleAlert } from 'lucide-react';
import { getMentalHealthAdviceAction } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function MentalHealthAssistant() {
  const [state, formAction] = useFormState(getMentalHealthAdviceAction, initialState as any);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mental Health Assistant</CardTitle>
        <CardDescription>
          A safe space to share what's on your mind. Describe how you're feeling, and our AI assistant will offer some gentle, supportive advice.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="userFeelings">How are you feeling today?</Label>
            <Textarea
              id="userFeelings"
              name="userFeelings"
              placeholder="e.g., 'I've been feeling really stressed and overwhelmed with work lately.'"
              className="min-h-[150px]"
              required
            />
            {state?.errors?.userFeelings && <p className="text-sm font-medium text-destructive">{state.errors.userFeelings[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton>Get Advice</SubmitButton>
          
          {state.message === 'AI error. Please try again later.' && (
            <p className="text-sm font-medium text-destructive">{state.message}</p>
          )}

          {state.data && (
            <div className="w-full space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-wide">Supportive Advice</h3>
                <blockquote className="border-l-2 pl-6 text-muted-foreground">
                  {state.data.supportiveAdvice}
                </blockquote>
              </div>

              {state.data.sosHelpline && (
                <Alert variant="destructive">
                  <Phone className="h-4 w-4" />
                  <AlertTitle>Emergency Helpline</AlertTitle>
                  <AlertDescription>
                    It sounds like you're going through a tough time. Please reach out for help. You can contact the crisis helpline at: <strong className="font-bold">{state.data.sosHelpline}</strong>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
