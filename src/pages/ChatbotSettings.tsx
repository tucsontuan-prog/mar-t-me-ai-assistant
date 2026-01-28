import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  getChatbotSettings,
  saveChatbotSettings,
  getDefaultSettings,
  ChatbotSettings,
  QuickAction,
} from "@/services/chatbotSettingsService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  RotateCcw,
  MessageSquare,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

const ICON_OPTIONS = [
  "Ship", "Container", "Globe", "HelpCircle", "Search", "Phone", 
  "Mail", "MapPin", "Clock", "Calendar", "FileText", "Package"
];

const ChatbotSettingsPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
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
        const data = await getChatbotSettings();
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
      await saveChatbotSettings(settings);
      toast.success("Đã lưu cài đặt thành công");
    } catch (error: any) {
      toast.error(error.message || "Không thể lưu cài đặt");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(getDefaultSettings());
    toast.info("Đã khôi phục cài đặt mặc định (chưa lưu)");
  };

  const updateQuickAction = (index: number, field: keyof QuickAction, value: string) => {
    if (!settings) return;
    const newActions = [...settings.quickActions];
    newActions[index] = { ...newActions[index], [field]: value };
    setSettings({ ...settings, quickActions: newActions });
  };

  const addQuickAction = () => {
    if (!settings) return;
    const newAction: QuickAction = {
      id: Date.now().toString(),
      icon: "HelpCircle",
      label_vi: "Hành động mới",
      label_en: "New action",
      prompt: "Prompt mới",
    };
    setSettings({ ...settings, quickActions: [...settings.quickActions, newAction] });
  };

  const removeQuickAction = (index: number) => {
    if (!settings) return;
    const newActions = settings.quickActions.filter((_, i) => i !== index);
    setSettings({ ...settings, quickActions: newActions });
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
              <h1 className="text-2xl font-bold text-foreground">Cài đặt Chatbot</h1>
              <p className="text-muted-foreground">Tùy chỉnh nội dung và câu hỏi gợi ý</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Khôi phục mặc định
            </Button>
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
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Nội dung tin nhắn
            </TabsTrigger>
            <TabsTrigger value="actions" className="gap-2">
              <Settings2 className="w-4 h-4" />
              Câu hỏi gợi ý
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin Header</CardTitle>
                <CardDescription>Tên và trạng thái hiển thị trên đầu chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên trợ lý</Label>
                  <Input
                    value={settings.assistantName}
                    onChange={(e) => setSettings({ ...settings, assistantName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trạng thái (Tiếng Việt)</Label>
                    <Input
                      value={settings.statusText_vi}
                      onChange={(e) => setSettings({ ...settings, statusText_vi: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Trạng thái (English)</Label>
                    <Input
                      value={settings.statusText_en}
                      onChange={(e) => setSettings({ ...settings, statusText_en: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tin nhắn chào mừng</CardTitle>
                <CardDescription>Tin nhắn đầu tiên khi khách hàng mở chatbot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tiếng Việt 🇻🇳</Label>
                  <Textarea
                    value={settings.welcomeMessage_vi}
                    onChange={(e) => setSettings({ ...settings, welcomeMessage_vi: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>English 🇬🇧</Label>
                  <Textarea
                    value={settings.welcomeMessage_en}
                    onChange={(e) => setSettings({ ...settings, welcomeMessage_en: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placeholder ô nhập</CardTitle>
                <CardDescription>Gợi ý hiển thị trong ô nhập tin nhắn</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tiếng Việt 🇻🇳</Label>
                  <Input
                    value={settings.placeholder_vi}
                    onChange={(e) => setSettings({ ...settings, placeholder_vi: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>English 🇬🇧</Label>
                  <Input
                    value={settings.placeholder_en}
                    onChange={(e) => setSettings({ ...settings, placeholder_en: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Câu hỏi gợi ý</CardTitle>
                    <CardDescription>Các nút hành động nhanh hiển thị trong chat</CardDescription>
                  </div>
                  <Button onClick={addQuickAction} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Thêm
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.quickActions.map((action, index) => (
                  <div key={action.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-muted-foreground">
                        Hành động #{index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeQuickAction(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Icon</Label>
                        <select
                          value={action.icon}
                          onChange={(e) => updateQuickAction(index, "icon", e.target.value)}
                          className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Nhãn (VI)</Label>
                        <Input
                          value={action.label_vi}
                          onChange={(e) => updateQuickAction(index, "label_vi", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Nhãn (EN)</Label>
                        <Input
                          value={action.label_en}
                          onChange={(e) => updateQuickAction(index, "label_en", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Prompt gửi đến AI</Label>
                      <Input
                        value={action.prompt}
                        onChange={(e) => updateQuickAction(index, "prompt", e.target.value)}
                        placeholder="Câu hỏi sẽ được gửi khi click"
                      />
                    </div>
                  </div>
                ))}

                {settings.quickActions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Chưa có câu hỏi gợi ý nào. Nhấn "Thêm" để tạo mới.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChatbotSettingsPage;
