'use server';

/**
 * @fileOverview Personalized health tips flow.
 *
 * This file defines a Genkit flow that takes user symptoms as input and returns personalized health tips based on general medical knowledge.
 *
 * @remarks
 * - `personalizedHealthTips`: The main function that triggers the flow.
 * - `PersonalizedHealthTipsInput`: The input type for the `personalizedHealthTips` function, defining the structure of the user's symptom data.
 * - `PersonalizedHealthTipsOutput`: The output type for the `personalizedHealthTips` function, defining the structure of the AI-generated health tips.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the input schema for the personalized health tips flow.
 * It expects a string containing the user's symptoms.
 */
const PersonalizedHealthTipsInputSchema = z.object({
  symptoms: z.string().describe('The symptoms reported by the user.'),
});
export type PersonalizedHealthTipsInput = z.infer<
  typeof PersonalizedHealthTipsInputSchema
>;

/**
 * Defines the output schema for the personalized health tips flow.
 * It returns a structured object containing analysis, cures, and medicine suggestions.
 */
const PersonalizedHealthTipsOutputSchema = z.object({
  symptomAnalysis: z
    .string()
    .describe('A brief analysis and potential interpretation of the symptoms provided.'),
  recommendedCure: z
    .string()
    .describe('Recommended non-medicinal actions, home remedies, or lifestyle adjustments to help alleviate the symptoms.'),
  suggestedMedicines: z
    .string()
    .describe('A list of suggested over-the-counter medicines that may help. This should always include a strong disclaimer to consult a doctor before taking any medication.'),
});
export type PersonalizedHealthTipsOutput = z.infer<
  typeof PersonalizedHealthTipsOutputSchema
>;

/**
 * The main function to generate personalized health tips.
 * @param input - An object containing the user's symptoms.
 * @returns A promise that resolves to an object containing personalized health tips.
 */
export async function personalizedHealthTips(
  input: PersonalizedHealthTipsInput
): Promise<PersonalizedHealthTipsOutput> {
  return personalizedHealthTipsFlow(input);
}

/**
 * Defines the prompt for generating personalized health tips.
 * It uses the user's symptoms as input and instructs the AI to generate relevant health tips in a structured format.
 */
const personalizedHealthTipsPrompt = ai.definePrompt({
  name: 'personalizedHealthTipsPrompt',
  input: {schema: PersonalizedHealthTipsInputSchema},
  output: {schema: PersonalizedHealthTipsOutputSchema},
  prompt: `You are an AI health assistant. A user will provide symptoms, and you will provide personalized health tips based on the user input and general medical knowledge.

Symptoms: {{{symptoms}}}

Please provide a response in three parts:
1.  **Symptom Analysis:** A brief analysis and potential interpretation of the symptoms provided.
2.  **Recommended Cure:** Recommended non-medicinal actions, home remedies, or lifestyle adjustments.
3.  **Suggested Medicines:** A list of suggested over-the-counter medicines. **Crucially, you must include a strong disclaimer that a doctor should be consulted before taking any medication.**`,
});

/**
 * Defines the Genkit flow for generating personalized health tips.
 * It takes user symptoms as input and returns AI-generated health tips.
 */
const personalizedHealthTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHealthTipsFlow',
    inputSchema: PersonalizedHealthTipsInputSchema,
    outputSchema: PersonalizedHealthTipsOutputSchema,
  },
  async input => {
    const {output} = await personalizedHealthTipsPrompt(input);
    return output!;
  }
);
