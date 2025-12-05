import { GoogleGenAI } from "@google/genai";
import { Product } from "../types/types";

const API_KEY = process.env.API_KEY || '';

// Initialize only if key is present to avoid immediate crash, handled in call
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const generateProductDescription = async (product: Product): Promise<string> => {
  if (!ai) {
    console.warn("API Key missing");
    return "Please configure your API Key to unlock the Yara Lane AI Brand Voice.";
  }

  const modelId = "gemini-2.5-flash"; // Fast, efficient model for text generation

  const prompt = `
    You are the lead copywriter for "Yara Lane", a high-end, minimalist luxury brand for beauty and accessories.
    The brand voice is sophisticated, sensory, breathable, and calm.
    
    Write a compelling, luxurious product description (approx 80-100 words) for a product named "${product.name}".
    Key ingredients/materials: ${product.ingredients.join(', ')}.
    
    Focus on the feeling, texture, and the "ritual" of using the product. Avoid generic marketing jargon. Use evocative language.
    Do not use markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    
    return response.text || "Experience the essence of Yara Lane.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our brand story is currently being curated. Please try again later.";
  }
};