import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, MessageSquare, Settings, Database, FileText, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất");
      navigate("/auth");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất");
    }
  };

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/auth")}
        className="gap-2"
      >
        <User className="w-4 h-4" />
        Đăng nhập
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div className="w-6 h-6 rounded-full bg-ocean-teal flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="max-w-[120px] truncate">
            {user.email?.split("@")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
        <DropdownMenuItem className="text-muted-foreground text-xs">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/")} className="gap-2 cursor-pointer">
          <MessageSquare className="w-4 h-4" />
          Chat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/chatbot-settings")} className="gap-2 cursor-pointer">
          <Bot className="w-4 h-4" />
          Cài đặt Chatbot
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin")} className="gap-2 cursor-pointer">
          <Settings className="w-4 h-4" />
          Quản lý Q&A
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/knowledge-docs")} className="gap-2 cursor-pointer">
          <FileText className="w-4 h-4" />
          Tài liệu Knowledge
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/seed-data")} className="gap-2 cursor-pointer">
          <Database className="w-4 h-4" />
          Seed Data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive cursor-pointer">
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
