"use client";

import { useState } from "react";
import { Pencil, Trash2, Tag } from "lucide-react";
import { Category } from "@/types";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  if (categories.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center gap-2 p-10 text-center">
        <Tag size={22} className="text-ink/30 dark:text-paper/30" />
        <p className="text-sm text-ink/50 dark:text-paper/50">
          No categories yet. Add your first one to start tracking.
        </p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    setPendingDelete(id);
    try {
      await onDelete(id);
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <div key={cat.id} className="card flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full" style={{ backgroundColor: cat.color }} />
            <div>
              <p className="text-sm font-medium">{cat.name}</p>
              <p className="text-xs capitalize text-ink/50 dark:text-paper/50">{cat.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(cat)}
              aria-label="Edit category"
              className="flex h-8 w-8 items-center justify-center rounded-md text-ink/50 dark:text-paper/50 hover:bg-forest-50 dark:hover:bg-canvasdark"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              disabled={pendingDelete === cat.id}
              aria-label="Delete category"
              className="flex h-8 w-8 items-center justify-center rounded-md text-clay-500 hover:bg-clay-100/50 dark:hover:bg-clay-500/10"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
