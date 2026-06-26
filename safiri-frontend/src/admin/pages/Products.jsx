import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import { getProducts } from "../../services/productService";

function Products() {
  const [products, setProducts] =useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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

        <button className="rounded-xl bg-[#c2a67a] px-6 py-3 text-white transition hover:bg-[#5a4a42]">
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
      />
    </AdminLayout>
  );
}

export default Products;