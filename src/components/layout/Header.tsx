import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://portal.haiants.vn/images/logo_new.png"
              alt="HAIAN Transport and Stevedoring JSC"
              className="h-[32px] md:h-[38px] w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3 md:gap-5">
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
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Admin Login Button - only show when not logged in */}
            {!user && (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2 text-sm">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("admin.login")}</span>
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
