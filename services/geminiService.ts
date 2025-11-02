
import { GoogleGenAI, Type } from "@google/genai";
import type { EmotionPrediction } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const emotionSchema = {
  type: Type.OBJECT,
  properties: {
    joy: { type: Type.NUMBER, description: "Score for joy emotion (0-1)" },
    sadness: { type: Type.NUMBER, description: "Score for sadness emotion (0-1)" },
    anger: { type: Type.NUMBER, description: "Score for anger emotion (0-1)" },
    fear: { type: Type.NUMBER, description: "Score for fear emotion (0-1)" },
    surprise: { type: Type.NUMBER, description: "Score for surprise emotion (0-1)" },
    love: { type: Type.NUMBER, description: "Score for love emotion (0-1)" },
    neutral: { type: Type.NUMBER, description: "Score for neutral emotion (0-1)" },
  },
  required: ["joy", "sadness", "anger", "fear", "surprise", "love", "neutral"]
};

export async function detectEmotion(text: string): Promise<EmotionPrediction> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the emotion of the following text and provide a probability score from 0.0 to 1.0 for each emotion. The scores should represent the intensity of each emotion present in the text.
      
      Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: emotionSchema,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }
    
    const parsedJson = JSON.parse(responseText);
    return parsedJson as EmotionPrediction;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('json')) {
      throw new Error("Failed to get a valid analysis from the AI. The response was not in the expected format.");
    }
    throw new Error("An error occurred while analyzing the emotion. Please try again.");
  }
}
