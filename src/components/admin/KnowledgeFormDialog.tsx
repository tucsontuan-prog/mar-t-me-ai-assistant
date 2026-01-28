import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { KnowledgeItem } from "@/services/knowledgeService";

const formSchema = z.object({
  question: z.string().min(5, "Câu hỏi phải có ít nhất 5 ký tự"),
  answer: z.string().min(10, "Câu trả lời phải có ít nhất 10 ký tự"),
  keywords: z.string().min(1, "Nhập ít nhất 1 từ khóa"),
  category: z.string().min(1, "Chọn danh mục"),
});

type FormValues = z.infer<typeof formSchema>;

interface KnowledgeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: KnowledgeItem | null;
  onSave: (item: Omit<KnowledgeItem, "id">) => Promise<void>;
}

export const KnowledgeFormDialog = ({
  open,
  onOpenChange,
  item,
  onSave,
}: KnowledgeFormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!item?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      keywords: "",
      category: "",
    },
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      form.reset({
        question: item.question,
        answer: item.answer,
        keywords: item.keywords.join(", "),
        category: item.category,
      });
    } else {
      form.reset({
        question: "",
        answer: "",
        keywords: "",
        category: "",
      });
    }
  }, [item, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await onSave({
        question: values.question,
        answer: values.answer,
        keywords: values.keywords.split(",").map((k) => k.trim().toLowerCase()),
        category: values.category,
      });
      form.reset();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Chỉnh sửa Knowledge" : "Thêm Knowledge mới"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Cập nhật thông tin câu hỏi và câu trả lời"
              : "Thêm câu hỏi và câu trả lời mới vào knowledge base"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Lịch tàu, Báo giá, Hướng dẫn..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Câu hỏi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập câu hỏi..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Câu trả lời</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập câu trả lời..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Từ khóa (cách nhau bởi dấu phẩy)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: lịch tàu, hải phòng, singapore"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-ocean-teal hover:bg-ocean-teal/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : isEditing ? (
                  "Cập nhật"
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
