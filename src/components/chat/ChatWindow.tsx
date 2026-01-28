import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickActions } from "./QuickActions";
import { ScrollArea } from "@/components/ui/scroll-area";

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

    // Simulate bot response (will be replaced with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Cảm ơn bạn đã liên hệ! Hiện tại tôi đang được cấu hình để kết nối với dữ liệu của bạn. Vui lòng cung cấp API key Gemini và cấu hình Firebase để tôi có thể hỗ trợ bạn tốt hơn.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
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
