import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
// import { products } from "../data/products";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

import { useCart } from "../context/CartContext";
// import { useEffect } from "react";
import PageTransition from "../components/PageTransition";
import Loader from "../components/Loader";
import { Search } from "lucide-react";


function Shop() {

  const { cartCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  

  const selectedCategory = searchParams.get("category");
  // seo - update title based on category filter
  useEffect(() => {
    document.title = selectedCategory
      ? `${selectedCategory} Collection | Safiri Gems`
      : "Shop Earrings, Necklaces & Sets | Safiri Gems";
  }, [selectedCategory]);
  if (loading) {
    return (
      <Loader />
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function clearFilter() {
    setSearchParams({});
    setSearchTerm("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <section className="px-4 py-4 text-center bg-[#eee6df]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#c2a67a] mb-3">
          Shop Safiri Gems
        </p>

        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          {selectedCategory
            ? `${selectedCategory} Collection`
            : "Find Your Signature Piece"}
        </h1>

        <p className="max-w-2xl mx-auto text-[#7a6a61]">
          {selectedCategory
            ? `Explore Safiri Gems ${selectedCategory.toLowerCase()} selected for everyday elegance.`
            : "Browse pearl-inspired earrings, necklaces, and elegant sets made for everyday softness and special moments."}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {selectedCategory && (
            <button
              onClick={clearFilter}
              className="rounded-full border border-[#c2a67a] px-7 py-3 text-sm font-medium transition hover:bg-[#c2a67a] hover:text-white"
            >
              View All Products
            </button>
          )}

          {cartCount > 0 && (
            <Link
              to="/cart"
              className="rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
            >
              Go to Cart ({cartCount})
            </Link>
          )}
        </div>
      </section>
      <section className="px-6 py-10 bg-[#f8f5f2]">
        <div className="mx-auto flex max-w-6xl justify-center">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18d80]"
            />

            <input
              type="text"
              placeholder="Search for earrings, necklaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-[#e5d7ca] bg-white py-4 pl-12 pr-5 shadow-sm transition focus:border-[#c2a67a] focus:outline-none focus:ring-2 focus:ring-[#c2a67a]"
            />
          </div>
        </div>
      </section>

      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
          eyebrow={selectedCategory ? "Filtered Collection" : "Our Collection"}
          title={
            selectedCategory
              ? `${selectedCategory} Collection`
              : "Pieces Made to Feel Personal"
          }
          description={
            selectedCategory
              ? `A curated selection of ${selectedCategory.toLowerCase()} from Safiri Gems.`
              : "From pearl earrings to elegant necklaces, each piece is chosen to add quiet beauty to your everyday style."
          }
        />
      ) : (
        <section className="px-6 py-20 text-center">
          <div className="mx-auto max-w-xl rounded-[2rem] bg-white/75 p-10 shadow-sm">
            <h2 className="font-serif text-3xl mb-3">
            {searchTerm
              ? "No matching products"
              : "Coming Soon"}
          </h2>

            <p className="text-[#7a6a61] mb-6">
                {searchTerm
                  ? `We couldn't find anything matching "${searchTerm}".`
                  : `${selectedCategory} pieces are not available yet, but they are part of our growing collection.`}
              </p>
            <button
              onClick={clearFilter}
              className="rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
            >
              View Available Pieces
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
    </PageTransition>
  );
}

export default Shop;