import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const isNewProduct = searchParams.get("new") === "true";
  useEffect(() => {
    if (isNewProduct) {
      setEditingProduct(null);
      setModalOpen(true);

      setSearchParams({}); // clean URL after trigger
    }
  }, [isNewProduct]);
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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

      await loadProducts();

      setDeleteModalOpen(false);
      setProductToDelete(null);

      // keep user on valid page
      setCurrentPage((p) => p);
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
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        products={paginatedProducts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg border px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-1 ${
                currentPage === page
                  ? "bg-[#c2a67a] text-white"
                  : "border"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

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