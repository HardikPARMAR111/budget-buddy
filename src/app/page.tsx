"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wallet,
  PiggyBank,
  BarChart3,
  Tags,
  Moon,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper dark:bg-canvasdark">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-canvasdark">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-forest-700 text-paper">
            <Wallet size={16} />
          </div>
          <span className="font-display text-lg font-semibold">
            Budget Buddy
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="btn-secondary hidden sm:inline-flex">
            Sign in
          </Link>
          <Link href="/register" className="btn-primary">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-8 text-center md:pb-24 md:pt-16">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-line-light dark:border-line-dark px-4 py-1.5 text-xs font-medium text-ink/60 dark:text-paper/60">
          🎉 Free forever, no bank linking required
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
          Your money, <br />
          <span className="text-forest-600 dark:text-forest-300">
            finally making sense.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink/60 dark:text-paper/60 md:text-lg">
          Budget Buddy is the ridiculously simple way to track income, expenses,
          and savings — no spreadsheets, no guesswork, no judgment about that
          third coffee.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="btn-primary px-6 py-3 text-base">
            Start budgeting free <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn-secondary px-6 py-3 text-base">
            I already have an account
          </Link>
        </div>
      </section>

      {/* Signature preview card */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="card relative overflow-hidden p-6 md:p-8">
          <div className="ledger-ticks absolute inset-x-0 top-0 h-full text-ink dark:text-paper" />
          <div className="relative flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-ink/50 dark:text-paper/50">
              This month
            </span>
            <span className="font-mono text-xl font-semibold">₹85,000</span>
          </div>
          <div className="relative mt-4 flex h-4 w-full overflow-hidden rounded-full bg-forest-50 dark:bg-canvasdark">
            <div className="h-full bg-clay-500" style={{ width: "27%" }} />
            <div className="h-full bg-gold-500" style={{ width: "46%" }} />
            <div
              className="h-full bg-forest-300 dark:bg-forest-600"
              style={{ width: "27%" }}
            />
          </div>
          <div className="relative mt-4 flex flex-wrap gap-5 text-sm text-ink/60 dark:text-paper/60">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-clay-500" /> Spent
              ₹22,950
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gold-500" /> Saved
              ₹39,100
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-forest-300 dark:bg-forest-600" />{" "}
              Remaining ₹22,950
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-center font-display text-2xl font-semibold md:text-3xl">
          Everything you need. Nothing you don't.
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={Tags}
            title="Unlimited categories"
            desc="Rent, tuition, SIPs, whatever — build categories that actually match your life."
          />
          <Feature
            icon={PiggyBank}
            title="Track savings, not just spend"
            desc="Savings get equal billing with expenses, because putting money away deserves credit too."
          />
          <Feature
            icon={BarChart3}
            title="Charts that make sense"
            desc="See where every rupee went with clean breakdowns and month-over-month trends."
          />
          <Feature
            icon={Smartphone}
            title="Works everywhere"
            desc="Full mobile experience with a bottom nav, plus a proper desktop layout when you need it."
          />
          <Feature
            icon={Moon}
            title="Dark mode included"
            desc="Because checking your balance at 2am shouldn't blind you."
          />
          <Feature
            icon={Wallet}
            title="Your data, your account"
            desc="Every entry is locked to your login — nobody else can see a single transaction."
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="card p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold">
            Stop wondering where your money went.
          </h3>
          <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
            Takes less than a minute to set up your first month.
          </p>
          <Link
            href="/register"
            className="btn-primary mt-6 inline-flex px-6 py-3 text-base"
          >
            Create your free account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line-light dark:border-line-dark py-6 text-center text-xs text-ink/40 dark:text-paper/40">
        Budget Buddy — built for people who'd rather budget than guess.
      </footer>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-5">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-forest-50 text-forest-600 dark:bg-forest-700/20 dark:text-forest-300">
        <Icon size={17} />
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">{desc}</p>
    </div>
  );
}
