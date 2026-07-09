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
import { Transaction, CategoryType } from "@/types";

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setTransactions(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Transaction)
      );
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const addTransaction = async (data: {
    categoryId: string;
    categoryName: string;
    type: CategoryType;
    amount: number;
    date: string;
    note?: string;
  }) => {
    if (!user) return;
    await addDoc(collection(db, "transactions"), {
      userId: user.uid,
      ...data,
      createdAt: Date.now(),
    });
  };

  const editTransaction = async (
    id: string,
    data: Partial<
      Pick<Transaction, "categoryId" | "categoryName" | "type" | "amount" | "date" | "note">
    >
  ) => {
    await updateDoc(doc(db, "transactions", id), data);
  };

  const removeTransaction = async (id: string) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return {
    transactions,
    loading,
    addTransaction,
    editTransaction,
    removeTransaction,
  };
}
