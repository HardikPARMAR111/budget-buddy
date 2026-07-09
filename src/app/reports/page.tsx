"use client";

import { useMemo, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/components/AppShell";
import CategoryBreakdownChart from "@/components/charts/CategoryBreakdownChart";
import TrendChart from "@/components/charts/TrendChart";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";
import {
  getMonthKey,
  getCurrentMonthKey,
  formatMonthLabel,
  formatCurrency,
} from "@/lib/utils";

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <ReportsContent />
      </AppShell>
    </ProtectedRoute>
  );
}

function ReportsContent() {
  const { profile } = useAuth();
  const { categories } = useCategories();
  const { transactions } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());

  const availableMonths = useMemo(() => {
    const set = new Set(transactions.map((t) => getMonthKey(t.date)));
    set.add(getCurrentMonthKey());
    return Array.from(set).sort().reverse();
  }, [transactions]);

  const monthTx = useMemo(
    () => transactions.filter((t) => getMonthKey(t.date) === selectedMonth),
    [transactions, selectedMonth]
  );

  const expenseByCategory = useMemo(() => {
    const map = new Map<string, { name: string; value: number; color: string }>();
    monthTx
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const cat = categories.find((c) => c.id === t.categoryId);
        const key = t.categoryId;
        const existing = map.get(key);
        if (existing) {
          existing.value += t.amount;
        } else {
          map.set(key, {
            name: t.categoryName,
            value: t.amount,
            color: cat?.color || "#B5533C",
          });
        }
      });
    return Array.from(map.values());
  }, [monthTx, categories]);

  const savingByCategory = useMemo(() => {
    const map = new Map<string, { name: string; value: number; color: string }>();
    monthTx
      .filter((t) => t.type === "saving")
      .forEach((t) => {
        const cat = categories.find((c) => c.id === t.categoryId);
        const key = t.categoryId;
        const existing = map.get(key);
        if (existing) {
          existing.value += t.amount;
        } else {
          map.set(key, {
            name: t.categoryName,
            value: t.amount,
            color: cat?.color || "#C9A24B",
          });
        }
      });
    return Array.from(map.values());
  }, [monthTx, categories]);

  const trendData = useMemo(() => {
    const last6 = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      return d.toISOString().slice(0, 7);
    });
    return last6.map((month) => {
      const tx = transactions.filter((t) => getMonthKey(t.date) === month);
      return {
        month: formatMonthLabel(month).split(" ")[0].slice(0, 3),
        expense: tx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
        saving: tx.filter((t) => t.type === "saving").reduce((s, t) => s + t.amount, 0),
      };
    });
  }, [transactions]);

  const monthlySummaries = useMemo(() => {
    return availableMonths.map((month) => {
      const tx = transactions.filter((t) => getMonthKey(t.date) === month);
      const totalExpense = tx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
      const totalSaving = tx.filter((t) => t.type === "saving").reduce((s, t) => s + t.amount, 0);
      const income = profile?.monthlyIncome || 0;
      return {
        month,
        income,
        totalExpense,
        totalSaving,
        balance: income - totalExpense - totalSaving,
      };
    });
  }, [availableMonths, transactions, profile]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Reports</h1>
          <p className="text-sm text-ink/50 dark:text-paper/50">
            Visualize spending and savings patterns over time.
          </p>
        </div>
        <select
          className="input-field w-auto"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {availableMonths.map((m) => (
            <option key={m} value={m}>
              {formatMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-display text-base font-semibold">
            Spending by category — {formatMonthLabel(selectedMonth)}
          </h2>
          <CategoryBreakdownChart data={expenseByCategory} />
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-display text-base font-semibold">
            Savings by category — {formatMonthLabel(selectedMonth)}
          </h2>
          <CategoryBreakdownChart data={savingByCategory} />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="mb-3 font-display text-base font-semibold">Last 6 months</h2>
        <TrendChart data={trendData} />
      </div>

      <div className="card overflow-x-auto p-5">
        <h2 className="mb-3 font-display text-base font-semibold">Monthly summaries</h2>
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-line-light dark:border-line-dark text-left text-xs uppercase tracking-wide text-ink/50 dark:text-paper/50">
              <th className="py-2 pr-4">Month</th>
              <th className="py-2 pr-4">Income</th>
              <th className="py-2 pr-4">Expenses</th>
              <th className="py-2 pr-4">Savings</th>
              <th className="py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummaries.map((s) => (
              <tr key={s.month} className="border-b border-line-light dark:border-line-dark last:border-0">
                <td className="py-2.5 pr-4 font-medium">{formatMonthLabel(s.month)}</td>
                <td className="py-2.5 pr-4 font-mono">{formatCurrency(s.income)}</td>
                <td className="py-2.5 pr-4 font-mono text-clay-600">{formatCurrency(s.totalExpense)}</td>
                <td className="py-2.5 pr-4 font-mono text-gold-600">{formatCurrency(s.totalSaving)}</td>
                <td className="py-2.5 font-mono">{formatCurrency(s.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
