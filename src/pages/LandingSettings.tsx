import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  getLandingSettings, 
  saveLandingSettings, 
  LandingSettings as LandingSettingsType,
  ServiceCard
} from "@/services/landingSettingsService";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { ServicesPreview } from "@/components/admin/preview/ServicesPreview";
import { CTAPreview } from "@/components/admin/preview/CTAPreview";
import { PreviewPanel } from "@/components/admin/preview/PreviewPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
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
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

const ICON_OPTIONS = [
  { name: "Ship", icon: Ship },
  { name: "Container", icon: Container },
  { name: "Headphones", icon: Headphones },
  { name: "MessageCircle", icon: MessageCircle },
  { name: "Clock", icon: Clock },
  { name: "Globe", icon: Globe },
  { name: "HelpCircle", icon: HelpCircle },
  { name: "Search", icon: Search },
  { name: "Phone", icon: Phone },
  { name: "Mail", icon: Mail },
  { name: "MapPin", icon: MapPin },
  { name: "Calendar", icon: Calendar },
  { name: "FileText", icon: FileText },
  { name: "Package", icon: Package },
  { name: "Zap", icon: Zap },
  { name: "Shield", icon: Shield },
  { name: "CheckCircle", icon: CheckCircle },
];

const LandingSettingsPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<LandingSettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const data = await getLandingSettings();
        setSettings(data);
      } catch (error) {
        toast.error("Không thể tải cài đặt");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadSettings();
    }
  }, [user]);

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      await saveLandingSettings(settings);
      toast.success("Đã lưu cài đặt thành công");
    } catch (error: any) {
      toast.error(error.message || "Không thể lưu cài đặt");
    } finally {
      setIsSaving(false);
    }
  };

  const updateServiceCard = (index: number, field: keyof ServiceCard, value: string) => {
    if (!settings) return;
    const newCards = [...settings.services.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setSettings({ 
      ...settings, 
      services: { ...settings.services, cards: newCards } 
    });
  };

  const addServiceCard = () => {
    if (!settings || settings.services.cards.length >= 6) {
      toast.error("Tối đa 6 dịch vụ");
      return;
    }
    const newCard: ServiceCard = {
      id: Date.now().toString(),
      icon: "CheckCircle",
      title_vi: "Dịch vụ mới",
      title_en: "New Service",
      description_vi: "Mô tả dịch vụ",
      description_en: "Service description",
    };
    setSettings({ 
      ...settings, 
      services: { ...settings.services, cards: [...settings.services.cards, newCard] } 
    });
  };

  const removeServiceCard = (index: number) => {
    if (!settings) return;
    const newCards = settings.services.cards.filter((_, i) => i !== index);
    setSettings({ 
      ...settings, 
      services: { ...settings.services, cards: newCards } 
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean-teal" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cài đặt Landing Page</h1>
              <p className="text-muted-foreground">Nội dung các section trên trang chủ</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-ocean-teal hover:bg-ocean-teal/90">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu cài đặt
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services" className="gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Services Section
                </TabsTrigger>
                <TabsTrigger value="cta" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  CTA Section
                </TabsTrigger>
              </TabsList>

          {/* Services Section */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tiêu đề & Mô tả</CardTitle>
                    <CardDescription>Nội dung header của section dịch vụ</CardDescription>
                  </div>
                  <AutoTranslateButton
                    sourceText={`${settings.services.title_vi}|${settings.services.description_vi}`}
                    onTranslated={(translations) => {
                      const parts = translations.en?.split("|") || [];
                      if (parts.length >= 2) {
                        setSettings({
                          ...settings,
                          services: {
                            ...settings.services,
                            title_en: parts[0].trim(),
                            description_en: parts[1].trim(),
                          },
                        });
                      }
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề (Tiếng Việt) 🇻🇳</Label>
                    <Input
                      value={settings.services.title_vi}
                      onChange={(e) => setSettings({
                        ...settings,
                        services: { ...settings.services, title_vi: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tiêu đề (English) 🇬🇧</Label>
                    <Input
                      value={settings.services.title_en}
                      onChange={(e) => setSettings({
                        ...settings,
                        services: { ...settings.services, title_en: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mô tả (Tiếng Việt) 🇻🇳</Label>
                    <Textarea
                      value={settings.services.description_vi}
                      onChange={(e) => setSettings({
                        ...settings,
                        services: { ...settings.services, description_vi: e.target.value }
                      })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mô tả (English) 🇬🇧</Label>
                    <Textarea
                      value={settings.services.description_en}
                      onChange={(e) => setSettings({
                        ...settings,
                        services: { ...settings.services, description_en: e.target.value }
                      })}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Cards</CardTitle>
                    <CardDescription>Các thẻ dịch vụ hiển thị (tối đa 6)</CardDescription>
                  </div>
                  <Button onClick={addServiceCard} size="sm" disabled={settings.services.cards.length >= 6}>
                    <Plus className="w-4 h-4 mr-1" />
                    Thêm
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.services.cards.map((card, index) => (
                  <div key={card.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-muted-foreground">
                        Dịch vụ #{index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <AutoTranslateButton
                          sourceText={`${card.title_vi}|${card.description_vi}`}
                          size="sm"
                          onTranslated={(translations) => {
                            const parts = translations.en?.split("|") || [];
                            if (parts.length >= 2) {
                              updateServiceCard(index, "title_en", parts[0].trim());
                              updateServiceCard(index, "description_en", parts[1].trim());
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeServiceCard(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Icon</Label>
                      <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-background">
                        {ICON_OPTIONS.map((opt) => {
                          const IconComp = opt.icon;
                          return (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => updateServiceCard(index, "icon", opt.name)}
                              className={`p-2 rounded-md transition-colors ${
                                card.icon === opt.name
                                  ? "bg-ocean-teal text-white"
                                  : "hover:bg-muted"
                              }`}
                              title={opt.name}
                            >
                              <IconComp className="w-4 h-4" />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Tiêu đề (Tiếng Việt) 🇻🇳</Label>
                        <Input
                          value={card.title_vi}
                          onChange={(e) => updateServiceCard(index, "title_vi", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Tiêu đề (English) 🇬🇧</Label>
                        <Input
                          value={card.title_en}
                          onChange={(e) => updateServiceCard(index, "title_en", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Mô tả (Tiếng Việt) 🇻🇳</Label>
                        <Textarea
                          value={card.description_vi}
                          onChange={(e) => updateServiceCard(index, "description_vi", e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Mô tả (English) 🇬🇧</Label>
                        <Textarea
                          value={card.description_en}
                          onChange={(e) => updateServiceCard(index, "description_en", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {settings.services.cards.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Chưa có dịch vụ nào. Nhấn "Thêm" để tạo mới.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CTA Section */}
          <TabsContent value="cta" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>CTA Section</CardTitle>
                    <CardDescription>Nội dung kêu gọi hành động cuối trang</CardDescription>
                  </div>
                  <AutoTranslateButton
                    sourceText={`${settings.cta.title_vi}|${settings.cta.description_vi}|${settings.cta.languagesText_vi}`}
                    onTranslated={(translations) => {
                      const parts = translations.en?.split("|") || [];
                      if (parts.length >= 3) {
                        setSettings({
                          ...settings,
                          cta: {
                            ...settings.cta,
                            title_en: parts[0].trim(),
                            description_en: parts[1].trim(),
                            languagesText_en: parts[2].trim(),
                          },
                        });
                      }
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tiêu đề (Tiếng Việt) 🇻🇳</Label>
                    <Input
                      value={settings.cta.title_vi}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, title_vi: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tiêu đề (English) 🇬🇧</Label>
                    <Input
                      value={settings.cta.title_en}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, title_en: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mô tả (Tiếng Việt) 🇻🇳</Label>
                    <Textarea
                      value={settings.cta.description_vi}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, description_vi: e.target.value }
                      })}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mô tả (English) 🇬🇧</Label>
                    <Textarea
                      value={settings.cta.description_en}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, description_en: e.target.value }
                      })}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngôn ngữ hỗ trợ (Tiếng Việt) 🇻🇳</Label>
                    <Input
                      value={settings.cta.languagesText_vi}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, languagesText_vi: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngôn ngữ hỗ trợ (English) 🇬🇧</Label>
                    <Input
                      value={settings.cta.languagesText_en}
                      onChange={(e) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, languagesText_en: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1 space-y-4">
            <PreviewPanel title="Xem trước Services">
              {(language: "vi" | "en") => (
                <ServicesPreview settings={settings.services} language={language} />
              )}
            </PreviewPanel>
            <PreviewPanel title="Xem trước CTA">
              {(language: "vi" | "en") => (
                <CTAPreview settings={settings.cta} language={language} />
              )}
            </PreviewPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSettingsPage;
