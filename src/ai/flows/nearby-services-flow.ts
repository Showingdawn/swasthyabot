
'use server';
/**
 * @fileOverview An AI agent for finding nearby medical services.
 *
 * - findNearbyServices - A function that finds nearby medical services.
 * - FindNearbyServicesInput - The input type for the findNearbyServices function.
 * - FindNearbyServicesOutput - The return type for the findNearbyServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindNearbyServicesInputSchema = z.object({
    latitude: z.number().describe('The user\'s latitude.'),
    longitude: z.number().describe('The user\'s longitude.'),
    serviceType: z.enum(['hospital', 'pharmacy', 'clinic', 'blood bank']).describe('The type of medical service to find.'),
});
export type FindNearbyServicesInput = z.infer<typeof FindNearbyServicesInputSchema>;


const ServiceLocationSchema = z.object({
    name: z.string().describe('The name of the medical facility.'),
    address: z.string().describe('The full address of the facility.'),
    distance: z.string().describe('An estimated distance from the user (e.g., "approx. 2.5 km").'),
});

const FindNearbyServicesOutputSchema = z.object({
  services: z.array(ServiceLocationSchema).describe("A list of nearby medical services. Return an empty array if none are found."),
  disclaimer: z.string().describe('A disclaimer that the results are AI-generated and may not be completely accurate or up-to-date.'),
});
export type FindNearbyServicesOutput = z.infer<typeof FindNearbyServicesOutputSchema>;

export async function findNearbyServices(input: FindNearbyServicesInput): Promise<FindNearbyServicesOutput> {
  return nearbyServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nearbyServicesPrompt',
  input: {schema: FindNearbyServicesInputSchema},
  output: {schema: FindNearbyServicesOutputSchema},
  prompt: `You are a helpful local guide AI. A user needs to find a specific type of medical service near them.

User's Location:
- Latitude: {{{latitude}}}
- Longitude: {{{longitude}}}

Service Needed: {{{serviceType}}}

Based on this information, please provide a list of up to 5 nearby facilities. For each facility, provide its name, address, and an approximate distance from the user's location.

Important:
- Your response MUST be based on general knowledge of locations and you should not use any real-time data.
- You MUST include a disclaimer in your response stating that the information is AI-generated and may not be 100% accurate or up-to-date, and that the user should verify the details.
- If you cannot find any relevant services, return an empty array for the services.`,
});

const nearbyServicesFlow = ai.defineFlow(
  {
    name: 'nearbyServicesFlow',
    inputSchema: FindNearbyServicesInputSchema,
    outputSchema: FindNearbyServicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

