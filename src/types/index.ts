export type CategoryType = "expense" | "saving";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  monthlyIncome: number;
  createdAt: number;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: CategoryType;
  color: string;
  createdAt: number;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  type: CategoryType;
  amount: number;
  date: string; // ISO date string, e.g. 2026-07-02
  note?: string;
  createdAt: number;
}

export interface MonthlySummary {
  month: string; // "2026-07"
  income: number;
  totalExpense: number;
  totalSaving: number;
  balance: number;
}
