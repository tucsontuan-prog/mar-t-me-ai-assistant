import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";

export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all knowledge documents (full-text)
export const getKnowledgeDocuments = async (): Promise<KnowledgeDocument[]> => {
  try {
    const q = query(collection(db, "knowledge_documents"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as KnowledgeDocument[];
  } catch (error) {
    console.error("Error fetching knowledge documents:", error);
    return [];
  }
};

// Get a specific knowledge document
export const getKnowledgeDocument = async (
  docId: string
): Promise<KnowledgeDocument | null> => {
  try {
    const docRef = doc(db, "knowledge_documents", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as KnowledgeDocument;
    }
    return null;
  } catch (error) {
    console.error("Error fetching knowledge document:", error);
    return null;
  }
};

// Save or update a knowledge document
export const saveKnowledgeDocument = async (
  docId: string,
  data: Omit<KnowledgeDocument, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  const docRef = doc(db, "knowledge_documents", docId);
  const existingDoc = await getDoc(docRef);
  
  if (existingDoc.exists()) {
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date(),
      createdAt: existingDoc.data().createdAt,
    });
  } else {
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

// Build context string from all knowledge documents
export const buildKnowledgeContext = async (): Promise<string> => {
  const documents = await getKnowledgeDocuments();
  
  if (documents.length === 0) {
    return "Chưa có dữ liệu knowledge base.";
  }

  return documents
    .map((doc) => `=== ${doc.title} ===\n${doc.content}`)
    .join("\n\n");
};
