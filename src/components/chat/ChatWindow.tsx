import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickActions } from "./QuickActions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { sendMessageToGemini } from "@/services/geminiService";
import { saveChatMessage, getChatHistory } from "@/services/chatService";
import { getChatbotSettings, ChatbotSettings } from "@/services/chatbotSettingsService";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  onClose?: () => void;
  onMinimize?: () => void;
  showControls?: boolean;
  embedded?: boolean;
}

export const ChatWindow = ({
  onClose,
  onMinimize,
  showControls = false,
  embedded = false,
}: ChatWindowProps) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chatbot settings
  useEffect(() => {
    const loadSettings = async () => {
      const data = await getChatbotSettings();
      setSettings(data);
      
      // Set initial welcome message based on language
      const welcomeMsg = language === "vi" ? data.welcomeMessage_vi : data.welcomeMessage_en;
      setMessages([{
        id: "welcome",
        content: welcomeMsg,
        isBot: true,
        timestamp: new Date(),
      }]);
    };
    loadSettings();
  }, []);

  // Update welcome message when language changes
  useEffect(() => {
    if (settings && messages.length === 1 && messages[0].id === "welcome") {
      const welcomeMsg = language === "vi" ? settings.welcomeMessage_vi : settings.welcomeMessage_en;
      setMessages([{
        id: "welcome",
        content: welcomeMsg,
        isBot: true,
        timestamp: new Date(),
      }]);
    }
  }, [language, settings]);

  // Load chat history when user logs in
  useEffect(() => {
    const loadHistory = async () => {
      if (user && settings) {
        try {
          const history = await getChatHistory(user.uid);
          if (history.length > 0) {
            const welcomeMsg = language === "vi" ? settings.welcomeMessage_vi : settings.welcomeMessage_en;
            setMessages([
              {
                id: "welcome",
                content: welcomeMsg,
                isBot: true,
                timestamp: new Date(),
              },
              ...history,
            ]);
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
        }
      }
    };
    loadHistory();
  }, [user, settings, language]);

  // Auto scroll to bottom when new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (user) {
        await saveChatMessage(user.uid, {
          content,
          isBot: false,
        });
      }

      const response = await sendMessageToGemini(content);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      if (user) {
        await saveChatMessage(user.uid, {
          content: response,
          isBot: true,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng kiểm tra:\n\n1. Bạn đã đăng nhập chưa?\n2. Firebase Cloud Function đã được deploy chưa?\n3. Gemini API key đã được cấu hình đúng chưa?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const showQuickActions = messages.length <= 1;
  const placeholder = settings 
    ? (language === "vi" ? settings.placeholder_vi : settings.placeholder_en)
    : "Nhập câu hỏi...";

  return (
    <div
      className={`flex flex-col bg-background shadow-medium rounded-xl overflow-hidden ${
        embedded ? "h-full w-full" : "w-[400px] h-[600px]"
      }`}
    >
      {/* Header */}
      <ChatHeader
        title={settings?.assistantName}
        subtitle={settings ? (language === "vi" ? settings.statusText_vi : settings.statusText_en) : undefined}
        onClose={onClose}
        onMinimize={onMinimize}
        showControls={showControls}
      />

      {/* Messages area */}
      <ScrollArea
        ref={scrollRef}
        className="flex-1 p-4 custom-scrollbar"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>

      {/* Quick actions */}
      {showQuickActions && settings && (
        <QuickActions 
          onSelect={handleSend} 
          actions={settings.quickActions}
        />
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} placeholder={placeholder} />
    </div>
  );
};
