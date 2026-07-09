export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7); // "2026-07-02" -> "2026-07"
}

export function getCurrentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export const CATEGORY_COLORS = [
  "#1F4A3D", // forest
  "#C9A24B", // gold
  "#B5533C", // clay
  "#4C7A67", // moss
  "#7A5C8C", // plum
  "#3D6B8C", // steel blue
  "#8C6B3D", // bronze
  "#5C7A3D", // olive
];
