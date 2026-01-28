import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface QuickAction {
  id: string;
  icon: string; // lucide icon name
  label_vi: string;
  label_en: string;
  prompt: string;
}

export interface ChatbotSettings {
  // System instruction for AI
  systemInstruction: string;
  
  // Welcome message
  welcomeMessage_vi: string;
  welcomeMessage_en: string;
  
  // Chat header
  assistantName: string;
  statusText_vi: string;
  statusText_en: string;
  
  // Quick actions
  quickActions: QuickAction[];
  
  // Placeholder
  placeholder_vi: string;
  placeholder_en: string;
}

const DEFAULT_SETTINGS: ChatbotSettings = {
  systemInstruction: `Bạn là trợ lý ảo của Công ty cổ phần Vận tải và Xếp dỡ Hải An (HAIAN). 
Nhiệm vụ của bạn là hỗ trợ khách hàng về các dịch vụ vận tải biển, tra cứu lịch tàu, theo dõi container và giải đáp thắc mắc.
Hãy trả lời chuyên nghiệp, thân thiện và chính xác.`,
  
  welcomeMessage_vi: "Xin chào! 👋 Tôi là trợ lý ảo hỗ trợ vận tải biển. Tôi có thể giúp bạn tra cứu lịch tàu, theo dõi container, và giải đáp các thắc mắc về dịch vụ. Bạn cần hỗ trợ gì?",
  welcomeMessage_en: "Hello! 👋 I'm a virtual assistant for maritime shipping. I can help you check vessel schedules, track containers, and answer questions about our services. How can I assist you?",
  
  assistantName: "Maritime Assistant",
  statusText_vi: "Hỗ trợ vận tải biển 24/7",
  statusText_en: "Maritime support 24/7",
  
  quickActions: [
    { id: "1", icon: "Ship", label_vi: "Tra cứu lịch tàu", label_en: "Vessel schedules", prompt: "Tôi muốn tra cứu lịch tàu" },
    { id: "2", icon: "Container", label_vi: "Theo dõi container", label_en: "Track container", prompt: "Tôi muốn theo dõi container" },
    { id: "3", icon: "Globe", label_vi: "Tuyến đường biển", label_en: "Shipping routes", prompt: "Cho tôi biết về các tuyến đường biển" },
    { id: "4", icon: "HelpCircle", label_vi: "Câu hỏi thường gặp", label_en: "FAQ", prompt: "Các câu hỏi thường gặp" },
  ],
  
  placeholder_vi: "Nhập câu hỏi của bạn...",
  placeholder_en: "Type your question...",
};

const SETTINGS_DOC_ID = "chatbot_settings";

export const getChatbotSettings = async (): Promise<ChatbotSettings> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as ChatbotSettings;
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_SETTINGS, ...data };
    }
    
    // Return default settings if not configured
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching chatbot settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveChatbotSettings = async (settings: ChatbotSettings): Promise<void> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
  } catch (error: any) {
    console.error("Error saving chatbot settings:", error);
    throw new Error("Không thể lưu cài đặt. Vui lòng kiểm tra quyền Firestore.");
  }
};

export const getDefaultSettings = (): ChatbotSettings => DEFAULT_SETTINGS;
