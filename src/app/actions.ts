
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

// This is a simplified health risk calculation.
// In a real-world application, this would involve a much more sophisticated algorithm.
const calculateHealthRisk = (symptoms: string): number => {
  let score = 0;
  const lowerCaseSymptoms = symptoms.toLowerCase();

  const highRiskKeywords = [
    'chest pain', 'breathing difficulty', 'severe headache', 'vision loss', 'paralysis', 'unconscious', 'seizure'
  ];
  const mediumRiskKeywords = [
    'high fever', 'dizziness', 'shortness of breath', 'confusion', 'severe pain', 'vomiting blood'
  ];

  score += (lowerCaseSymptoms.match(/\b(\w+)\b/g) || []).length * 0.5;

  highRiskKeywords.forEach(keyword => {
    if (lowerCaseSymptoms.includes(keyword)) {
      score += 15;
    }
  });

  mediumRiskKeywords.forEach(keyword => {
    if (lowerCaseSymptoms.includes(keyword)) {
      score += 7;
    }
  });
  
  // Normalize to 0-100 range
  return Math.min(100, Math.round(score));
};

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
    const tipsPromise = personalizedHealthTips({ symptoms: validatedFields.data });
    const riskScore = calculateHealthRisk(validatedFields.data);
    
    // TODO: Implement Power BI data push
    // The anonymized symptom data could be sent to a Power BI push dataset here.
    // Example: await pushToPowerBI({ symptom: validatedFields.data, riskScore, timestamp: new Date() });

    const tips = await tipsPromise;
    return { message: 'success', data: { ...tips, riskScore }, errors: null };
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
