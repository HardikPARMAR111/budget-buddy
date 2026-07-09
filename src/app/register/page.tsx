"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { registerSchema, RegisterInput } from "@/lib/schemas";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { monthlyIncome: 0 },
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");
    setSubmitting(true);
    try {
      await registerUser(data.name, data.email, data.password, data.monthlyIncome);
      router.replace("/dashboard");
    } catch (err: any) {
      setServerError(mapAuthError(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-forest-700 text-paper">
            <Wallet size={16} />
          </div>
          <span className="font-display text-lg font-semibold">Ledger</span>
        </div>

        <h1 className="mb-1 font-display text-2xl font-semibold">Create your account</h1>
        <p className="mb-8 text-sm text-ink/60 dark:text-paper/60">
          Set your monthly income to get started — you can change it anytime.
        </p>

        {serverError && (
          <div className="mb-4 flex items-start gap-2 rounded-md border border-clay-400/40 bg-clay-100/60 px-3 py-2.5 text-sm text-clay-600">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label-field">Full name</label>
            <input className="input-field" placeholder="Priya Sharma" {...register("name")} />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
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
            <label className="label-field">Monthly income (₹)</label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              placeholder="50000"
              {...register("monthlyIncome", { valueAsNumber: true })}
            />
            {errors.monthlyIncome && (
              <p className="error-text">{errors.monthlyIncome.message}</p>
            )}
          </div>
          <div>
            <label className="label-field">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="At least 6 characters"
              {...register("password")}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>
          <div>
            <label className="label-field">Confirm password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-forest-700 dark:text-forest-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function mapAuthError(code?: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    default:
      return "Something went wrong. Please try again.";
  }
}
