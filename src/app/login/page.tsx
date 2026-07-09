"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, LoginInput } from "@/lib/schemas";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setServerError("");
    setSubmitting(true);
    try {
      await login(data.email, data.password);
      router.replace("/dashboard");
    } catch (err: any) {
      setServerError(mapAuthError(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Signature ledger panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-forest-800 p-10 text-paper md:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-paper text-forest-800">
            <Wallet size={16} />
          </div>
          <span className="font-display text-lg font-semibold">Ledger</span>
        </div>

        <div>
          <p className="mb-6 font-display text-3xl leading-tight">
            Every rupee, <br /> accounted for.
          </p>
          <LedgerPreview />
        </div>

        <p className="text-xs text-paper/50">
          Income, expenses, and savings — one clear line.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 md:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="mb-1 font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mb-8 text-sm text-ink/60 dark:text-paper/60">
            Sign in to continue to your ledger.
          </p>

          {serverError && (
            <div className="mb-4 flex items-start gap-2 rounded-md border border-clay-400/40 bg-clay-100/60 px-3 py-2.5 text-sm text-clay-600">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label-field">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="error-text">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">
            New here?{" "}
            <Link href="/register" className="font-medium text-forest-700 dark:text-forest-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function LedgerPreview() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-paper/15 bg-paper/5 p-5">
      <div className="ledger-ticks absolute inset-x-0 top-0 h-full text-paper" />
      <div className="relative flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wide text-paper/50">This month</span>
        <span className="font-mono text-sm text-paper/70">₹85,000</span>
      </div>
      <div className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-paper/10">
        <div className="h-full w-[46%] bg-gold-500" />
        <div className="h-full w-[27%] bg-clay-500" style={{ marginTop: "-100%", marginLeft: "46%" }} />
      </div>
      <div className="relative mt-3 flex gap-4 text-xs text-paper/60">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold-500" /> Saved 46%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-clay-500" /> Spent 27%
        </span>
      </div>
    </div>
  );
}

function mapAuthError(code?: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
