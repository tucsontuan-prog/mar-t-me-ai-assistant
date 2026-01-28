import { HeroSettings, HeroFeature } from "@/services/heroSettingsService";
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

interface HeroPreviewProps {
  settings: HeroSettings;
  language?: "vi" | "en";
}

export const HeroPreview = ({ settings, language = "vi" }: HeroPreviewProps) => {
  const isVi = language === "vi";

  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-ocean-deep via-ocean-navy to-ocean-blue">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-ocean-teal/30 blur-xl" />
        <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-ocean-blue/30 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative p-6 text-center space-y-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="w-1.5 h-1.5 bg-ocean-teal rounded-full animate-pulse" />
          <span className="text-xs font-medium text-white/90">
            {isVi ? settings.badge_vi : settings.badge_en}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white leading-tight">
          {isVi ? settings.title_vi : settings.title_en}{" "}
          <span className="text-ocean-teal">
            {isVi ? settings.titleHighlight_vi : settings.titleHighlight_en}
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm text-white/80 max-w-sm mx-auto">
          {isVi ? settings.description_vi : settings.description_en}
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
          {settings.features.map((feature: HeroFeature, index: number) => {
            const IconComp = ICON_MAP[feature.icon] || CheckCircle;
            return (
              <div
                key={feature.id || index}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <IconComp className="w-3 h-3 text-ocean-teal flex-shrink-0" />
                <span className="text-xs text-white/90 truncate">
                  {isVi ? feature.text_vi : feature.text_en}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
