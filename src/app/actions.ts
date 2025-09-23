
'use server';

import { z } from 'zod';
import { filterFakeNews } from '@/ai/flows/fake-news-filtering';
import { personalizedHealthTips } from '@/ai/flows/personalized-health-tips';

const symptomsSchema = z
  .string()
  .min(10, 'Please describe your symptoms in more detail (at least 10 characters).')
  .max(500, 'Please keep your description under 500 characters.');

const newsSchema = z
  .string()
  .min(50, 'Please provide a longer news article for better analysis (at least 50 characters).')
  .max(5000, 'Please keep the article under 5000 characters.');

export async function getHealthTipsAction(
  prevState: any,
  formData: FormData
) {
  const symptoms = formData.get('symptoms') as string;

  const validatedFields = symptomsSchema.safeParse(symptoms);
  if (!validatedFields.success) {
    return {
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const tips = await personalizedHealthTips({ symptoms: validatedFields.data });
    
    // The anonymized symptom data could be sent to a Power BI push dataset here.
    // Example: await pushToPowerBI({ symptom: validatedFields.data, timestamp: new Date() });

    return { message: 'success', data: tips, errors: null };
  } catch (e) {
    console.error(e);
    return { message: 'AI error. Please try again later.', data: null, errors: null };
  }
}

export async function checkFakeNewsAction(
  prevState: any,
  formData: FormData
) {
  const newsArticle = formData.get('newsArticle') as string;
  const validatedFields = newsSchema.safeParse(newsArticle);

  if (!validatedFields.success) {
    return {
      message: 'Invalid input',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  try {
    const result = await filterFakeNews({ newsArticle: validatedFields.data });
    return { message: 'success', data: result, errors: null };
  } catch (e) {
    console.error(e);
    return { message: 'AI error. Please try again later.', data: null, errors: null };
  }
}
