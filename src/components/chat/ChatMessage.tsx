import { cn } from "@/lib/utils";
import { Ship, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: Date;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          isBot
            ? "bg-gradient-to-br from-ocean-teal to-ocean-blue text-white"
            : "bg-ocean-deep text-white"
        )}
      >
        {isBot ? <Ship className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message bubble */}
      <div className={cn("max-w-[75%] space-y-1", isBot ? "items-start" : "items-end")}>
        <div
          className={cn(
            "px-4 py-3 text-sm leading-relaxed",
            isBot
              ? "bg-card border border-border rounded-2xl rounded-tl-md shadow-soft"
              : "bg-ocean-deep text-white rounded-2xl rounded-tr-md"
          )}
        >
          {message}
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
};
