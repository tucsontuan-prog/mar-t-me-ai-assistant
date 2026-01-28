import { Anchor, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  showControls?: boolean;
}

export const ChatHeader = ({
  title = "Maritime Assistant",
  subtitle = "Hỗ trợ vận tải biển 24/7",
  onClose,
  onMinimize,
  showControls = false,
}: ChatHeaderProps) => {
  return (
    <div className="ocean-gradient px-4 py-4 rounded-t-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          
          {/* Title */}
          <div>
            <h3 className="font-semibold text-white text-base">{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs">{subtitle}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <div className="flex items-center gap-1">
            {onMinimize && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMinimize}
                className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Minus className="w-4 h-4" />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
