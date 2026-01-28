import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export interface KnowledgeItem {
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

export const sampleKnowledgeData: KnowledgeItem[] = [
  {
    question: "Lịch tàu từ Hải Phòng đi Singapore như thế nào?",
    answer: "Tàu từ Hải Phòng đi Singapore khởi hành vào thứ 2 và thứ 5 hàng tuần. Thời gian vận chuyển khoảng 5-7 ngày tùy theo tuyến. Các hãng tàu chính: COSCO, Evergreen, Yang Ming.",
    keywords: ["lịch tàu", "hải phòng", "singapore", "khởi hành"],
    category: "Lịch tàu",
  },
  {
    question: "Làm thế nào để tra cứu container?",
    answer: "Để tra cứu container, bạn cần cung cấp số container (VD: MSCU1234567) hoặc số Bill of Lading. Truy cập mục 'Tracking' trên website hoặc liên hệ hotline 1900-xxxx để được hỗ trợ.",
    keywords: ["tra cứu", "container", "tracking", "bill of lading", "theo dõi"],
    category: "Tracking",
  },
  {
    question: "Cước vận chuyển từ Việt Nam đi Mỹ bao nhiêu?",
    answer: "Cước vận chuyển từ Việt Nam đi Mỹ (West Coast) dao động từ $2,500 - $4,000/container 20ft và $4,500 - $7,000/container 40ft, tùy thuộc vào hãng tàu và thời điểm. Liên hệ sales@company.com để nhận báo giá chi tiết.",
    keywords: ["cước", "giá", "vận chuyển", "mỹ", "usa", "container", "báo giá"],
    category: "Báo giá",
  },
  {
    question: "Thời gian vận chuyển từ Việt Nam đi Châu Âu mất bao lâu?",
    answer: "Thời gian vận chuyển từ Việt Nam đi Châu Âu (các cảng chính như Rotterdam, Hamburg, Antwerp) mất khoảng 25-35 ngày tùy tuyến. Tàu thường transit qua Singapore hoặc Port Klang.",
    keywords: ["thời gian", "châu âu", "rotterdam", "hamburg", "vận chuyển"],
    category: "Lịch tàu",
  },
  {
    question: "Quy trình xuất khẩu hàng hóa như thế nào?",
    answer: "Quy trình xuất khẩu: 1) Đặt booking với hãng tàu, 2) Nhận container rỗng, 3) Đóng hàng và niêm seal, 4) Làm thủ tục hải quan, 5) Vận chuyển container đến cảng, 6) Tàu khởi hành. Liên hệ bộ phận chứng từ để được hỗ trợ.",
    keywords: ["quy trình", "xuất khẩu", "thủ tục", "hải quan", "booking"],
    category: "Hướng dẫn",
  },
  {
    question: "Các loại container phổ biến là gì?",
    answer: "Các loại container phổ biến: 1) Container 20ft (20GP) - 33 CBM, 2) Container 40ft (40GP) - 67 CBM, 3) Container 40ft High Cube (40HC) - 76 CBM, 4) Container lạnh (Reefer) cho hàng đông lạnh, 5) Open Top cho hàng quá khổ.",
    keywords: ["container", "20ft", "40ft", "loại", "kích thước", "high cube", "reefer"],
    category: "Kiến thức",
  },
  {
    question: "Liên hệ hỗ trợ khách hàng như thế nào?",
    answer: "Bạn có thể liên hệ hỗ trợ qua: Hotline 24/7: 1900-xxxx, Email: support@company.com, Zalo: 0909-xxx-xxx. Giờ làm việc: Thứ 2 - Thứ 6 (8:00 - 17:30), Thứ 7 (8:00 - 12:00).",
    keywords: ["liên hệ", "hỗ trợ", "hotline", "email", "điện thoại"],
    category: "Hỗ trợ",
  },
  {
    question: "Chính sách bảo hiểm hàng hóa như thế nào?",
    answer: "Chúng tôi cung cấp bảo hiểm hàng hóa với mức phí từ 0.1% - 0.3% giá trị hàng. Bảo hiểm bao gồm: hư hỏng do va đập, ngập nước, mất cắp. Liên hệ bộ phận bảo hiểm để được tư vấn chi tiết.",
    keywords: ["bảo hiểm", "hàng hóa", "insurance", "phí"],
    category: "Dịch vụ",
  },
];

export const seedKnowledgeBase = async (): Promise<{ success: boolean; count: number; message: string }> => {
  try {
    // Check if data already exists
    const existingData = await getDocs(query(collection(db, "knowledge_base")));
    if (!existingData.empty) {
      return {
        success: false,
        count: existingData.size,
        message: `Đã có ${existingData.size} mục trong knowledge_base. Không cần thêm dữ liệu mẫu.`,
      };
    }

    // Add sample data
    let count = 0;
    for (const item of sampleKnowledgeData) {
      await addDoc(collection(db, "knowledge_base"), item);
      count++;
    }

    return {
      success: true,
      count,
      message: `Đã thêm ${count} mục dữ liệu mẫu vào knowledge_base thành công!`,
    };
  } catch (error: any) {
    console.error("Error seeding knowledge base:", error);
    return {
      success: false,
      count: 0,
      message: `Lỗi: ${error.message}. Hãy kiểm tra Firestore rules cho phép write.`,
    };
  }
};
