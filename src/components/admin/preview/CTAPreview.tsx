import { CTASettings } from "@/services/landingSettingsService";
import { MessageCircle, Languages } from "lucide-react";

interface CTAPreviewProps {
  settings: CTASettings;
  language?: "vi" | "en";
}

export const CTAPreview = ({ settings, language = "vi" }: CTAPreviewProps) => {
  const isVi = language === "vi";

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="bg-gradient-to-r from-ocean-deep via-ocean-navy to-ocean-blue p-6 text-center space-y-3">
        {/* Title */}
        <h3 className="text-base font-bold text-white">
          {isVi ? settings.title_vi : settings.title_en}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/80 max-w-sm mx-auto">
          {isVi ? settings.description_vi : settings.description_en}
        </p>

        {/* Chat Button (visual only) */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean-teal text-white text-sm font-medium shadow-lg">
            <MessageCircle className="w-4 h-4" />
            {isVi ? "Bắt đầu chat" : "Start Chat"}
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <Languages className="w-3 h-3 text-white/60" />
          <span className="text-xs text-white/60">
            {isVi ? settings.languagesText_vi : settings.languagesText_en}
          </span>
        </div>
      </div>
    </div>
  );
};
