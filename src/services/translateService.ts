const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`;

export interface TranslationResult {
  translations: Record<string, string>;
  original: string;
}

export const translateText = async (
  text: string,
  targetLanguages: string[] = ["en", "zh", "ko", "ja"],
  sourceLanguage: string = "vi"
): Promise<TranslationResult> => {
  const response = await fetch(TRANSLATE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ text, targetLanguages, sourceLanguage }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Translation failed");
  }

  return response.json();
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
