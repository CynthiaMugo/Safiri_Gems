import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    location: "",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  }

  function sendOrderToWhatsApp() {
    const businessPhone = "254700000000"; // replace with real number

    const orderItems = cartItems
      .map(
        (item) =>
          `${item.name} x ${item.quantity} - KSh ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("%0A");

    const message = `
Hello Safiri Gems, I would like to place an order.%0A%0A
Name: ${customer.name}%0A
Phone: ${customer.phone}%0A
Delivery Location: ${customer.location}%0A
Notes: ${customer.notes || "None"}%0A%0A
Order:%0A${orderItems}%0A%0A
Total: KSh ${cartTotal.toLocaleString()}%0A%0A
I will make payment via Till Number.
`;

    window.open(`https://wa.me/${businessPhone}?text=${message}`, "_blank");

    clearCart();
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <main className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="rounded-3xl bg-white/70 p-10 text-center">
              <p className="text-[#7a6a61] mb-6">
                Your cart is empty.
              </p>
              <a
                href="/shop"
                className="rounded-full bg-[#c2a67a] px-6 py-3 text-white"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3">
              <section className="lg:col-span-2 space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-5 rounded-3xl bg-white/70 p-5 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-32 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium text-lg">{item.name}</h2>
                      <p className="text-sm text-[#7a6a61]">
                        KSh {item.price.toLocaleString()}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded-full border border-[#c2a67a]"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-full border border-[#c2a67a]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 self-start"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </section>

              <aside className="rounded-3xl bg-white/80 p-6 shadow-sm h-fit">
                <h2 className="font-serif text-2xl mb-4">Order Summary</h2>

                <div className="flex justify-between border-b border-[#e8ddd4] pb-4 mb-5">
                  <span>Total</span>
                  <strong>KSh {cartTotal.toLocaleString()}</strong>
                </div>

                <div className="rounded-2xl bg-[#eee6df] p-4 mb-6 text-sm">
                  <p className="font-medium mb-1">Payment Instructions</p>
                  <p className="text-[#7a6a61]">
                    Pay via Till Number:
                    <strong className="text-[#5a4a42]"> Coming Soon</strong>
                  </p>
                  <p className="text-[#7a6a61] mt-2">
                    After payment, send your order through WhatsApp for confirmation.
                  </p>
                </div>

                <form className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={customer.name}
                    onChange={handleChange}
                    className="w-full rounded-full border border-[#e8ddd4] bg-[#f8f5f2] px-4 py-3 outline-none focus:border-[#c2a67a]"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={customer.phone}
                    onChange={handleChange}
                    className="w-full rounded-full border border-[#e8ddd4] bg-[#f8f5f2] px-4 py-3 outline-none focus:border-[#c2a67a]"
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Delivery location"
                    value={customer.location}
                    onChange={handleChange}
                    className="w-full rounded-full border border-[#e8ddd4] bg-[#f8f5f2] px-4 py-3 outline-none focus:border-[#c2a67a]"
                  />

                  <textarea
                    name="notes"
                    placeholder="Additional notes"
                    value={customer.notes}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-3xl border border-[#e8ddd4] bg-[#f8f5f2] px-4 py-3 outline-none focus:border-[#c2a67a]"
                  ></textarea>

                  <button
                    type="button"
                    onClick={sendOrderToWhatsApp}
                    className="w-full rounded-full bg-[#c2a67a] px-6 py-3 text-white hover:bg-[#5a4a42] transition"
                  >
                    Send Order on WhatsApp
                  </button>
                </form>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;