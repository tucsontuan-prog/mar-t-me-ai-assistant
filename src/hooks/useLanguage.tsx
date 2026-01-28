import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Header
    "nav.home": "Trang chủ",
    "nav.website": "Website chính",
    
    // Hero
    "hero.badge": "HAIAN Chatbot",
    "hero.title": "Xin chào! Tôi có thể",
    "hero.titleHighlight": "giúp gì cho bạn?",
    "hero.description": "Trợ lý ảo HAIAN sẵn sàng hỗ trợ bạn 24/7. Hãy đặt câu hỏi về dịch vụ vận tải, lịch tàu, tra cứu container và nhiều hơn nữa.",
    "hero.feature1": "Trả lời tức thì",
    "hero.feature2": "Hoạt động 24/7",
    "hero.feature3": "Tra cứu lịch tàu",
    "hero.feature4": "Theo dõi container",
    
    // Services
    "services.title": "Chúng tôi có thể hỗ trợ bạn",
    "services.description": "Trợ lý ảo HAIAN được thiết kế để giải đáp mọi thắc mắc của bạn về dịch vụ vận tải biển một cách nhanh chóng và chính xác.",
    "services.schedule.title": "Thông tin lịch tàu",
    "services.schedule.desc": "Tra cứu lịch trình tàu, thời gian khởi hành và cập cảng trên các tuyến nội địa và quốc tế.",
    "services.container.title": "Theo dõi container",
    "services.container.desc": "Kiểm tra trạng thái và vị trí container của bạn theo thời gian thực.",
    "services.support.title": "Hỗ trợ khách hàng",
    "services.support.desc": "Giải đáp thắc mắc về dịch vụ, báo giá và các thông tin liên quan khác.",
    
    // CTA
    "cta.title": "Bắt đầu trò chuyện ngay",
    "cta.description": "Nhấn vào biểu tượng chat ở góc phải màn hình để bắt đầu trò chuyện với trợ lý ảo HAIAN.",
    "cta.languages": "Hỗ trợ tiếng Việt và tiếng Anh",
    
    // Footer
    "footer.contact": "Thông tin liên hệ",
    "footer.stats": "Thống kê truy cập",
    "footer.online": "Đang trực tuyến",
    "footer.totalVisits": "Tổng lượt truy cập",
    "footer.copyright": "© 2026 HAIAN TS. All rights reserved.",
    "footer.developer": "Developed by HATS IT Department",
    
    // Chat
    "chat.placeholder": "Nhập câu hỏi của bạn...",
    "chat.welcome": "Xin chào! 👋 Tôi là trợ lý ảo hỗ trợ vận tải biển. Tôi có thể giúp bạn tra cứu lịch tàu, theo dõi container, và giải đáp các thắc mắc về dịch vụ. Bạn cần hỗ trợ gì?",
    "chat.online": "Hỗ trợ vận tải biển 24/7",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.website": "Main Website",
    
    // Hero
    "hero.badge": "HAIAN Chatbot",
    "hero.title": "Hello! How can I",
    "hero.titleHighlight": "help you today?",
    "hero.description": "HAIAN virtual assistant is ready to support you 24/7. Ask questions about shipping services, vessel schedules, container tracking and more.",
    "hero.feature1": "Instant response",
    "hero.feature2": "Available 24/7",
    "hero.feature3": "Vessel schedules",
    "hero.feature4": "Container tracking",
    
    // Services
    "services.title": "How we can help you",
    "services.description": "HAIAN virtual assistant is designed to answer all your questions about maritime shipping services quickly and accurately.",
    "services.schedule.title": "Vessel Schedules",
    "services.schedule.desc": "Look up vessel schedules, departure times and port arrivals on domestic and international routes.",
    "services.container.title": "Container Tracking",
    "services.container.desc": "Check the status and location of your container in real-time.",
    "services.support.title": "Customer Support",
    "services.support.desc": "Get answers about services, quotations and other related information.",
    
    // CTA
    "cta.title": "Start chatting now",
    "cta.description": "Click on the chat icon at the bottom right corner to start a conversation with HAIAN virtual assistant.",
    "cta.languages": "Supports Vietnamese and English",
    
    // Footer
    "footer.contact": "Contact Information",
    "footer.stats": "Traffic Statistics",
    "footer.online": "Online now",
    "footer.totalVisits": "Total visits",
    "footer.copyright": "© 2026 HAIAN TS. All rights reserved.",
    "footer.developer": "Developed by HATS IT Department",
    
    // Chat
    "chat.placeholder": "Type your question...",
    "chat.welcome": "Hello! 👋 I'm a virtual assistant for maritime shipping. I can help you check vessel schedules, track containers, and answer questions about our services. How can I assist you?",
    "chat.online": "Maritime support 24/7",
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("haian_language");
    return (saved as Language) || "vi";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("haian_language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["vi"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
