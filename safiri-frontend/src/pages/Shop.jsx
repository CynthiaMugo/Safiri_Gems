import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function Shop() {
  const { cartCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  function clearFilter() {
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <section className="px-6 py-16 text-center bg-[#eee6df]">
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
              Coming Soon
            </h2>

            <p className="text-[#7a6a61] mb-6">
              {selectedCategory} pieces are not available yet, but they are part
              of our growing collection.
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
  );
}

export default Shop;