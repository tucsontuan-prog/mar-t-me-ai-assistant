import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickActions } from "./QuickActions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { sendMessageToGemini } from "@/services/geminiService";
import { saveChatMessage, getChatHistory } from "@/services/chatService";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Xin chào! 👋 Tôi là trợ lý ảo hỗ trợ vận tải biển. Tôi có thể giúp bạn tra cứu lịch tàu, theo dõi container, và giải đáp các thắc mắc về dịch vụ. Bạn cần hỗ trợ gì?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history when user logs in
  useEffect(() => {
    const loadHistory = async () => {
      if (user) {
        try {
          const history = await getChatHistory(user.uid);
          if (history.length > 0) {
            setMessages([
              {
                id: "welcome",
                content:
                  "Xin chào! 👋 Tôi là trợ lý ảo hỗ trợ vận tải biển. Tôi có thể giúp bạn tra cứu lịch tàu, theo dõi container, và giải đáp các thắc mắc về dịch vụ. Bạn cần hỗ trợ gì?",
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
  }, [user]);

  // Auto scroll to bottom when new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Save user message to Firestore
      if (user) {
        await saveChatMessage(user.uid, {
          content,
          isBot: false,
        });
      }

      // Call Gemini via Firebase Cloud Function
      const response = await sendMessageToGemini(content);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Save bot response to Firestore
      if (user) {
        await saveChatMessage(user.uid, {
          content: response,
          isBot: true,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
      
      // Fallback response
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

  return (
    <div
      className={`flex flex-col bg-background shadow-medium rounded-xl overflow-hidden ${
        embedded ? "h-full w-full" : "w-[400px] h-[600px]"
      }`}
    >
      {/* Header */}
      <ChatHeader
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
      {showQuickActions && <QuickActions onSelect={handleSend} />}

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};
