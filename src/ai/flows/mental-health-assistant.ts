
'use server';

/**
 * @fileOverview A mental health assistant that provides supportive advice.
 *
 * - getMentalHealthAdvice - A function that provides advice based on user's feelings.
 * - MentalHealthAdviceInput - The input type for the getMentalHealthAdvice function.
 * - MentalHealthAdviceOutput - The return type for the getMentalHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalHealthAdviceInputSchema = z.object({
  userFeelings: z
    .string()
    .describe('The user\'s description of their current feelings or mental state.'),
});
export type MentalHealthAdviceInput = z.infer<typeof MentalHealthAdviceInputSchema>;

const MentalHealthAdviceOutputSchema = z.object({
  supportiveAdvice: z
    .string()
    .describe('Supportive and constructive advice, including potential stress-relief tips or breathing exercises.'),
  sosHelpline: z
    .string()
    .describe('An SOS helpline number or resource. Should be provided if the user\'s input suggests a crisis.'),
});
export type MentalHealthAdviceOutput = z.infer<typeof MentalHealthAdviceOutputSchema>;

export async function getMentalHealthAdvice(input: MentalHealthAdviceInput): Promise<MentalHealthAdviceOutput> {
  return mentalHealthAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthAssistantPrompt',
  input: {schema: MentalHealthAdviceInputSchema},
  output: {schema: MentalHealthAdviceOutputSchema},
  prompt: `You are a compassionate and supportive mental health assistant. A user will describe their feelings. Your goal is to provide gentle, encouraging advice.

User's Feelings: {{{userFeelings}}}

Based on the user's input, provide:
1.  **Supportive Advice:** Offer kind words, stress-relief tips, or simple breathing exercises. Your response should be empathetic and non-judgmental.
2.  **SOS Helpline:** If the user's message indicates a crisis, self-harm, or severe distress, you MUST provide an appropriate SOS helpline number (e.g., a national suicide prevention hotline in India like 988 or 1800-599-0019). If the situation does not seem like a crisis, you can leave this field empty.

Always include a disclaimer that you are an AI assistant and not a substitute for a professional therapist or counselor.`,
});

const mentalHealthAssistantFlow = ai.defineFlow(
  {
    name: 'mentalHealthAssistantFlow',
    inputSchema: MentalHealthAdviceInputSchema,
    outputSchema: MentalHealthAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
