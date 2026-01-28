import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  getAllKnowledge,
  addKnowledge,
  updateKnowledge,
  deleteKnowledge,
  KnowledgeItem,
} from "@/services/knowledgeService";
import { KnowledgeFormDialog } from "@/components/admin/KnowledgeFormDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
  Database,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch knowledge data
  const fetchKnowledge = async () => {
    setIsLoading(true);
    try {
      const data = await getAllKnowledge();
      setKnowledge(data);
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchKnowledge();
    }
  }, [user]);

  // Filter knowledge by search query
  const filteredKnowledge = knowledge.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Handlers
  const handleAdd = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const handleDeleteClick = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleSave = async (item: Omit<KnowledgeItem, "id">) => {
    try {
      if (selectedItem?.id) {
        await updateKnowledge(selectedItem.id, item);
        toast.success("Đã cập nhật thành công");
      } else {
        await addKnowledge(item);
        toast.success("Đã thêm mới thành công");
      }
      fetchKnowledge();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedItem?.id) return;
    try {
      await deleteKnowledge(selectedItem.id);
      toast.success("Đã xóa thành công");
      fetchKnowledge();
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa");
    } finally {
      setDeleteOpen(false);
      setSelectedItem(null);
    }
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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Quản lý Knowledge Base
              </h1>
              <p className="text-muted-foreground">
                Thêm, sửa, xóa dữ liệu câu hỏi và trả lời
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={fetchKnowledge}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button onClick={handleAdd} className="bg-ocean-teal hover:bg-ocean-teal/90">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        {/* Main content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-ocean-teal" />
                <CardTitle>Danh sách Knowledge</CardTitle>
              </div>
              <CardDescription>
                Tổng: {filteredKnowledge.length} mục
              </CardDescription>
            </div>
            {/* Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo câu hỏi, danh mục, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-ocean-teal" />
              </div>
            ) : filteredKnowledge.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có dữ liệu nào</p>
                <Button variant="link" onClick={handleAdd}>
                  Thêm mới ngay
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Danh mục</TableHead>
                      <TableHead>Câu hỏi</TableHead>
                      <TableHead className="w-[200px]">Từ khóa</TableHead>
                      <TableHead className="w-[100px] text-right">
                        Thao tác
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKnowledge.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Badge variant="secondary">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium line-clamp-1">
                              {item.question}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.answer}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.keywords.slice(0, 3).map((keyword, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-0.5 rounded-full bg-ocean-foam text-ocean-teal"
                              >
                                {keyword}
                              </span>
                            ))}
                            {item.keywords.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{item.keywords.length - 3}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(item)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(item)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <KnowledgeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        item={selectedItem}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Xóa Knowledge"
        description={`Bạn có chắc chắn muốn xóa "${selectedItem?.question}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
};

export default Admin;
