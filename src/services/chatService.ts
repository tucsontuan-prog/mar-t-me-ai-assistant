import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  userId?: string;
}

export interface KnowledgeBase {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category?: string;
}

// Get knowledge base documents
export const getKnowledgeBase = async (): Promise<KnowledgeBase[]> => {
  try {
    const q = query(collection(db, "knowledge_base"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as KnowledgeBase[];
  } catch (error) {
    console.error("Error fetching knowledge base:", error);
    return [];
  }
};

// Search knowledge base for relevant answers
export const searchKnowledgeBase = async (
  userQuery: string
): Promise<KnowledgeBase | null> => {
  try {
    const knowledgeBase = await getKnowledgeBase();
    const queryLower = userQuery.toLowerCase();

    // Simple keyword matching - can be enhanced with better search
    const matches = knowledgeBase.filter((item) => {
      const keywordMatch = item.keywords.some((keyword) =>
        queryLower.includes(keyword.toLowerCase())
      );
      const questionMatch = item.question
        .toLowerCase()
        .includes(queryLower);
      return keywordMatch || questionMatch;
    });

    // Return best match (first one for now)
    return matches.length > 0 ? matches[0] : null;
  } catch (error) {
    console.error("Error searching knowledge base:", error);
    return null;
  }
};

// Save chat history
export const saveChatMessage = async (
  userId: string,
  message: Omit<ChatMessage, "id" | "timestamp">
) => {
  try {
    await addDoc(collection(db, "chat_history"), {
      ...message,
      userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving chat message:", error);
  }
};

// Get chat history for user
export const getChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  try {
    const q = query(
      collection(db, "chat_history"),
      where("userId", "==", userId),
      orderBy("timestamp", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        content: data.content,
        isBot: data.isBot,
        timestamp: data.timestamp?.toDate() || new Date(),
        userId: data.userId,
      };
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};
