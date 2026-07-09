"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Receipt,
  BarChart3,
  LogOut,
  Wallet,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-canvasdark">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-line-light dark:border-line-dark bg-surface-light dark:bg-surface-dark md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-forest-700 text-paper">
            <Wallet size={16} />
          </div>
          <span className="font-display text-lg font-semibold">Ledger</span>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-forest-700 text-paper"
                    : "text-ink/70 dark:text-paper/70 hover:bg-forest-50 dark:hover:bg-canvasdark"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line-light dark:border-line-dark p-3">
          <div className="mb-2 px-2">
            <p className="truncate text-sm font-medium">{profile?.name || "Account"}</p>
            <p className="truncate text-xs text-ink/50 dark:text-paper/50">
              {profile?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm text-clay-500 hover:bg-clay-100/50 dark:hover:bg-clay-500/10"
            >
              <LogOut size={16} /> Sign out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line-light dark:border-line-dark bg-surface-light/95 dark:bg-surface-dark/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-forest-700 text-paper">
            <Wallet size={14} />
          </div>
          <span className="font-display text-base font-semibold">Ledger</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line-light dark:border-line-dark text-clay-500"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pb-20 md:ml-60 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-line-light dark:border-line-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur md:hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                active ? "text-forest-700 dark:text-forest-300" : "text-ink/50 dark:text-paper/50"
              }`}
            >
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
