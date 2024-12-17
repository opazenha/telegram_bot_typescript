import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config";

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const makeGeminiCall = async (prompt: string) => {
   const result = await model.generateContent(prompt);
   return result.response.text();
}