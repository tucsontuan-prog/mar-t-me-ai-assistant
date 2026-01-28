import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface HeroFeature {
  id: string;
  icon: string;
  text_vi: string;
  text_en: string;
}

export interface HeroSettings {
  // Badge
  badge_vi: string;
  badge_en: string;
  
  // Title
  title_vi: string;
  title_en: string;
  titleHighlight_vi: string;
  titleHighlight_en: string;
  
  // Description
  description_vi: string;
  description_en: string;
  
  // Features (max 4)
  features: HeroFeature[];
}

const DEFAULT_SETTINGS: HeroSettings = {
  badge_vi: "Hỗ trợ khách hàng thông minh",
  badge_en: "Smart Customer Support",
  
  title_vi: "Trợ lý ảo",
  title_en: "Virtual Assistant for",
  titleHighlight_vi: "Vận tải biển",
  titleHighlight_en: "Maritime Shipping",
  
  description_vi: "Chatbot AI hỗ trợ khách hàng 24/7 về lịch tàu, theo dõi container, và các dịch vụ vận tải biển của HAIAN.",
  description_en: "AI chatbot supporting customers 24/7 with vessel schedules, container tracking, and HAIAN maritime services.",
  
  features: [
    { id: "1", icon: "MessageCircle", text_vi: "Trả lời tức thì", text_en: "Instant response" },
    { id: "2", icon: "Clock", text_vi: "Hoạt động 24/7", text_en: "Available 24/7" },
    { id: "3", icon: "Ship", text_vi: "Tra cứu lịch tàu", text_en: "Vessel schedules" },
    { id: "4", icon: "Container", text_vi: "Theo dõi container", text_en: "Track containers" },
    { id: "5", icon: "Globe", text_vi: "Hỗ trợ đa ngôn ngữ", text_en: "Multi-language support" },
  ],
};

const SETTINGS_DOC_ID = "hero_settings";

export const getHeroSettings = async (): Promise<HeroSettings> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as HeroSettings;
      return { ...DEFAULT_SETTINGS, ...data };
    }
    
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching hero settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveHeroSettings = async (settings: HeroSettings): Promise<void> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
  } catch (error: any) {
    console.error("Error saving hero settings:", error);
    throw new Error("Không thể lưu cài đặt. Vui lòng kiểm tra quyền Firestore.");
  }
};

export const getDefaultHeroSettings = (): HeroSettings => DEFAULT_SETTINGS;
