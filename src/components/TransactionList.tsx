"use client";

import { useState } from "react";
import { Pencil, Trash2, Receipt } from "lucide-react";
import { Transaction } from "@/types";
import { formatCurrency, formatDateShort } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  if (transactions.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-2 p-10 text-center">
        <Receipt size={22} className="text-ink/30 dark:text-paper/30" />
        <p className="text-sm text-ink/50 dark:text-paper/50">
          No transactions match your filters.
        </p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    setPendingDelete(id);
    try {
      await onDelete(id);
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="card divide-y divide-line-light dark:divide-line-dark">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase ${
                tx.type === "saving"
                  ? "bg-gold-100 text-gold-600 dark:bg-gold-500/10"
                  : "bg-clay-100 text-clay-600 dark:bg-clay-500/10"
              }`}
            >
              {tx.categoryName.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{tx.categoryName}</p>
              <p className="truncate text-xs text-ink/50 dark:text-paper/50">
                {formatDateShort(tx.date)}
                {tx.note ? ` · ${tx.note}` : ""}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`font-mono text-sm font-medium ${
                tx.type === "saving" ? "text-gold-600" : "text-clay-600"
              }`}
            >
              {tx.type === "saving" ? "+" : "-"}
              {formatCurrency(tx.amount)}
            </span>
            <button
              onClick={() => onEdit(tx)}
              aria-label="Edit transaction"
              className="flex h-8 w-8 items-center justify-center rounded-md text-ink/50 dark:text-paper/50 hover:bg-forest-50 dark:hover:bg-canvasdark"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => handleDelete(tx.id)}
              disabled={pendingDelete === tx.id}
              aria-label="Delete transaction"
              className="flex h-8 w-8 items-center justify-center rounded-md text-clay-500 hover:bg-clay-100/50 dark:hover:bg-clay-500/10"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
