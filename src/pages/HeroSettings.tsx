import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getHeroSettings, saveHeroSettings, HeroSettings as HeroSettingsType, HeroFeature } from "@/services/heroSettingsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  RotateCcw,
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
} from "lucide-react";
import { toast } from "sonner";

const ICON_OPTIONS = [
  { name: "MessageCircle", icon: MessageCircle },
  { name: "Clock", icon: Clock },
  { name: "Ship", icon: Ship },
  { name: "Container", icon: Container },
  { name: "Globe", icon: Globe },
  { name: "HelpCircle", icon: HelpCircle },
  { name: "Search", icon: Search },
  { name: "Phone", icon: Phone },
  { name: "Mail", icon: Mail },
  { name: "MapPin", icon: MapPin },
  { name: "Calendar", icon: Calendar },
  { name: "FileText", icon: FileText },
  { name: "Package", icon: Package },
  { name: "Headphones", icon: Headphones },
  { name: "Zap", icon: Zap },
  { name: "Shield", icon: Shield },
  { name: "CheckCircle", icon: CheckCircle },
];

const HeroSettingsPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<HeroSettingsType | null>(null);
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
        const data = await getHeroSettings();
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
      await saveHeroSettings(settings);
      toast.success("Đã lưu cài đặt thành công");
    } catch (error: any) {
      toast.error(error.message || "Không thể lưu cài đặt");
    } finally {
      setIsSaving(false);
    }
  };

  const updateFeature = (index: number, field: keyof HeroFeature, value: string) => {
    if (!settings) return;
    const newFeatures = [...settings.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setSettings({ ...settings, features: newFeatures });
  };

  const addFeature = () => {
    if (!settings || settings.features.length >= 4) {
      toast.error("Tối đa 4 tính năng");
      return;
    }
    const newFeature: HeroFeature = {
      id: Date.now().toString(),
      icon: "CheckCircle",
      text_vi: "Tính năng mới",
      text_en: "New feature",
    };
    setSettings({ ...settings, features: [...settings.features, newFeature] });
  };

  const removeFeature = (index: number) => {
    if (!settings) return;
    const newFeatures = settings.features.filter((_, i) => i !== index);
    setSettings({ ...settings, features: newFeatures });
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Cài đặt Hero Section</h1>
              <p className="text-muted-foreground">Nội dung và tính năng hiển thị trên banner</p>
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

        {/* Hero Content */}
        <Card>
          <CardHeader>
            <CardTitle>Nội dung Hero</CardTitle>
            <CardDescription>Tiêu đề và mô tả hiển thị trên banner chính</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Badge (Tiếng Việt)</Label>
                <Input
                  value={settings.badge_vi}
                  onChange={(e) => setSettings({ ...settings, badge_vi: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Badge (English)</Label>
                <Input
                  value={settings.badge_en}
                  onChange={(e) => setSettings({ ...settings, badge_en: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tiêu đề (Tiếng Việt)</Label>
                <Input
                  value={settings.title_vi}
                  onChange={(e) => setSettings({ ...settings, title_vi: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tiêu đề (English)</Label>
                <Input
                  value={settings.title_en}
                  onChange={(e) => setSettings({ ...settings, title_en: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Highlight (Tiếng Việt)</Label>
                <Input
                  value={settings.titleHighlight_vi}
                  onChange={(e) => setSettings({ ...settings, titleHighlight_vi: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Highlight (English)</Label>
                <Input
                  value={settings.titleHighlight_en}
                  onChange={(e) => setSettings({ ...settings, titleHighlight_en: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mô tả (Tiếng Việt)</Label>
                <Textarea
                  value={settings.description_vi}
                  onChange={(e) => setSettings({ ...settings, description_vi: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Mô tả (English)</Label>
                <Textarea
                  value={settings.description_en}
                  onChange={(e) => setSettings({ ...settings, description_en: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tính năng nổi bật</CardTitle>
                <CardDescription>Các tính năng hiển thị trong Hero section (tối đa 4)</CardDescription>
              </div>
              <Button onClick={addFeature} size="sm" disabled={settings.features.length >= 4}>
                <Plus className="w-4 h-4 mr-1" />
                Thêm
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.features.map((feature, index) => (
              <div key={feature.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-muted-foreground">
                    Tính năng #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
                          onClick={() => updateFeature(index, "icon", opt.name)}
                          className={`p-2 rounded-md transition-colors ${
                            feature.icon === opt.name
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
                    <Label className="text-xs">Text (Tiếng Việt)</Label>
                    <Input
                      value={feature.text_vi}
                      onChange={(e) => updateFeature(index, "text_vi", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Text (English)</Label>
                    <Input
                      value={feature.text_en}
                      onChange={(e) => updateFeature(index, "text_en", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {settings.features.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có tính năng nào. Nhấn "Thêm" để tạo mới.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSettingsPage;
