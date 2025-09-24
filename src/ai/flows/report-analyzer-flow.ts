
'use server';
/**
 * @fileOverview An AI agent for analyzing medical documents.
 *
 * - analyzeReport - A function that handles the medical report analysis process.
 * - AnalyzeReportInput - The input type for the analyzeReport function.
 * - AnalyzeReportOutput - The return type for the analyzeReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReportInputSchema = z.object({
  reportImage: z
    .string()
    .describe(
      "A photo of a medical document (like a prescription or lab report), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeReportInput = z.infer<typeof AnalyzeReportInputSchema>;

const MedicationSchema = z.object({
    name: z.string().describe('The name of the medicine.'),
    dosage: z.string().describe('The prescribed dosage (e.g., "500mg", "1 tablet").'),
    frequency: z.string().describe('How often the medicine should be taken (e.g., "Twice a day", "Before sleep").'),
});

const AnalyzeReportOutputSchema = z.object({
  summary: z.string().describe("A brief summary of the document's contents, including patient name, doctor name, and date if available."),
  medications: z.array(MedicationSchema).describe("A list of medications found in the document. Return an empty array if no medications are listed."),
});
export type AnalyzeReportOutput = z.infer<typeof AnalyzeReportOutputSchema>;

export async function analyzeReport(input: AnalyzeReportInput): Promise<AnalyzeReportOutput> {
  return reportAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportAnalyzerPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  prompt: `You are an expert OCR and medical document analysis assistant. Your task is to analyze the provided image of a medical document (such as a prescription or a lab report) and extract key information.

Analyze the following document:
{{media url=reportImage}}

Extract the following information:
1.  **Summary:** Briefly summarize the document. Include the patient's name, doctor's name, and the date if they are visible.
2.  **Medications:** Identify all prescribed medications. For each medication, extract its name, dosage, and frequency. If no medications are listed, return an empty array.

Present the extracted information in a structured JSON format.`,
});

const reportAnalyzerFlow = ai.defineFlow(
  {
    name: 'reportAnalyzerFlow',
    inputSchema: AnalyzeReportInputSchema,
    outputSchema: AnalyzeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
