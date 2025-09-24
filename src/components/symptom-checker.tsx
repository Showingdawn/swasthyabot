
'use client';

import { useFormState } from 'react-dom';
import { getHealthTipsAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/submit-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Pill, Lightbulb, TriangleAlert, Stethoscope, Mic, MicOff } from 'lucide-react';
import { Separator } from './ui/separator';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useTranslation } from '@/context/translation-context';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function SymptomChecker() {
  const [state, formAction] = useFormState(getHealthTipsAction, initialState as any);
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [symptomText, setSymptomText] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setSymptomText(symptomText + finalTranscript + interimTranscript);
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [symptomText]);
  
  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
       if (recognitionRef.current) {
         setSymptomText(''); // Clear previous text on new recording
         recognitionRef.current.start();
       }
    }
    setIsListening(!isListening);
  };


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('home.tabs.symptomChecker')}</CardTitle>
        <CardDescription>
          Describe your symptoms to receive personalized, AI-generated tips.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <div className="relative">
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., 'For the last two days, I have had a sore throat, a mild fever of 100°F, and a persistent dry cough.'"
                className="min-h-[120px] pr-12"
                required
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
              />
              <Button
                type="button"
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                className="absolute bottom-2 right-2 h-8 w-8"
                onClick={handleToggleListening}
                title="Use voice input"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span className="sr-only">{isListening ? 'Stop listening' : 'Start listening'}</span>
              </Button>
            </div>
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
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    Symptom Analysis
                  </h3>
                  <p className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{state.data.symptomAnalysis}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Recommended Cure
                  </h3>
                  <p className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{state.data.recommendedCure}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <Pill className="h-5 w-5 text-primary" />
                    Suggested Medicines
                  </h3>
                  <p className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{state.data.suggestedMedicines}</p>
                </div>
              </div>


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
