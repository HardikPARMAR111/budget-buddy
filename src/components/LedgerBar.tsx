"use client";

import { formatCurrency } from "@/lib/utils";

interface LedgerBarProps {
  income: number;
  totalExpense: number;
  totalSaving: number;
}

export default function LedgerBar({ income, totalExpense, totalSaving }: LedgerBarProps) {
  const safeIncome = income > 0 ? income : 1;
  const expensePct = Math.min((totalExpense / safeIncome) * 100, 100);
  const savingPct = Math.min((totalSaving / safeIncome) * 100, 100 - expensePct);
  const remaining = income - totalExpense - totalSaving;
  const remainingPct = Math.max(100 - expensePct - savingPct, 0);

  return (
    <div className="card relative overflow-hidden p-5 md:p-6">
      <div className="ledger-ticks absolute inset-x-0 top-0 h-full text-ink dark:text-paper" />
      <div className="relative flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50 dark:text-paper/50">
          Monthly income
        </span>
        <span className="font-mono text-lg font-medium">{formatCurrency(income)}</span>
      </div>

      <div className="relative mt-4 flex h-4 w-full overflow-hidden rounded-full bg-forest-50 dark:bg-canvasdark">
        <div
          className="h-full bg-clay-500 transition-all duration-700"
          style={{ width: `${expensePct}%` }}
        />
        <div
          className="h-full bg-gold-500 transition-all duration-700"
          style={{ width: `${savingPct}%` }}
        />
        <div
          className="h-full bg-forest-300 dark:bg-forest-600 transition-all duration-700"
          style={{ width: `${remainingPct}%` }}
        />
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-3 text-sm">
        <Legend color="bg-clay-500" label="Spent" value={totalExpense} />
        <Legend color="bg-gold-500" label="Saved" value={totalSaving} />
        <Legend
          color="bg-forest-300 dark:bg-forest-600"
          label="Remaining"
          value={remaining}
        />
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />
      <div>
        <p className="text-xs text-ink/50 dark:text-paper/50">{label}</p>
        <p className="font-mono text-sm font-medium">{formatCurrency(value)}</p>
      </div>
    </div>
  );
}
