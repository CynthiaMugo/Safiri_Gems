import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function Shop() {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <section className="px-6 py-16 text-center bg-[#eee6df]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#c2a67a] mb-3">
          Shop Safiri Gems
        </p>

        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          Find Your Signature Piece
        </h1>

        <p className="max-w-2xl mx-auto text-[#7a6a61]">
          Browse pearl-inspired earrings, necklaces, and elegant sets made for
          everyday softness and special moments.
        </p>

        {cartCount > 0 && (
          <Link
            to="/cart"
            className="mt-8 inline-block rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
          >
            Go to Cart ({cartCount})
          </Link>
        )}
      </section>

      <ProductGrid products={products} />

      <Footer />
    </div>
  );
}

export default Shop;