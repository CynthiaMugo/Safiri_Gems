import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
  createProduct,
  updateProduct,
} from "../services/adminProductService";

import { getCategories } from "../services/adminCategoryService";

function ProductModal({
  isOpen,
  onClose,
  onSuccess,
  editingProduct,
}) {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
    is_featured: false,
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description || "",
        price: editingProduct.price,
        stock: editingProduct.stock,
        image_url: editingProduct.image_url || "",
        category_id: editingProduct.category_id,
        is_featured: editingProduct.is_featured,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category_id: "",
        is_featured: false,
      });
    }
  }, [editingProduct]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category_id: Number(formData.category_id),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }

      toast.success(
        editingProduct
          ? "Product updated successfully"
          : "Product created successfully"
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        editingProduct
          ? "Unable to update product"
          : "Unable to create product"
      );
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#f8f5f2] p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
              Product
            </p>

            <h2 className="font-serif text-4xl text-[#5a4a42]">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-[#eee6df]"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Product Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
            />
          </div>

          {/* Price + Stock */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
                Price (KSh)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
              />
            </div>
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
              Category
            </label>

            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#5a4a42]">
              Image URL
            </label>

            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-[#e5d7ca] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
            />
          </div>

          {/* Featured */}

          <label className="flex items-center gap-3 rounded-xl border border-[#e5d7ca] bg-white p-4">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="h-5 w-5 accent-[#c2a67a]"
            />

            <span className="text-[#5a4a42]">
              Featured Product
            </span>
          </label>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#c2a67a] px-6 py-3 text-[#5a4a42] transition hover:bg-[#eee6df]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#c2a67a] px-6 py-3 font-medium text-white transition hover:bg-[#5a4a42]"
            >
              {editingProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;