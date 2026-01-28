import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";

export interface KnowledgeItem {
  id?: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

// Get all knowledge items
export const getAllKnowledge = async (): Promise<KnowledgeItem[]> => {
  try {
    const q = query(collection(db, "knowledge_base"), orderBy("category"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as KnowledgeItem[];
  } catch (error) {
    console.error("Error fetching knowledge:", error);
    return [];
  }
};

// Add new knowledge item
export const addKnowledge = async (
  item: Omit<KnowledgeItem, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "knowledge_base"), item);
  return docRef.id;
};

// Update knowledge item
export const updateKnowledge = async (
  id: string,
  item: Omit<KnowledgeItem, "id">
): Promise<void> => {
  const docRef = doc(db, "knowledge_base", id);
  await updateDoc(docRef, item);
};

// Delete knowledge item
export const deleteKnowledge = async (id: string): Promise<void> => {
  const docRef = doc(db, "knowledge_base", id);
  await deleteDoc(docRef);
};
