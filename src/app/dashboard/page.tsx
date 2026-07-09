"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/components/AppShell";
import LedgerBar from "@/components/LedgerBar";
import SummaryCards from "@/components/SummaryCards";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import { getCurrentMonthKey, getMonthKey, formatMonthLabel } from "@/lib/utils";
import { Transaction } from "@/types";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <DashboardContent />
      </AppShell>
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { profile } = useAuth();
  const { categories } = useCategories();
  const { transactions, addTransaction, editTransaction, removeTransaction } =
    useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | undefined>(undefined);

  const currentMonth = getCurrentMonthKey();
  const income = profile?.monthlyIncome || 0;

  const monthTx = useMemo(
    () => transactions.filter((t) => getMonthKey(t.date) === currentMonth),
    [transactions, currentMonth]
  );

  const totalExpense = monthTx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSaving = monthTx
    .filter((t) => t.type === "saving")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - totalExpense - totalSaving;

  const recent = transactions.slice(0, 5);

  const openAdd = () => {
    setEditing(undefined);
    setShowForm(true);
  };
  const openEdit = (tx: Transaction) => {
    setEditing(tx);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Hi, {profile?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm text-ink/50 dark:text-paper/50">
            {formatMonthLabel(currentMonth)} overview
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add transaction
        </button>
      </div>

      <LedgerBar income={income} totalExpense={totalExpense} totalSaving={totalSaving} />

      <SummaryCards
        income={income}
        totalExpense={totalExpense}
        totalSaving={totalSaving}
        balance={balance}
      />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent transactions</h2>
        </div>
        <TransactionList
          transactions={recent}
          onEdit={openEdit}
          onDelete={removeTransaction}
        />
      </div>

      {showForm && (
        <TransactionForm
          categories={categories}
          initial={editing}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            if (editing) {
              await editTransaction(editing.id, data);
            } else {
              await addTransaction(data);
            }
          }}
        />
      )}
    </div>
  );
}
