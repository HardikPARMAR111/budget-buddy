"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Category, CategoryType } from "@/types";

export function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "categories"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setCategories(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category)
      );
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const addCategory = async (name: string, type: CategoryType, color: string) => {
    if (!user) return;
    await addDoc(collection(db, "categories"), {
      userId: user.uid,
      name,
      type,
      color,
      createdAt: Date.now(),
    });
  };

  const editCategory = async (
    id: string,
    data: Partial<Pick<Category, "name" | "type" | "color">>
  ) => {
    await updateDoc(doc(db, "categories", id), data);
  };

  const removeCategory = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return { categories, loading, addCategory, editCategory, removeCategory };
}
