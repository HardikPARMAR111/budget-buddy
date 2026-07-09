"use client";

import { TrendingDown, PiggyBank, Wallet2, Landmark } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  income: number;
  totalExpense: number;
  totalSaving: number;
  balance: number;
}

export default function SummaryCards({
  income,
  totalExpense,
  totalSaving,
  balance,
}: SummaryCardsProps) {
  const cards = [
    { label: "Income", value: income, icon: Landmark, accent: "text-forest-600 bg-forest-50 dark:bg-forest-700/20" },
    { label: "Expenses", value: totalExpense, icon: TrendingDown, accent: "text-clay-600 bg-clay-100/60 dark:bg-clay-500/10" },
    { label: "Savings", value: totalSaving, icon: PiggyBank, accent: "text-gold-600 bg-gold-100/60 dark:bg-gold-500/10" },
    { label: "Balance", value: balance, icon: Wallet2, accent: "text-forest-600 bg-forest-50 dark:bg-forest-700/20" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {cards.map(({ label, value, icon: Icon, accent }) => (
        <div key={label} className="card p-4">
          <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md ${accent}`}>
            <Icon size={16} />
          </div>
          <p className="text-xs text-ink/50 dark:text-paper/50">{label}</p>
          <p className="mt-0.5 font-mono text-lg font-semibold tabular-nums">
            {formatCurrency(value)}
          </p>
        </div>
      ))}
    </div>
  );
}
