import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
        <Navbar />
        <main className="px-6 py-20 text-center">
          <h1 className="font-serif text-4xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-[#c2a67a] underline">
            Back to shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <main className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="h-[520px] w-full object-cover"
            />
          </div>

          <section className="flex flex-col justify-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c2a67a]">
              {product.category}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-medium mb-6">
              KSh {product.price.toLocaleString()}
            </p>

            <p className="leading-relaxed text-[#7a6a61] mb-8">
              {product.description}
            </p>

            <div className="rounded-3xl bg-white/70 p-5 mb-8 text-sm text-[#7a6a61]">
              <p className="font-medium text-[#5a4a42] mb-2">
                Ordering Notes
              </p>
              <p>
                Add this item to your cart, then confirm your order via
                WhatsApp from the order summary page.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => addToCart(product)}
                className="rounded-full bg-[#c2a67a] px-8 py-3 text-white transition hover:bg-[#5a4a42]"
              >
                Add to Cart
              </button>

              <Link
                to="/shop"
                className="rounded-full border border-[#c2a67a] px-8 py-3 text-center text-[#5a4a42] transition hover:bg-[#c2a67a] hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;