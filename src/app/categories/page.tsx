"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/components/AppShell";
import CategoryList from "@/components/CategoryList";
import CategoryForm from "@/components/CategoryForm";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types";

export default function CategoriesPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <CategoriesContent />
      </AppShell>
    </ProtectedRoute>
  );
}

function CategoriesContent() {
  const { categories, addCategory, editCategory, removeCategory } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | undefined>(undefined);

  const openAdd = () => {
    setEditing(undefined);
    setShowForm(true);
  };
  const openEdit = (cat: Category) => {
    setEditing(cat);
    setShowForm(true);
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");
  const savingCategories = categories.filter((c) => c.type === "saving");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-ink/50 dark:text-paper/50">
            Organize expenses and savings into categories you control.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> New category
        </button>
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold">Expenses</h2>
        <CategoryList
          categories={expenseCategories}
          onEdit={openEdit}
          onDelete={removeCategory}
        />
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold">Savings</h2>
        <CategoryList
          categories={savingCategories}
          onEdit={openEdit}
          onDelete={removeCategory}
        />
      </div>

      {showForm && (
        <CategoryForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            if (editing) {
              await editCategory(editing.id, data);
            } else {
              await addCategory(data.name, data.type, data.color);
            }
          }}
        />
      )}
    </div>
  );
}
