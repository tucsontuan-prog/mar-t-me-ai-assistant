import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, MapPin, Users, Eye } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const randomOnline = Math.floor(Math.random() * 50) + 10;
    setOnlineUsers(randomOnline);

    const storedVisits = localStorage.getItem("haian_total_visits");
    const visits = storedVisits ? parseInt(storedVisits) + 1 : 1234567;
    localStorage.setItem("haian_total_visits", visits.toString());
    setTotalVisits(visits);

    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(5, prev + change);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("vi-VN");
  };

  return (
    <footer className="bg-ocean-deep text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Block A: Company Identity */}
          <div className="space-y-4">
            <img
              src="https://portal.haiants.vn/images/logo-footer.png"
              alt="HAIAN Logo Footer"
              className="h-12 w-auto object-contain mb-4"
            />
            <div>
              <p className="font-bold text-lg text-white">
                Công ty cổ phần Vận tải và Xếp dỡ Hải An
              </p>
              <p className="font-bold text-ocean-teal mt-1">
                Hai An Transport and Stevedoring JSC
              </p>
            </div>
          </div>

          {/* Block B: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ocean-teal mb-4">
              {t("footer.contact")}
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-ocean-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80">
                  <p>
                    Tầng 7, Số 45, Phố Triệu Việt Vương, Phường Hai Bà Trưng,
                    Thành phố Hà Nội, Việt Nam
                  </p>
                  <p className="text-white/60 mt-1 italic">
                    7th Floor, 45 Trieu Viet Vuong St., Hai Ba Trung Ward, Ha
                    Noi City, Viet Nam
                  </p>
                </div>
              </div>

              <a
                href="tel:+84-24-39877515"
                className="flex items-center gap-3 text-white/80 hover:text-ocean-teal transition-colors group"
              >
                <Phone className="w-5 h-5 text-ocean-teal group-hover:scale-110 transition-transform" />
                <span className="text-sm">+84-24-39877515</span>
              </a>

              <a
                href="mailto:info@haiants.vn"
                className="flex items-center gap-3 text-white/80 hover:text-ocean-teal transition-colors group"
              >
                <Mail className="w-5 h-5 text-ocean-teal group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@haiants.vn</span>
              </a>

              <a
                href="https://haiants.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-ocean-teal transition-colors group"
              >
                <Globe className="w-5 h-5 text-ocean-teal group-hover:scale-110 transition-transform" />
                <span className="text-sm">haiants.vn</span>
              </a>
            </div>
          </div>

          {/* Block C: Traffic Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ocean-teal mb-4">
              {t("footer.stats")}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">
                    {t("footer.online")}
                  </p>
                  <p className="text-xl font-bold text-green-400">
                    {formatNumber(onlineUsers)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-ocean-teal/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-ocean-teal" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wide">
                    {t("footer.totalVisits")}
                  </p>
                  <p className="text-xl font-bold text-ocean-teal">
                    {formatNumber(totalVisits)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-ocean-navy border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-white/60">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <span>{t("footer.copyright")}</span>
              <span className="hidden md:inline">|</span>
              <span>{t("footer.developer")}</span>
            </div>
            {/* Subtle admin login link */}
            <Link
              to="/auth"
              className="text-white/30 hover:text-white/50 transition-colors text-xs"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
