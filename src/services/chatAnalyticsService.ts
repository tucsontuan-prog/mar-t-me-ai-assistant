import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface ChatSession {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  messageCount: number;
  rating?: number; // 1-5 stars
  feedback?: string;
  userId?: string;
  userAgent?: string;
}

export interface ChatAnalytics {
  totalSessions: number;
  totalMessages: number;
  averageRating: number;
  dailyStats: DailyStats[];
  ratingDistribution: { [key: number]: number };
}

export interface DailyStats {
  date: string;
  sessions: number;
  messages: number;
  avgRating: number;
}

// Start a new chat session
export const startChatSession = async (userId?: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "chat_sessions"), {
      startedAt: serverTimestamp(),
      messageCount: 0,
      userId: userId || null,
      userAgent: navigator.userAgent,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error starting chat session:", error);
    return "";
  }
};

// Update session message count
export const updateSessionMessageCount = async (
  sessionId: string,
  count: number
): Promise<void> => {
  // This would update the session - simplified for now
  console.log("Update session", sessionId, "with count", count);
};

// Submit rating for a session
export const submitSessionRating = async (
  sessionId: string,
  rating: number,
  feedback?: string
): Promise<void> => {
  try {
    await addDoc(collection(db, "chat_ratings"), {
      sessionId,
      rating,
      feedback: feedback || null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
};

// Get chat analytics for admin
export const getChatAnalytics = async (days: number = 30): Promise<ChatAnalytics> => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Get all chat messages from chat_history
    const messagesQuery = query(
      collection(db, "chat_history"),
      orderBy("timestamp", "desc")
    );
    const messagesSnapshot = await getDocs(messagesQuery);
    
    // Get ratings
    const ratingsQuery = query(collection(db, "chat_ratings"));
    const ratingsSnapshot = await getDocs(ratingsQuery);
    
    const ratings: number[] = [];
    const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    ratingsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.rating) {
        ratings.push(data.rating);
        ratingDistribution[data.rating] = (ratingDistribution[data.rating] || 0) + 1;
      }
    });
    
    // Calculate daily stats from messages
    const dailyMap: Map<string, { sessions: Set<string>; messages: number; ratings: number[] }> = new Map();
    
    messagesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const timestamp = data.timestamp?.toDate?.() || new Date();
      const dateKey = timestamp.toISOString().split("T")[0];
      
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, { sessions: new Set(), messages: 0, ratings: [] });
      }
      
      const day = dailyMap.get(dateKey)!;
      day.messages++;
      if (data.userId) {
        day.sessions.add(data.userId);
      }
    });
    
    const dailyStats: DailyStats[] = Array.from(dailyMap.entries())
      .map(([date, data]) => ({
        date,
        sessions: data.sessions.size || 1,
        messages: data.messages,
        avgRating: data.ratings.length > 0 
          ? data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length 
          : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-days);
    
    const averageRating = ratings.length > 0 
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
      : 0;
    
    return {
      totalSessions: dailyStats.reduce((acc, day) => acc + day.sessions, 0),
      totalMessages: messagesSnapshot.docs.length,
      averageRating,
      dailyStats,
      ratingDistribution,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalSessions: 0,
      totalMessages: 0,
      averageRating: 0,
      dailyStats: [],
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
};
