import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import CategoryModal from "../components/CategoryModal";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/adminCategoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleSave(categoryData) {
    try {
      if (editingCategory) {
        await updateCategory(
          editingCategory.id,
          categoryData
        );

        toast.success("Category updated.");
      } else {
        await createCategory(categoryData);

        toast.success("Category created.");
      }

      setModalOpen(false);
      setEditingCategory(null);

      loadCategories();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save category.");
    }
  }

  async function handleDelete(category) {
    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteCategory(category.id);

      toast.success("Category deleted.");

      loadCategories();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete category.");
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <Header />

        <div className="space-y-8">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
              Categories
            </p>

            <div className="mt-3 h-12 w-72 animate-pulse rounded-xl bg-[#eee6df]" />

            <div className="mt-3 h-5 w-96 animate-pulse rounded bg-[#f3ede8]" />

          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {[...Array(6)].map((_, index) => (

              <div
                key={index}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >

                <div className="h-7 w-36 animate-pulse rounded bg-[#eee6df]" />

                <div className="mt-4 h-4 animate-pulse rounded bg-[#f3ede8]" />

                <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-[#f3ede8]" />

                <div className="mt-8 h-10 animate-pulse rounded-xl bg-[#eee6df]" />

              </div>

            ))}

          </div>

        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <Header />

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
            Categories
          </p>

          <h1 className="font-serif text-5xl text-[#5a4a42]">
            Product Categories
          </h1>

          <p className="mt-2 text-[#7a6a61]">
            Organize your jewellery collections.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
          className="rounded-xl bg-[#c2a67a] px-5 py-3 text-white transition hover:bg-[#5a4a42]"
        >
          + Add Category
        </button>

      </div>

      {categories.length === 0 ? (

        <div className="rounded-3xl bg-white p-20 text-center shadow-sm">

          <h2 className="font-serif text-3xl text-[#5a4a42]">
            No Categories Yet
          </h2>

          <p className="mt-3 text-[#7a6a61]">
            Create your first category to organize your jewellery.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 rounded-xl bg-[#c2a67a] px-6 py-3 text-white"
          >
            Add Category
          </button>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((category) => (

            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => {
                setEditingCategory(category);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(category)}
            />

          ))}

        </div>

      )}

      <CategoryModal
        open={modalOpen}
        category={editingCategory}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
      />

    </AdminLayout>
  );
}

export default Categories;