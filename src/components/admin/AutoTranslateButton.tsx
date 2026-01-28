import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages, Loader2 } from "lucide-react";
import { translateText } from "@/services/translateService";
import { toast } from "sonner";

interface AutoTranslateButtonProps {
  sourceText: string;
  sourceLanguage?: string;
  onTranslated: (translations: Record<string, string>) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg" | "icon";
}

export const AutoTranslateButton = ({
  sourceText,
  sourceLanguage = "vi",
  onTranslated,
  disabled = false,
  size = "sm",
}: AutoTranslateButtonProps) => {
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText || sourceText.trim() === "") {
      toast.error("Vui lòng nhập nội dung cần dịch");
      return;
    }

    setIsTranslating(true);
    try {
      const targetLangs = sourceLanguage === "vi" 
        ? ["en", "zh", "ko", "ja"] 
        : ["vi", "en", "zh", "ko", "ja"].filter(l => l !== sourceLanguage);
      
      const result = await translateText(sourceText, targetLangs, sourceLanguage);
      onTranslated(result.translations);
      toast.success("Đã dịch tự động thành công!");
    } catch (error: any) {
      console.error("Translation error:", error);
      toast.error(error.message || "Không thể dịch. Vui lòng thử lại.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={handleTranslate}
      disabled={disabled || isTranslating || !sourceText}
      className="gap-1.5"
    >
      {isTranslating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Đang dịch...
        </>
      ) : (
        <>
          <Languages className="w-4 h-4" />
          Dịch AI
        </>
      )}
    </Button>
  );
};
