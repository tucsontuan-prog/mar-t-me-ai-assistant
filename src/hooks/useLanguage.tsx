// Language Context for i18n support - 5 languages
import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "vi" | "en" | "zh" | "ko" | "ja";

export const languageNames: Record<Language, string> = {
  vi: "Tiếng Việt",
  en: "English",
  zh: "简体中文",
  ko: "한국어",
  ja: "日本語",
};

export const languageFlags: Record<Language, string> = {
  vi: "🇻🇳",
  en: "🇬🇧",
  zh: "🇨🇳",
  ko: "🇰🇷",
  ja: "🇯🇵",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.website": "Website chính",
    "hero.badge": "HAIAN Chatbot",
    "hero.title": "Xin chào! Tôi có thể",
    "hero.titleHighlight": "giúp gì cho bạn?",
    "hero.description": "Trợ lý ảo HAIAN sẵn sàng hỗ trợ bạn 24/7. Hãy đặt câu hỏi về dịch vụ vận tải, lịch tàu, tra cứu container và nhiều hơn nữa.",
    "hero.feature1": "Trả lời tức thì",
    "hero.feature2": "Hoạt động 24/7",
    "hero.feature3": "Tra cứu lịch tàu",
    "hero.feature4": "Theo dõi container",
    "services.title": "Chúng tôi có thể hỗ trợ bạn",
    "services.description": "Trợ lý ảo HAIAN được thiết kế để giải đáp mọi thắc mắc của bạn về dịch vụ vận tải biển.",
    "services.schedule.title": "Thông tin lịch tàu",
    "services.schedule.desc": "Tra cứu lịch trình tàu, thời gian khởi hành và cập cảng.",
    "services.container.title": "Theo dõi container",
    "services.container.desc": "Kiểm tra trạng thái và vị trí container theo thời gian thực.",
    "services.support.title": "Hỗ trợ khách hàng",
    "services.support.desc": "Giải đáp thắc mắc về dịch vụ và báo giá.",
    "cta.title": "Bắt đầu trò chuyện ngay",
    "cta.description": "Nhấn vào biểu tượng chat ở góc phải màn hình.",
    "cta.languages": "Hỗ trợ đa ngôn ngữ",
    "footer.contact": "Thông tin liên hệ",
    "footer.stats": "Thống kê truy cập",
    "footer.online": "Đang trực tuyến",
    "footer.totalVisits": "Tổng lượt truy cập",
    "footer.copyright": "© 2026 HAIAN TS. All rights reserved.",
    "footer.developer": "Developed by HATS IT Department",
    "admin.panel": "Quản trị viên",
    "admin.dashboard": "Bảng điều khiển",
    "admin.chatbotSettings": "Cài đặt Chatbot",
    "admin.qaManagement": "Quản lý Q&A",
    "admin.knowledgeDocs": "Tài liệu Knowledge",
    "admin.seedData": "Seed Data",
    "admin.logout": "Đăng xuất",
    "admin.login": "Đăng nhập Admin",
  },
  en: {
    "nav.home": "Home",
    "nav.website": "Main Website",
    "hero.badge": "HAIAN Chatbot",
    "hero.title": "Hello! How can I",
    "hero.titleHighlight": "help you today?",
    "hero.description": "HAIAN virtual assistant is ready to support you 24/7. Ask about shipping services, vessel schedules, container tracking and more.",
    "hero.feature1": "Instant response",
    "hero.feature2": "Available 24/7",
    "hero.feature3": "Vessel schedules",
    "hero.feature4": "Container tracking",
    "services.title": "How we can help you",
    "services.description": "HAIAN virtual assistant answers all your questions about maritime shipping services.",
    "services.schedule.title": "Vessel Schedules",
    "services.schedule.desc": "Look up vessel schedules, departure times and port arrivals.",
    "services.container.title": "Container Tracking",
    "services.container.desc": "Check container status and location in real-time.",
    "services.support.title": "Customer Support",
    "services.support.desc": "Get answers about services and quotations.",
    "cta.title": "Start chatting now",
    "cta.description": "Click the chat icon at the bottom right corner.",
    "cta.languages": "Multi-language support",
    "footer.contact": "Contact Information",
    "footer.stats": "Traffic Statistics",
    "footer.online": "Online now",
    "footer.totalVisits": "Total visits",
    "footer.copyright": "© 2026 HAIAN TS. All rights reserved.",
    "footer.developer": "Developed by HATS IT Department",
    "admin.panel": "Administrator",
    "admin.dashboard": "Dashboard",
    "admin.chatbotSettings": "Chatbot Settings",
    "admin.qaManagement": "Q&A Management",
    "admin.knowledgeDocs": "Knowledge Docs",
    "admin.seedData": "Seed Data",
    "admin.logout": "Logout",
    "admin.login": "Admin Login",
  },
  zh: {
    "nav.home": "首页",
    "nav.website": "主网站",
    "hero.badge": "HAIAN 聊天机器人",
    "hero.title": "您好！我能",
    "hero.titleHighlight": "为您做什么？",
    "hero.description": "HAIAN虚拟助手全天候为您服务。询问有关运输服务、船期、集装箱追踪等问题。",
    "hero.feature1": "即时回复",
    "hero.feature2": "全天候服务",
    "hero.feature3": "船期查询",
    "hero.feature4": "集装箱追踪",
    "services.title": "我们能为您提供帮助",
    "services.description": "HAIAN虚拟助手为您解答有关海运服务的所有问题。",
    "services.schedule.title": "船期信息",
    "services.schedule.desc": "查询船期、出发时间和到港时间。",
    "services.container.title": "集装箱追踪",
    "services.container.desc": "实时查看集装箱状态和位置。",
    "services.support.title": "客户支持",
    "services.support.desc": "获取服务和报价相关问题的解答。",
    "cta.title": "立即开始对话",
    "cta.description": "点击右下角的聊天图标。",
    "cta.languages": "多语言支持",
    "footer.contact": "联系信息",
    "footer.stats": "访问统计",
    "footer.online": "在线人数",
    "footer.totalVisits": "总访问量",
    "footer.copyright": "© 2026 HAIAN TS. 保留所有权利。",
    "footer.developer": "由 HATS IT 部门开发",
    "admin.panel": "管理员",
    "admin.dashboard": "控制面板",
    "admin.chatbotSettings": "聊天机器人设置",
    "admin.qaManagement": "问答管理",
    "admin.knowledgeDocs": "知识文档",
    "admin.seedData": "种子数据",
    "admin.logout": "登出",
    "admin.login": "管理员登录",
  },
  ko: {
    "nav.home": "홈",
    "nav.website": "메인 웹사이트",
    "hero.badge": "HAIAN 챗봇",
    "hero.title": "안녕하세요! 무엇을",
    "hero.titleHighlight": "도와드릴까요?",
    "hero.description": "HAIAN 가상 비서가 24시간 지원해 드립니다. 운송 서비스, 선박 일정, 컨테이너 추적 등에 대해 문의하세요.",
    "hero.feature1": "즉시 응답",
    "hero.feature2": "24시간 운영",
    "hero.feature3": "선박 일정 조회",
    "hero.feature4": "컨테이너 추적",
    "services.title": "도움을 드릴 수 있습니다",
    "services.description": "HAIAN 가상 비서가 해운 서비스에 관한 모든 질문에 답변해 드립니다.",
    "services.schedule.title": "선박 일정",
    "services.schedule.desc": "선박 일정, 출항 시간 및 입항 시간을 조회하세요.",
    "services.container.title": "컨테이너 추적",
    "services.container.desc": "실시간으로 컨테이너 상태와 위치를 확인하세요.",
    "services.support.title": "고객 지원",
    "services.support.desc": "서비스 및 견적 관련 문의에 답변해 드립니다.",
    "cta.title": "지금 대화 시작",
    "cta.description": "오른쪽 하단의 채팅 아이콘을 클릭하세요.",
    "cta.languages": "다국어 지원",
    "footer.contact": "연락처 정보",
    "footer.stats": "방문 통계",
    "footer.online": "현재 온라인",
    "footer.totalVisits": "총 방문 수",
    "footer.copyright": "© 2026 HAIAN TS. 모든 권리 보유.",
    "footer.developer": "HATS IT 부서 개발",
    "admin.panel": "관리자",
    "admin.dashboard": "대시보드",
    "admin.chatbotSettings": "챗봇 설정",
    "admin.qaManagement": "Q&A 관리",
    "admin.knowledgeDocs": "지식 문서",
    "admin.seedData": "시드 데이터",
    "admin.logout": "로그아웃",
    "admin.login": "관리자 로그인",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.website": "メインサイト",
    "hero.badge": "HAIAN チャットボット",
    "hero.title": "こんにちは！何か",
    "hero.titleHighlight": "お手伝いしましょうか？",
    "hero.description": "HAIANバーチャルアシスタントが24時間対応いたします。輸送サービス、船舶スケジュール、コンテナ追跡などについてお問い合わせください。",
    "hero.feature1": "即座に返答",
    "hero.feature2": "24時間対応",
    "hero.feature3": "船舶スケジュール",
    "hero.feature4": "コンテナ追跡",
    "services.title": "お手伝いできること",
    "services.description": "HAIANバーチャルアシスタントが海運サービスに関するすべての質問にお答えします。",
    "services.schedule.title": "船舶スケジュール",
    "services.schedule.desc": "船舶スケジュール、出港時間、入港時間を確認できます。",
    "services.container.title": "コンテナ追跡",
    "services.container.desc": "リアルタイムでコンテナの状態と位置を確認できます。",
    "services.support.title": "カスタマーサポート",
    "services.support.desc": "サービスや見積もりに関する質問にお答えします。",
    "cta.title": "今すぐチャット開始",
    "cta.description": "右下のチャットアイコンをクリックしてください。",
    "cta.languages": "多言語対応",
    "footer.contact": "連絡先情報",
    "footer.stats": "アクセス統計",
    "footer.online": "オンライン",
    "footer.totalVisits": "総訪問数",
    "footer.copyright": "© 2026 HAIAN TS. All rights reserved.",
    "footer.developer": "HATS IT部門開発",
    "admin.panel": "管理者",
    "admin.dashboard": "ダッシュボード",
    "admin.chatbotSettings": "チャットボット設定",
    "admin.qaManagement": "Q&A管理",
    "admin.knowledgeDocs": "ナレッジ文書",
    "admin.seedData": "シードデータ",
    "admin.logout": "ログアウト",
    "admin.login": "管理者ログイン",
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
    return translations[language]?.[key] || translations["en"]?.[key] || key;
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
