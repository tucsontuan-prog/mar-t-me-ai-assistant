import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage, Language, languageNames, languageFlags } from "@/hooks/useLanguage";

const languages: Language[] = ["vi", "en", "zh", "ko", "ja"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-9 px-2 text-foreground hover:bg-muted"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium uppercase">{language}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-popover z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer gap-2 ${
              language === lang ? "bg-muted font-medium" : ""
            }`}
          >
            <span className="text-base">{languageFlags[lang]}</span>
            <span>{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
