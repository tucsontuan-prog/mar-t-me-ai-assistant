import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Check, Code, ExternalLink, Globe } from "lucide-react";
import { toast } from "sonner";

const EmbedGuide = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-teal" />
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  const baseUrl = window.location.origin;

  const iframeCode = `<!-- HAIAN Chatbot Widget -->
<iframe
  src="${baseUrl}/chat-widget"
  style="
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    height: 600px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    z-index: 9999;
  "
  allow="microphone"
></iframe>`;

  const scriptCode = `<!-- HAIAN Chatbot Widget -->
<script>
(function() {
  var iframe = document.createElement('iframe');
  iframe.src = '${baseUrl}/chat-widget';
  iframe.style.cssText = 'position:fixed;bottom:20px;right:20px;width:400px;height:600px;border:none;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);z-index:9999;';
  iframe.allow = 'microphone';
  document.body.appendChild(iframe);
})();
</script>`;

  const buttonWidgetCode = `<!-- HAIAN Chatbot Button Widget -->
<script>
(function() {
  // Create toggle button
  var btn = document.createElement('button');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#0f766e,#134e4a);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:9999;display:flex;align-items:center;justify-content:center;color:white;transition:transform 0.2s;';
  btn.onmouseover = function() { this.style.transform = 'scale(1.1)'; };
  btn.onmouseout = function() { this.style.transform = 'scale(1)'; };
  
  // Create iframe container
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;bottom:90px;right:20px;width:400px;height:600px;z-index:9998;display:none;';
  
  var iframe = document.createElement('iframe');
  iframe.src = '${baseUrl}/chat-widget';
  iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.2);';
  container.appendChild(iframe);
  
  // Toggle chat
  var isOpen = false;
  btn.onclick = function() {
    isOpen = !isOpen;
    container.style.display = isOpen ? 'block' : 'none';
    btn.innerHTML = isOpen 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  };
  
  document.body.appendChild(container);
  document.body.appendChild(btn);
})();
</script>`;

  const copyToClipboard = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(name);
    toast.success("Đã sao chép mã nhúng!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, name }: { code: string; name: string }) => (
    <div className="relative">
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 gap-1"
        onClick={() => copyToClipboard(code, name)}
      >
        {copiedCode === name ? (
          <>
            <Check className="w-4 h-4" />
            Đã sao chép
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Sao chép
          </>
        )}
      </Button>
      <pre className="bg-ocean-deep text-ocean-light p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Code className="w-6 h-6 text-ocean-teal" />
              Hướng dẫn nhúng Chatbot
            </h1>
            <p className="text-muted-foreground">
              Tích hợp chatbot vào website của bạn
            </p>
          </div>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-ocean-teal" />
              Cách nhúng Chatbot
            </CardTitle>
            <CardDescription>
              Chọn phương thức phù hợp với website của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="button" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="button">Nút bấm (Khuyến nghị)</TabsTrigger>
                <TabsTrigger value="script">Script tự động</TabsTrigger>
                <TabsTrigger value="iframe">iFrame trực tiếp</TabsTrigger>
              </TabsList>

              <TabsContent value="button" className="space-y-4">
                <div className="p-4 bg-ocean-foam rounded-lg border border-ocean-teal/20">
                  <h4 className="font-semibold text-foreground mb-2">✨ Nút bấm mở/đóng chat</h4>
                  <p className="text-sm text-muted-foreground">
                    Hiển thị nút chat ở góc phải, người dùng click để mở/đóng cửa sổ chat.
                    Phù hợp cho hầu hết website vì không chiếm nhiều diện tích.
                  </p>
                </div>
                <CodeBlock code={buttonWidgetCode} name="button" />
              </TabsContent>

              <TabsContent value="script" className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">📜 Script nhúng</h4>
                  <p className="text-sm text-muted-foreground">
                    Thêm script vào cuối thẻ &lt;body&gt; để tự động hiển thị chatbot.
                    Cửa sổ chat luôn hiển thị ở góc phải.
                  </p>
                </div>
                <CodeBlock code={scriptCode} name="script" />
              </TabsContent>

              <TabsContent value="iframe" className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">🖼️ iFrame trực tiếp</h4>
                  <p className="text-sm text-muted-foreground">
                    Nhúng trực tiếp iFrame vào HTML. Có thể tùy chỉnh vị trí và kích thước.
                  </p>
                </div>
                <CodeBlock code={iframeCode} name="iframe" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Lưu ý khi nhúng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-ocean-teal/10 flex items-center justify-center flex-shrink-0">
                <span className="text-ocean-teal text-sm font-bold">1</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Đặt mã nhúng ngay trước thẻ đóng <code className="bg-muted px-1 rounded">&lt;/body&gt;</code> để đảm bảo website load xong trước.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-ocean-teal/10 flex items-center justify-center flex-shrink-0">
                <span className="text-ocean-teal text-sm font-bold">2</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Chatbot sẽ tự động sử dụng các cài đặt đã cấu hình trong Admin (tin nhắn chào mừng, câu hỏi gợi ý...).
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-ocean-teal/10 flex items-center justify-center flex-shrink-0">
                <span className="text-ocean-teal text-sm font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Có thể điều chỉnh <code className="bg-muted px-1 rounded">width</code>, <code className="bg-muted px-1 rounded">height</code>, <code className="bg-muted px-1 rounded">bottom</code>, <code className="bg-muted px-1 rounded">right</code> để thay đổi kích thước và vị trí.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preview Link */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Xem trước widget</h4>
                <p className="text-sm text-muted-foreground">Mở widget trong tab mới để xem trước</p>
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(`${baseUrl}`, "_blank")}
              >
                <ExternalLink className="w-4 h-4" />
                Xem trước
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmbedGuide;
