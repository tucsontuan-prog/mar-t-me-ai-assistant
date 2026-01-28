import { useState, useEffect } from "react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChatWindow } from "@/components/chat/ChatWindow";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import { getHeroSettings, HeroSettings } from "@/services/heroSettingsService";
import { Anchor, Ship, Container, Globe, Headphones, Clock, MessageCircle } from "lucide-react";
import * as Icons from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [heroSettings, setHeroSettings] = useState<HeroSettings | null>(null);
  
  // Parallax effect for hero background
  const parallaxOffset = useParallax(0.3);
  
  // Scroll animations for sections
  const [servicesRef, servicesVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  useEffect(() => {
    const loadHeroSettings = async () => {
      const data = await getHeroSettings();
      setHeroSettings(data);
    };
    loadHeroSettings();
  }, []);

  const getIconComponent = (iconName: string) => {
    const IconComp = (Icons as any)[iconName];
    return IconComp ? <IconComp className="w-5 h-5 text-ocean-teal" /> : <MessageCircle className="w-5 h-5 text-ocean-teal" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Admin Dashboard - shown when logged in */}
        {user && (
          <section className="py-6 bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4">
              <AdminDashboard />
            </div>
          </section>
        )}

        {/* Hero Section with Parallax */}
        <section className="relative overflow-hidden">
          {/* Background gradient with parallax */}
          <div 
            className="absolute inset-0 ocean-gradient opacity-95 transition-transform duration-100"
            style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
          />
          
          {/* Wave pattern overlay with parallax */}
          <div 
            className="absolute inset-0 opacity-10 transition-transform duration-100"
            style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
          >
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                className="text-white dark:text-white/20"
              />
            </svg>
          </div>
          
          {/* Floating decorative elements */}
          <div 
            className="absolute top-20 right-10 w-32 h-32 bg-ocean-teal/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallaxOffset * 1.2}px)` }}
          />
          <div 
            className="absolute bottom-20 left-10 w-48 h-48 bg-ocean-blue/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
          />

          <div className="relative container mx-auto px-4 py-16 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="text-white space-y-6">
                <div 
                  className="flex items-center gap-2 text-ocean-light opacity-0 animate-[fade-in_0.6s_ease-out_0.1s_forwards]"
                >
                  <Anchor className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {heroSettings 
                      ? (language === "vi" ? heroSettings.badge_vi : heroSettings.badge_en)
                      : t("hero.badge")
                    }
                  </span>
                </div>
                
                <h1 
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight opacity-0 animate-[fade-in_0.6s_ease-out_0.2s_forwards]"
                >
                  {heroSettings 
                    ? (language === "vi" ? heroSettings.title_vi : heroSettings.title_en)
                    : t("hero.title")
                  }{" "}
                  <span className="text-ocean-teal">
                    {heroSettings 
                      ? (language === "vi" ? heroSettings.titleHighlight_vi : heroSettings.titleHighlight_en)
                      : t("hero.titleHighlight")
                    }
                  </span>
                </h1>
                
                <p 
                  className="text-lg text-white/80 max-w-xl opacity-0 animate-[fade-in_0.6s_ease-out_0.3s_forwards]"
                >
                  {heroSettings 
                    ? (language === "vi" ? heroSettings.description_vi : heroSettings.description_en)
                    : t("hero.description")
                  }
                </p>

                {/* Customer-focused features - optimized grid for 5 items */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
                  {heroSettings?.features.map((feature, index) => (
                    <div 
                      key={feature.id} 
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300 opacity-0"
                      style={{ 
                        animation: `fade-in 0.5s ease-out ${0.4 + index * 0.1}s forwards`
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        {getIconComponent(feature.icon)}
                      </div>
                      <span className="text-xs text-center leading-tight">
                        {language === "vi" ? feature.text_vi : feature.text_en}
                      </span>
                    </div>
                  ))}
                  {!heroSettings && (
                    <>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-ocean-teal" />
                        </div>
                        <span className="text-xs text-center">{t("hero.feature1")}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-ocean-teal" />
                        </div>
                        <span className="text-xs text-center">{t("hero.feature2")}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Ship className="w-5 h-5 text-ocean-teal" />
                        </div>
                        <span className="text-xs text-center">{t("hero.feature3")}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Container className="w-5 h-5 text-ocean-teal" />
                        </div>
                        <span className="text-xs text-center">{t("hero.feature4")}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-ocean-teal" />
                        </div>
                        <span className="text-xs text-center">{t("hero.feature5")}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right - Chat preview with parallax */}
              <div className="hidden lg:block">
                <div 
                  className="relative transition-transform duration-300"
                  style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-ocean-teal/20 blur-3xl rounded-full animate-pulse-slow" />
                  
                  {/* Chat window */}
                  <div className="relative animate-float">
                    <ChatWindow embedded />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section with scroll animation */}
        <section 
          ref={servicesRef}
          className="py-16 lg:py-20 bg-background"
        >
          <div className="container mx-auto px-4">
            <div 
              className={`text-center mb-12 transition-all duration-700 ${
                servicesVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("services.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("services.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <article 
                className={`p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-500 text-center ${
                  servicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Ship className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.schedule.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("services.schedule.desc")}
                </p>
              </article>

              {/* Service 2 */}
              <article 
                className={`p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-500 text-center ${
                  servicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Container className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.container.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("services.container.desc")}
                </p>
              </article>

              {/* Service 3 */}
              <article 
                className={`p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-500 text-center ${
                  servicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Headphones className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("services.support.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("services.support.desc")}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section with scroll animation */}
        <section 
          ref={ctaRef}
          className="py-16 lg:py-20 bg-muted/50"
        >
          <div className="container mx-auto px-4">
            <div 
              className={`bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border text-center transition-all duration-700 ${
                ctaVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <div className="w-20 h-20 rounded-full ocean-gradient flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {t("cta.description")}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-ocean-teal">
                <Globe className="w-4 h-4" />
                <span>{t("cta.languages")}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget position="bottom-right" />
    </div>
  );
};

export default Index;
