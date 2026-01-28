import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Anchor, Ship, Container, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 ocean-gradient opacity-95" />
        
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="text-white"
            />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white space-y-6">
              <div className="flex items-center gap-2 text-ocean-light">
                <Anchor className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Maritime Chatbot
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Trợ lý AI thông minh cho{" "}
                <span className="text-ocean-teal">Vận tải biển</span>
              </h1>
              
              <p className="text-lg text-white/80 max-w-xl">
                Chatbot hỗ trợ 24/7, trả lời chính xác dựa trên dữ liệu của bạn. 
                Tích hợp dễ dàng vào website, sử dụng công nghệ AI Gemini tiên tiến.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Ship className="w-5 h-5 text-ocean-teal" />
                  </div>
                  <span className="text-sm">Tra cứu lịch tàu</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Container className="w-5 h-5 text-ocean-teal" />
                  </div>
                  <span className="text-sm">Tracking container</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-ocean-teal" />
                  </div>
                  <span className="text-sm">Tuyến đường quốc tế</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Anchor className="w-5 h-5 text-ocean-teal" />
                  </div>
                  <span className="text-sm">Hỗ trợ 24/7</span>
                </div>
              </div>

              <Button
                size="lg"
                className="mt-6 bg-ocean-teal hover:bg-ocean-teal/90 text-white gap-2"
              >
                Dùng thử ngay
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Right - Chat preview */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-ocean-teal/20 blur-3xl rounded-full" />
                
                {/* Chat window */}
                <div className="relative animate-float">
                  <ChatWindow embedded />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chatbot được thiết kế riêng cho ngành vận tải biển, 
              tích hợp dữ liệu của bạn và trả lời chính xác theo ngữ cảnh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-ocean-foam flex items-center justify-center mb-4">
                <Ship className="w-6 h-6 text-ocean-teal" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dữ liệu tùy chỉnh
              </h3>
              <p className="text-muted-foreground text-sm">
                Chỉ trả lời dựa trên dữ liệu bạn cung cấp, đảm bảo thông tin 
                chính xác và phù hợp với doanh nghiệp.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-ocean-foam flex items-center justify-center mb-4">
                <Container className="w-6 h-6 text-ocean-teal" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Xác thực Firebase
              </h3>
              <p className="text-muted-foreground text-sm">
                Bảo mật với Firebase Authentication, quản lý người dùng 
                và phân quyền truy cập dữ liệu.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-ocean-foam flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-ocean-teal" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nhúng dễ dàng
              </h3>
              <p className="text-muted-foreground text-sm">
                Widget chatbot có thể nhúng vào bất kỳ website nào, 
                tùy chỉnh giao diện phù hợp thương hiệu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embed Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Nhúng chatbot vào website của bạn
                </h2>
                <p className="text-muted-foreground mb-6">
                  Chỉ cần một đoạn mã ngắn, chatbot sẽ xuất hiện trên website 
                  của bạn và sẵn sàng hỗ trợ khách hàng.
                </p>
                
                {/* Code snippet */}
                <div className="bg-ocean-deep rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
                  <code>
                    {`<script src="https://your-domain.com/chatbot.js"></script>`}
                  </code>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-[300px] h-[400px] bg-background rounded-xl shadow-medium border border-border p-4">
                  <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      Your Website
                    </span>
                  </div>
                  
                  {/* Mini widget preview */}
                  <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full ocean-gradient shadow-medium flex items-center justify-center">
                    <Ship className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget position="bottom-right" />
    </div>
  );
};

export default Index;
