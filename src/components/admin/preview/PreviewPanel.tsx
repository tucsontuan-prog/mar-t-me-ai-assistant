import { useState, ReactNode } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  title?: string;
  children: (language: "vi" | "en") => ReactNode;
  className?: string;
}

export const PreviewPanel = ({ 
  title = "Preview", 
  children,
  className 
}: PreviewPanelProps) => {
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  return (
    <Card className={cn("sticky top-4", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="w-4 h-4 text-ocean-teal" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 text-xs",
                language === "vi" && "bg-background shadow-sm"
              )}
              onClick={() => setLanguage("vi")}
            >
              🇻🇳 VI
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 text-xs",
                language === "en" && "bg-background shadow-sm"
              )}
              onClick={() => setLanguage("en")}
            >
              🇬🇧 EN
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children(language)}
      </CardContent>
    </Card>
  );
};
