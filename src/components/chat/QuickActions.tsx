import { Ship, Package, MapPin, HelpCircle, Search, Phone, Mail, Clock, Calendar, FileText, Globe, Container } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { QuickAction as QuickActionType } from "@/services/chatbotSettingsService";

interface QuickActionsProps {
  onSelect: (message: string) => void;
  actions?: QuickActionType[];
}

const iconMap: Record<string, React.ReactNode> = {
  Ship: <Ship className="w-4 h-4" />,
  Container: <Container className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Phone: <Phone className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
};

export const QuickActions = ({ onSelect, actions = [] }: QuickActionsProps) => {
  const { language } = useLanguage();

  if (actions.length === 0) return null;

  return (
    <div className="p-4 border-t border-border/50">
      <p className="text-xs text-muted-foreground mb-3">
        {language === "vi" ? "Câu hỏi gợi ý:" : "Suggested questions:"}
      </p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onSelect(action.prompt)}
            className="h-8 text-xs bg-background hover:bg-ocean-foam hover:text-ocean-deep hover:border-ocean-teal/50 transition-colors"
          >
            {iconMap[action.icon] || <HelpCircle className="w-4 h-4" />}
            <span className="ml-1.5">
              {language === "vi" ? action.label_vi : action.label_en}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
