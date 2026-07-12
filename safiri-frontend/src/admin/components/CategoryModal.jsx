import { useEffect, useState } from "react";

function CategoryModal({
  open,
  onClose,
  onSave,
  category,
}) {

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {

    if (category) {

      setForm({
        name: category.name,
        description: category.description || "",
      });

    } else {

      setForm({
        name: "",
        description: "",
      });

    }

  }, [category]);

  if (!open) return null;

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(form);
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="font-serif text-3xl text-[#5a4a42]">

          {category
            ? "Edit Category"
            : "New Category"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#e8ddd4] px-4 py-3 outline-none focus:border-[#c2a67a]"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#e8ddd4] px-4 py-3 outline-none focus:border-[#c2a67a]"
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#d9c8b7] px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#c2a67a] px-6 py-3 text-white hover:bg-[#5a4a42]"
            >
              {category ? "Save Changes" : "Create Category"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default CategoryModal;