"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { transactionSchema, TransactionInput } from "@/lib/schemas";
import { Category, Transaction } from "@/types";

interface TransactionFormProps {
  categories: Category[];
  initial?: Transaction;
  onSubmit: (data: TransactionInput & { categoryName: string; type: "expense" | "saving" }) => Promise<void>;
  onClose: () => void;
}

export default function TransactionForm({
  categories,
  initial,
  onSubmit,
  onClose,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initial
      ? {
          categoryId: initial.categoryId,
          amount: initial.amount,
          date: initial.date,
          note: initial.note || "",
        }
      : {
          categoryId: categories[0]?.id || "",
          amount: undefined as unknown as number,
          date: new Date().toISOString().slice(0, 10),
          note: "",
        },
  });

  const submit = async (data: TransactionInput) => {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) return;
    await onSubmit({ ...data, categoryName: category.name, type: category.type });
    onClose();
  };

  if (categories.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-lg bg-surface-light dark:bg-surface-dark p-5 text-center shadow-xl">
          <p className="mb-4 text-sm text-ink/70 dark:text-paper/70">
            Create a category first before logging a transaction.
          </p>
          <button onClick={onClose} className="btn-secondary w-full">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg bg-surface-light dark:bg-surface-dark p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {initial ? "Edit transaction" : "New transaction"}
          </h2>
          <button onClick={onClose} className="text-ink/50 dark:text-paper/50">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="label-field">Category</label>
            <select className="input-field" {...register("categoryId")}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="error-text">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="label-field">Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && <p className="error-text">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="label-field">Date</label>
            <input type="date" className="input-field" {...register("date")} />
            {errors.date && <p className="error-text">{errors.date.message}</p>}
          </div>

          <div>
            <label className="label-field">Note (optional)</label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Add a short note"
              {...register("note")}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? "Saving…" : initial ? "Save changes" : "Add transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
