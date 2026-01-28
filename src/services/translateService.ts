import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

export interface TranslationResult {
  translations: Record<string, string>;
  original: string;
}

interface TranslateRequest {
  text: string;
  targetLanguages: string[];
  sourceLanguage: string;
}

// Initialize Firebase Functions
const functions = getFunctions(getApp());
const translateWithGemini = httpsCallable<TranslateRequest, TranslationResult>(
  functions,
  "translateWithGemini"
);

export const translateText = async (
  text: string,
  targetLanguages: string[] = ["en", "zh", "ko", "ja"],
  sourceLanguage: string = "vi"
): Promise<TranslationResult> => {
  try {
    const result = await translateWithGemini({
      text,
      targetLanguages,
      sourceLanguage,
    });
    return result.data;
  } catch (error: any) {
    console.error("Translation error:", error);
    
    if (error.code === "functions/unauthenticated") {
      throw new Error("Vui lòng đăng nhập để sử dụng tính năng dịch.");
    }
    if (error.code === "functions/unavailable") {
      throw new Error("Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.");
    }
    
    throw new Error("Không thể dịch. Vui lòng thử lại.");
  }
};

// Batch translate multiple fields at once
export const translateFields = async (
  fields: Record<string, string>,
  targetLanguages: string[] = ["en", "zh", "ko", "ja"],
  sourceLanguage: string = "vi"
): Promise<Record<string, Record<string, string>>> => {
  const results: Record<string, Record<string, string>> = {};
  
  // Translate all fields in parallel
  const translations = await Promise.all(
    Object.entries(fields).map(async ([key, text]) => {
      if (!text || text.trim() === "") {
        return { key, translations: {} };
      }
      try {
        const result = await translateText(text, targetLanguages, sourceLanguage);
        return { key, translations: result.translations };
      } catch (error) {
        console.error(`Failed to translate field ${key}:`, error);
        return { key, translations: {} };
      }
    })
  );

  translations.forEach(({ key, translations }) => {
    results[key] = translations;
  });

  return results;
};
