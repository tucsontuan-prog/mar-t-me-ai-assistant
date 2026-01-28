import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seedKnowledgeBase, sampleKnowledgeData } from "@/services/seedData";
import { Database, Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const SeedData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSeed = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập trước");
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await seedKnowledgeBase();
      setResult({ success: res.success, message: res.message });
      
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.info(res.message);
      }
    } catch (error: any) {
      setResult({ success: false, message: error.message });
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Seed Data</h1>
            <p className="text-muted-foreground">Thêm dữ liệu mẫu vào Firestore</p>
          </div>
        </div>

        {/* Seed action card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-ocean-teal" />
              Knowledge Base
            </CardTitle>
            <CardDescription>
              Thêm {sampleKnowledgeData.length} mục dữ liệu mẫu về vận tải biển vào Firestore
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleSeed}
              disabled={isLoading}
              className="w-full bg-ocean-teal hover:bg-ocean-teal/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang thêm dữ liệu...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Thêm dữ liệu mẫu
                </>
              )}
            </Button>

            {result && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  result.success
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{result.message}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview data */}
        <Card>
          <CardHeader>
            <CardTitle>Xem trước dữ liệu mẫu</CardTitle>
            <CardDescription>
              Các câu hỏi và câu trả lời sẽ được thêm vào knowledge_base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {sampleKnowledgeData.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">
                      {item.question}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.answer}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-ocean-foam text-ocean-teal"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeedData;
