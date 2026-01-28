import { ServicesSettings, ServiceCard } from "@/services/landingSettingsService";
import {
  MessageCircle,
  Clock,
  Ship,
  Container,
  Globe,
  HelpCircle,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Package,
  Headphones,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Clock,
  Ship,
  Container,
  Globe,
  HelpCircle,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Package,
  Headphones,
  Zap,
  Shield,
  CheckCircle,
};

interface ServicesPreviewProps {
  settings: ServicesSettings;
  language?: "vi" | "en";
}

export const ServicesPreview = ({ settings, language = "vi" }: ServicesPreviewProps) => {
  const isVi = language === "vi";

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      {/* Header */}
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-foreground">
          {isVi ? settings.title_vi : settings.title_en}
        </h3>
        <p className="text-xs text-muted-foreground">
          {isVi ? settings.description_vi : settings.description_en}
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {settings.cards.map((card: ServiceCard, index: number) => {
          const IconComp = ICON_MAP[card.icon] || CheckCircle;
          return (
            <div
              key={card.id || index}
              className="p-3 rounded-lg bg-muted/50 border border-border hover:shadow-md transition-shadow text-center space-y-1.5"
            >
              <div className="w-8 h-8 mx-auto rounded-lg bg-ocean-teal/10 flex items-center justify-center">
                <IconComp className="w-4 h-4 text-ocean-teal" />
              </div>
              <h4 className="text-xs font-semibold text-foreground truncate">
                {isVi ? card.title_vi : card.title_en}
              </h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2">
                {isVi ? card.description_vi : card.description_en}
              </p>
            </div>
          );
        })}
      </div>

      {settings.cards.length === 0 && (
        <div className="text-center py-6 text-muted-foreground text-xs">
          Chưa có dịch vụ nào
        </div>
      )}
    </div>
  );
};
