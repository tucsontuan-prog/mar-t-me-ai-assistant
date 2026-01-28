import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChatWindow } from "@/components/chat/ChatWindow";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Anchor, Ship, Container, Globe, Headphones, Clock, MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
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

          <div className="relative container mx-auto px-4 py-16 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="text-white space-y-6">
                <div className="flex items-center gap-2 text-ocean-light">
                  <Anchor className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    HAIAN Chatbot
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Xin chào! Tôi có thể{" "}
                  <span className="text-ocean-teal">giúp gì cho bạn?</span>
                </h1>
                
                <p className="text-lg text-white/80 max-w-xl">
                  Trợ lý ảo HAIAN sẵn sàng hỗ trợ bạn 24/7. Hãy đặt câu hỏi về 
                  dịch vụ vận tải, lịch tàu, tra cứu container và nhiều hơn nữa.
                </p>

                {/* Customer-focused features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-ocean-teal" />
                    </div>
                    <span className="text-sm">Trả lời tức thì</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-ocean-teal" />
                    </div>
                    <span className="text-sm">Hoạt động 24/7</span>
                  </div>
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
                    <span className="text-sm">Theo dõi container</span>
                  </div>
                </div>
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

        {/* Services Section - Customer focused */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Chúng tôi có thể hỗ trợ bạn
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trợ lý ảo HAIAN được thiết kế để giải đáp mọi thắc mắc của bạn 
                về dịch vụ vận tải biển một cách nhanh chóng và chính xác.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <article className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Ship className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Thông tin lịch tàu
                </h3>
                <p className="text-muted-foreground text-sm">
                  Tra cứu lịch trình tàu, thời gian khởi hành và cập cảng 
                  trên các tuyến nội địa và quốc tế.
                </p>
              </article>

              {/* Service 2 */}
              <article className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Container className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Theo dõi container
                </h3>
                <p className="text-muted-foreground text-sm">
                  Kiểm tra trạng thái và vị trí container của bạn 
                  theo thời gian thực.
                </p>
              </article>

              {/* Service 3 */}
              <article className="p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow text-center">
                <div className="w-16 h-16 rounded-full bg-ocean-foam flex items-center justify-center mb-4 mx-auto">
                  <Headphones className="w-8 h-8 text-ocean-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Hỗ trợ khách hàng
                </h3>
                <p className="text-muted-foreground text-sm">
                  Giải đáp thắc mắc về dịch vụ, báo giá và 
                  các thông tin liên quan khác.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border text-center">
              <div className="w-20 h-20 rounded-full ocean-gradient flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Bắt đầu trò chuyện ngay
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Nhấn vào biểu tượng chat ở góc phải màn hình để bắt đầu 
                trò chuyện với trợ lý ảo HAIAN.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-ocean-teal">
                <Globe className="w-4 h-4" />
                <span>Hỗ trợ tiếng Việt và tiếng Anh</span>
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
