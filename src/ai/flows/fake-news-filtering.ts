'use server';

/**
 * @fileOverview AI-powered fake health news filter.
 *
 * - filterFakeNews - A function that filters potentially fake health news.
 * - FilterFakeNewsInput - The input type for the filterFakeNews function.
 * - FilterFakeNewsOutput - The return type for the filterFakeNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterFakeNewsInputSchema = z.object({
  newsArticle: z
    .string()
    .describe('The health-related news article to be checked.'),
});
export type FilterFakeNewsInput = z.infer<typeof FilterFakeNewsInputSchema>;

const FilterFakeNewsOutputSchema = z.object({
  isFakeNews: z
    .boolean()
    .describe('Whether the news article is likely to be fake news.'),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence level of the assessment.'
    ),
  reason: z
    .string()
    .describe('The reasoning behind the fake news assessment.'),
});
export type FilterFakeNewsOutput = z.infer<typeof FilterFakeNewsOutputSchema>;

export async function filterFakeNews(input: FilterFakeNewsInput): Promise<FilterFakeNewsOutput> {
  return filterFakeNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterFakeNewsPrompt',
  input: {schema: FilterFakeNewsInputSchema},
  output: {schema: FilterFakeNewsOutputSchema},
  prompt: `You are an expert in identifying fake health news. Analyze the following news article and determine if it is likely to be fake news.

News Article: {{{newsArticle}}}

Provide a confidence score (0-1), a boolean value indicating whether the news is fake, and a reasoning for your assessment.

Output in JSON format:
{
  "isFakeNews": boolean,
  "confidenceScore": number,
  "reason": string
}`,
});

const filterFakeNewsFlow = ai.defineFlow(
  {
    name: 'filterFakeNewsFlow',
    inputSchema: FilterFakeNewsInputSchema,
    outputSchema: FilterFakeNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
