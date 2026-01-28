import { Ship, Package, MapPin, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  message: string;
}

interface QuickActionsProps {
  onSelect: (message: string) => void;
}

const defaultActions: QuickAction[] = [
  {
    icon: <Ship className="w-4 h-4" />,
    label: "Tra cứu lịch tàu",
    message: "Tôi muốn tra cứu lịch tàu",
  },
  {
    icon: <Package className="w-4 h-4" />,
    label: "Theo dõi container",
    message: "Tôi muốn theo dõi container",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Tuyến đường biển",
    message: "Cho tôi biết các tuyến đường biển",
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    label: "Câu hỏi thường gặp",
    message: "Các câu hỏi thường gặp là gì?",
  },
];

export const QuickActions = ({ onSelect }: QuickActionsProps) => {
  return (
    <div className="p-4 border-t border-border/50">
      <p className="text-xs text-muted-foreground mb-3">Câu hỏi gợi ý:</p>
      <div className="flex flex-wrap gap-2">
        {defaultActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(action.message)}
            className="h-8 text-xs bg-background hover:bg-ocean-foam hover:text-ocean-deep hover:border-ocean-teal/50 transition-colors"
          >
            {action.icon}
            <span className="ml-1.5">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
