"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/components/AppShell";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import { Transaction } from "@/types";

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <TransactionsContent />
      </AppShell>
    </ProtectedRoute>
  );
}

function TransactionsContent() {
  const { categories } = useCategories();
  const { transactions, addTransaction, editTransaction, removeTransaction } =
    useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transaction | undefined>(undefined);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "expense" | "saving">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (categoryFilter !== "all" && t.categoryId !== categoryFilter) return false;
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (fromDate && t.date < fromDate) return false;
      if (toDate && t.date > toDate) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          t.categoryName.toLowerCase().includes(q) ||
          (t.note || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [transactions, categoryFilter, typeFilter, fromDate, toDate, search]);

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
          <h1 className="font-display text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-ink/50 dark:text-paper/50">
            {filtered.length} of {transactions.length} shown
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add transaction
        </button>
      </div>

      <div className="card space-y-3 p-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-paper/40"
          />
          <input
            className="input-field pl-9"
            placeholder="Search by category or note"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <select
            className="input-field"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="input-field"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="all">All types</option>
            <option value="expense">Expense</option>
            <option value="saving">Saving</option>
          </select>

          <input
            type="date"
            className="input-field"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            aria-label="From date"
          />
          <input
            type="date"
            className="input-field"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            aria-label="To date"
          />
        </div>
      </div>

      <TransactionList
        transactions={filtered}
        onEdit={openEdit}
        onDelete={removeTransaction}
      />

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
