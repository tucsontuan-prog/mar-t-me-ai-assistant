import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface ServiceCard {
  id: string;
  icon: string;
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
}

export interface ServicesSettings {
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  cards: ServiceCard[];
}

export interface CTASettings {
  title_vi: string;
  title_en: string;
  description_vi: string;
  description_en: string;
  languagesText_vi: string;
  languagesText_en: string;
}

export interface LandingSettings {
  services: ServicesSettings;
  cta: CTASettings;
}

const DEFAULT_SETTINGS: LandingSettings = {
  services: {
    title_vi: "Chúng tôi có thể hỗ trợ bạn",
    title_en: "How We Can Help You",
    description_vi: "Trợ lý ảo HAIAN được thiết kế để giải đáp mọi thắc mắc của bạn về dịch vụ vận tải biển.",
    description_en: "HAIAN Virtual Assistant is designed to answer all your questions about maritime shipping services.",
    cards: [
      {
        id: "1",
        icon: "Ship",
        title_vi: "Thông tin lịch tàu",
        title_en: "Vessel Schedules",
        description_vi: "Tra cứu lịch trình tàu, thời gian khởi hành và cập cảng.",
        description_en: "Look up vessel schedules, departure times and port arrivals.",
      },
      {
        id: "2",
        icon: "Container",
        title_vi: "Theo dõi container",
        title_en: "Container Tracking",
        description_vi: "Kiểm tra trạng thái và vị trí container theo thời gian thực.",
        description_en: "Check container status and location in real-time.",
      },
      {
        id: "3",
        icon: "Headphones",
        title_vi: "Hỗ trợ khách hàng",
        title_en: "Customer Support",
        description_vi: "Giải đáp thắc mắc về dịch vụ và báo giá.",
        description_en: "Answer questions about services and quotes.",
      },
    ],
  },
  cta: {
    title_vi: "Bắt đầu trò chuyện ngay",
    title_en: "Start Chatting Now",
    description_vi: "Nhấn vào biểu tượng chat ở góc phải màn hình để bắt đầu trò chuyện với trợ lý ảo HAIAN.",
    description_en: "Click the chat icon in the bottom right corner to start chatting with HAIAN virtual assistant.",
    languagesText_vi: "Hỗ trợ tiếng Việt, English, 中文, 한국어, 日本語",
    languagesText_en: "Supporting Vietnamese, English, Chinese, Korean, Japanese",
  },
};

const SETTINGS_DOC_ID = "landing_settings";

export const getLandingSettings = async (): Promise<LandingSettings> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<LandingSettings>;
      return {
        services: { ...DEFAULT_SETTINGS.services, ...data.services },
        cta: { ...DEFAULT_SETTINGS.cta, ...data.cta },
      };
    }
    
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error fetching landing settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const saveLandingSettings = async (settings: LandingSettings): Promise<void> => {
  try {
    const docRef = doc(db, "settings", SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
  } catch (error: any) {
    console.error("Error saving landing settings:", error);
    throw new Error("Không thể lưu cài đặt. Vui lòng kiểm tra quyền Firestore.");
  }
};

export const getDefaultLandingSettings = (): LandingSettings => DEFAULT_SETTINGS;
