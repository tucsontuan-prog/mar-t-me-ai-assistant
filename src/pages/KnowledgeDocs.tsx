import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  getKnowledgeDocuments,
  saveKnowledgeDocument,
  KnowledgeDocument,
} from "@/services/knowledgeDocService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  FileText,
  Plus,
  Save,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const KnowledgeDocs = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch documents
  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await getKnowledgeDocuments();
      setDocuments(docs);
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  // Select a document to edit
  const handleSelectDoc = (doc: KnowledgeDocument) => {
    setSelectedDoc(doc.id);
    setTitle(doc.title);
    setCategory(doc.category);
    setContent(doc.content);
  };

  // Create new document
  const handleNewDoc = () => {
    setSelectedDoc(null);
    setTitle("");
    setCategory("");
    setContent("");
  };

  // Save document
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung");
      return;
    }

    setIsSaving(true);
    try {
      const docId = selectedDoc || `doc_${Date.now()}`;
      await saveKnowledgeDocument(docId, {
        title: title.trim(),
        category: category.trim() || "Chung",
        content: content.trim(),
      });
      toast.success(selectedDoc ? "Đã cập nhật" : "Đã thêm mới");
      fetchDocuments();
      if (!selectedDoc) {
        setSelectedDoc(docId);
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể lưu");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".txt")) {
      toast.error("Chỉ hỗ trợ file .txt");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
      if (!title) {
        setTitle(file.name.replace(".txt", ""));
      }
      toast.success("Đã tải file thành công");
    };
    reader.readAsText(file);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ocean-teal" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Quản lý Tài liệu Knowledge
            </h1>
            <p className="text-muted-foreground">
              Thêm văn bản dài làm context cho chatbot
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document list */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Danh sách tài liệu</CardTitle>
                <Button size="sm" onClick={handleNewDoc}>
                  <Plus className="w-4 h-4 mr-1" />
                  Mới
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-ocean-teal" />
                </div>
              ) : documents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Chưa có tài liệu nào
                </p>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => handleSelectDoc(doc)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedDoc === doc.id
                            ? "border-ocean-teal bg-ocean-foam"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 mt-1 text-ocean-teal" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.category} • {Math.round(doc.content.length / 1000)}k ký tự
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedDoc ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
              </CardTitle>
              <CardDescription>
                Nội dung sẽ được gửi làm context cho Gemini khi trả lời câu hỏi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Lịch sử hình thành Hải An"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="VD: Giới thiệu công ty"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Nội dung</Label>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-1 text-sm text-ocean-teal hover:underline">
                      <Upload className="w-4 h-4" />
                      Tải từ file .txt
                    </span>
                  </label>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste hoặc nhập nội dung tài liệu..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {content.length.toLocaleString()} ký tự
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-ocean-teal hover:bg-ocean-teal/90"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Lưu tài liệu
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDocs;
