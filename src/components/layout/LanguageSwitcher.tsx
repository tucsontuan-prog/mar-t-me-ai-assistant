import { useLanguage } from "@/hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1">
      <button
        onClick={() => setLanguage("vi")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
          language === "vi"
            ? "bg-white shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Tiếng Việt"
      >
        <span className="text-base leading-none">🇻🇳</span>
        <span className="hidden sm:inline">VI</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
          language === "en"
            ? "bg-white shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="English"
      >
        <span className="text-base leading-none">🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
