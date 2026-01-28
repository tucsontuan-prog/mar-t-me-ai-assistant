import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left";
}

export const ChatWidget = ({ position = "bottom-right" }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position])}>
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-4 animate-scale-in">
          <ChatWindow
            showControls
            onClose={() => setIsOpen(false)}
            onMinimize={() => setIsMinimized(true)}
          />
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          if (isMinimized) {
            setIsMinimized(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center",
          "ocean-gradient text-white",
          "shadow-medium hover:shadow-glow",
          "transition-all duration-300 transform hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:ring-offset-2"
        )}
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen && !isMinimized ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
