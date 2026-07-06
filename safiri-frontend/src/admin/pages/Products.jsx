import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

import {
  getAdminProducts,
  deleteProduct,
} from "../services/adminProductService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
}

  useEffect(() => {
    loadProducts();
  }, []);

  function handleAddProduct() {
    setEditingProduct(null);
    setModalOpen(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setModalOpen(true);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  }

  return (
    <AdminLayout>
      <Header />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
            Products
          </p>

          <h1 className="font-serif text-5xl text-[#5a4a42]">
            Jewelry Collection
          </h1>

          <p className="mt-2 text-[#7a6a61]">
            Manage all products available in your store.
          </p>
        </div>

        <button
          onClick={handleAddProduct}
          className="rounded-xl bg-[#c2a67a] px-6 py-3 text-white transition hover:bg-[#5a4a42]"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={loadProducts}
        editingProduct={editingProduct}
      />
    </AdminLayout>
  );
}

export default Products;