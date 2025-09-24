
'use client';

import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import { useState, useRef } from 'react';
import { analyzeReportAction } from '@/app/actions';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function ReportAnalyzer() {
  const [state, formAction] = useFormState(analyzeReportAction, initialState as any);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report Analyzer</CardTitle>
        <CardDescription>
          Upload a medical prescription or report to extract key information using AI.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="reportImage">Upload Image</Label>
            <Input
              id="reportImage"
              name="reportImage"
              type="file"
              accept="image/*"
              required
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {previewUrl && (
              <div className="relative mt-4 aspect-square w-full max-w-sm overflow-hidden rounded-md border">
                <Image src={previewUrl} alt="Report preview" fill className="object-contain" />
              </div>
            )}
             {state?.errors?.reportImage && <p className="text-sm font-medium text-destructive">{state.errors.reportImage[0]}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton>Analyze Report</SubmitButton>
          
          {state.message === 'AI error. Please try again later.' && (
            <p className="text-sm font-medium text-destructive">{state.message}</p>
          )}

          {state.data && (
            <div className="w-full space-y-6 pt-4">
               <div className="space-y-2">
                 <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">SUMMARY</h3>
                 <p className="text-muted-foreground">{state.data.summary}</p>
              </div>

              {state.data.medications?.length > 0 && (
                 <div className="space-y-2">
                  <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">MEDICATIONS</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicine</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {state.data.medications.map((med: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{med.name}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
