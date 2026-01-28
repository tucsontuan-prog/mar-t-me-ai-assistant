import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  Settings,
  FileText,
  Database,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const menuItems = [
    {
      icon: Bot,
      title: t("admin.chatbotSettings"),
      description: "Tin nhắn chào mừng, câu hỏi gợi ý",
      path: "/chatbot-settings",
      color: "bg-blue-500",
    },
    {
      icon: Settings,
      title: t("admin.qaManagement"),
      description: "Câu hỏi và trả lời mẫu",
      path: "/admin",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      title: t("admin.knowledgeDocs"),
      description: "Tài liệu context cho AI",
      path: "/knowledge-docs",
      color: "bg-green-500",
    },
    {
      icon: Database,
      title: t("admin.seedData"),
      description: "Khởi tạo dữ liệu mẫu",
      path: "/seed-data",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ocean-teal/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-ocean-teal" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {t("admin.panel")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("admin.dashboard")}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-destructive hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          {t("admin.logout")}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <Card
            key={item.path}
            onClick={() => navigate(item.path)}
            className="cursor-pointer hover:shadow-medium transition-all hover:border-ocean-teal/50 group"
          >
            <CardHeader className="p-4 pb-2">
              <div
                className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-sm">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-xs">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
