import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { searchKnowledgeBase } from "./chatService";
import { buildKnowledgeContext } from "./knowledgeDocService";

interface GeminiResponse {
  response: string;
}

interface ChatRequest {
  message: string;
  knowledgeContext: string;
}

// Initialize Firebase Functions
const functions = getFunctions(getApp());
const chatWithGemini = httpsCallable<ChatRequest, GeminiResponse>(
  functions,
  "chatWithGemini"
);

export const sendMessageToGemini = async (
  userMessage: string
): Promise<string> => {
  try {
    // Get full-text knowledge documents
    const fullTextContext = await buildKnowledgeContext();
    
    // Also search Q&A knowledge base for specific matches
    const knowledgeMatch = await searchKnowledgeBase(userMessage);
    
    let knowledgeContext = fullTextContext;
    
    // Add Q&A match if found
    if (knowledgeMatch) {
      knowledgeContext += `\n\n=== Câu hỏi liên quan ===\nCâu hỏi: ${knowledgeMatch.question}\nCâu trả lời: ${knowledgeMatch.answer}`;
    }

    // Call Firebase Cloud Function
    const result = await chatWithGemini({
      message: userMessage,
      knowledgeContext: knowledgeContext || "Không có dữ liệu cụ thể trong hệ thống.",
    });

    return result.data.response;
  } catch (error: any) {
    console.error("Error calling Gemini:", error);
    
    // Handle specific errors
    if (error.code === "functions/unauthenticated") {
      throw new Error("Vui lòng đăng nhập để sử dụng chatbot.");
    }
    if (error.code === "functions/unavailable") {
      throw new Error("Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.");
    }
    
    throw new Error("Không thể kết nối với AI. Vui lòng thử lại.");
  }
};
