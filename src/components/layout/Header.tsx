import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://portal.haiants.vn/images/logo_new.png"
              alt="HAIAN Transport and Stevedoring JSC"
              className="h-[32px] md:h-[38px] w-auto object-contain dark:brightness-110"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="hidden sm:block text-foreground hover:text-ocean-teal transition-colors font-medium text-sm"
            >
              {t("nav.home")}
            </Link>
            <a
              href="https://haiants.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-foreground hover:text-ocean-teal transition-colors font-medium text-sm"
            >
              {t("nav.website")}
            </a>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
