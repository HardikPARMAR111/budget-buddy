import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    monthlyIncome: z
      .number({ invalid_type_error: "Enter a number" })
      .min(0, "Income can't be negative"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(40),
  type: z.enum(["expense", "saving"]),
  color: z.string().min(1),
});
export type CategoryInput = z.infer<typeof categorySchema>;

export const transactionSchema = z.object({
  categoryId: z.string().min(1, "Select a category"),
  amount: z
    .number({ invalid_type_error: "Enter an amount" })
    .positive("Amount must be greater than 0"),
  date: z.string().min(1, "Select a date"),
  note: z.string().max(200).optional(),
});
export type TransactionInput = z.infer<typeof transactionSchema>;

export const incomeSchema = z.object({
  monthlyIncome: z
    .number({ invalid_type_error: "Enter a number" })
    .min(0, "Income can't be negative"),
});
export type IncomeInput = z.infer<typeof incomeSchema>;
