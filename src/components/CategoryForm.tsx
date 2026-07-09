"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { categorySchema, CategoryInput } from "@/lib/schemas";
import { CATEGORY_COLORS } from "@/lib/utils";
import { Category } from "@/types";

interface CategoryFormProps {
  initial?: Category;
  onSubmit: (data: CategoryInput) => Promise<void>;
  onClose: () => void;
}

export default function CategoryForm({ initial, onSubmit, onClose }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initial
      ? { name: initial.name, type: initial.type, color: initial.color }
      : { name: "", type: "expense", color: CATEGORY_COLORS[0] },
  });

  const selectedColor = watch("color");

  const submit = async (data: CategoryInput) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg bg-surface-light dark:bg-surface-dark p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            {initial ? "Edit category" : "New category"}
          </h2>
          <button onClick={onClose} className="text-ink/50 dark:text-paper/50">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="label-field">Name</label>
            <input
              className="input-field"
              placeholder="e.g. Rent, SIP, Groceries"
              {...register("name")}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label-field">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(["expense", "saving"] as const).map((type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center justify-center rounded-md border py-2 text-sm font-medium capitalize transition-colors ${
                    watch("type") === type
                      ? "border-forest-600 bg-forest-50 text-forest-700 dark:bg-forest-700/20 dark:text-forest-300"
                      : "border-line-light dark:border-line-dark text-ink/60 dark:text-paper/60"
                  }`}
                >
                  <input type="radio" value={type} className="hidden" {...register("type")} />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="label-field">Color</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setValue("color", color)}
                  className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark ${
                    selectedColor === color ? "ring-2 ring-ink dark:ring-paper" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Choose color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? "Saving…" : initial ? "Save changes" : "Add category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
