import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

import {
  getAdminProducts,
  deleteProduct,
} from "../services/adminProductService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  function handleDelete(product) {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  }

  async function confirmDelete() {
    try {
      await deleteProduct(productToDelete.id);

      toast.success("Product deleted successfully");
      loadProducts();
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete product");
    }
  }
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d80]"
          />

          <input
            type="text"
            placeholder="Search jewelry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-[#e5d7ca] bg-white py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-[#e5d7ca] bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

      </div>
      <ProductTable
        products={filteredProducts}
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
      <DeleteModal
        isOpen={deleteModalOpen}
        productName={productToDelete?.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}

export default Products;