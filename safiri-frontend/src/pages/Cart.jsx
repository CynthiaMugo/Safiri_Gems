import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

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
    email: "",
    location: "",
    mpesaReference: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");



  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }



  function validateForm() {
    const newErrors = {};


    if (!customer.name.trim()) {
      newErrors.name = "Full name is required.";
    }


    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required.";

    } else if (
      !/^(\+254|254|0)?7\d{8}$/.test(
        customer.phone.trim()
      )
    ) {
      newErrors.phone =
        "Enter a valid Kenyan phone number.";
    }


    if (!customer.location.trim()) {
      newErrors.location =
        "Delivery location is required.";
    }


    if (!customer.mpesaReference.trim()) {
      newErrors.mpesaReference =
        "M-Pesa transaction code is required.";
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }




  function buildOrderPayload() {

    return {

      customer_name: customer.name,

      customer_phone: customer.phone,

      customer_email:
        customer.email || null,

      delivery_location:
        customer.location,

      mpesa_reference:
        customer.mpesaReference,


      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
  }





  function sendOrderToWhatsApp(orderNumber) {

    const businessPhone =
      "254793199194";


    const orderItems = cartItems
      .map(
        (item) =>
          `${item.name} x ${item.quantity} - KSh ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("%0A");



    const message = `
Hello Safiri Gems.%0A%0A

I have placed an order.%0A%0A

Order Number:
${orderNumber}%0A

Name:
${customer.name}%0A

Phone:
${customer.phone}%0A

Delivery Location:
${customer.location}%0A

Items:%0A
${orderItems}%0A%0A

Total:
KSh ${cartTotal.toLocaleString()}%0A%0A

M-Pesa Reference:
${customer.mpesaReference}%0A%0A

Thank you.
`;



    window.open(
      `https://wa.me/${businessPhone}?text=${message}`,
      "_blank"
    );
  }





  async function placeOrder() {

    if (!validateForm()) return;


    try {

      setPlacingOrder(true);


      const order =
        await createOrder(
          buildOrderPayload()
        );



      setSuccessMessage(
        `Thank you! Your order ${order.order_number} has been received.`
      );



      sendOrderToWhatsApp(
        order.order_number
      );



      clearCart();



    } catch(error) {

      console.error(
        "Order error:",
        error
      );


      alert(
        "Failed to place order. Please try again."
      );


    } finally {

      setPlacingOrder(false);

    }

  }




  const inputStyle = `
    w-full
    rounded-full
    border
    border-[#e8ddd4]
    bg-[#f8f5f2]
    px-4
    py-3
    outline-none
    focus:border-[#c2a67a]
    focus:ring-2
    focus:ring-[#c2a67a]/20
  `;




  return (

    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">

      <Navbar />


      <main className="px-6 py-16">

        <div className="mx-auto max-w-6xl">


          <h1 className="font-serif text-4xl mb-8">
            Your Cart
          </h1>




          {successMessage && (

            <div className="mb-8 rounded-2xl bg-green-100 p-5 text-green-700">

              {successMessage}

            </div>

          )}






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


            {cartItems.map((item)=>(


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


                  <h2 className="font-medium text-lg">
                    {item.name}
                  </h2>


                  <p className="text-sm text-[#7a6a61]">
                    KSh {item.price.toLocaleString()}
                  </p>



                  <div className="mt-4 flex items-center gap-3">


                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      className="h-8 w-8 rounded-full border border-[#c2a67a]"
                    >
                      -
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="h-8 w-8 rounded-full border border-[#c2a67a]"
                    >
                      +
                    </button>


                  </div>


                </div>



                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-sm text-red-500 self-start"
                >
                  Remove
                </button>


              </div>


            ))}


            </section>





            <aside className="rounded-3xl bg-white/80 p-6 shadow-sm h-fit">


              <h2 className="font-serif text-2xl mb-4">
                Order Summary
              </h2>



              <div className="flex justify-between border-b border-[#e8ddd4] pb-4 mb-5">

                <span>
                  Total
                </span>

                <strong>
                  KSh {cartTotal.toLocaleString()}
                </strong>

              </div>





              <div className="rounded-2xl bg-[#eee6df] p-4 mb-6 text-sm">


                <p className="font-medium mb-2">
                  Payment Instructions
                </p>


                <p className="text-[#7a6a61]">
                  Pay via M-Pesa Buy Goods
                </p>


                <p className="text-[#7a6a61]">
                  Till Number:
                  <strong className="text-[#5a4a42]">
                    {" "}123456
                  </strong>
                </p>


                <p className="text-[#7a6a61] mt-2">
                  Enter your M-Pesa transaction code below.
                </p>


              </div>





              <form className="space-y-4">


                <input
                  name="name"
                  placeholder="Full name"
                  value={customer.name}
                  onChange={handleChange}
                  className={inputStyle}
                />

                {errors.name &&
                  <p className="text-xs text-red-500">
                    {errors.name}
                  </p>
                }



                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={customer.phone}
                  onChange={handleChange}
                  className={inputStyle}
                />


                {errors.phone &&
                  <p className="text-xs text-red-500">
                    {errors.phone}
                  </p>
                }



                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={customer.email}
                  onChange={handleChange}
                  className={inputStyle}
                />



                <input
                  name="location"
                  placeholder="Delivery location"
                  value={customer.location}
                  onChange={handleChange}
                  className={inputStyle}
                />


                {errors.location &&
                  <p className="text-xs text-red-500">
                    {errors.location}
                  </p>
                }



                <input
                  name="mpesaReference"
                  placeholder="M-Pesa transaction code"
                  value={customer.mpesaReference}
                  onChange={handleChange}
                  className={inputStyle}
                />



                {errors.mpesaReference &&
                  <p className="text-xs text-red-500">
                    {errors.mpesaReference}
                  </p>
                }




                <textarea
                  name="notes"
                  placeholder="Additional notes"
                  value={customer.notes}
                  onChange={handleChange}
                  rows="3"
                  className="
                  w-full
                  rounded-3xl
                  border
                  border-[#e8ddd4]
                  bg-[#f8f5f2]
                  px-4
                  py-3
                  outline-none
                  "
                />





                <button
                  type="button"
                  disabled={placingOrder}
                  onClick={placeOrder}
                  className="
                  w-full
                  rounded-full
                  bg-[#c2a67a]
                  px-6
                  py-3
                  text-white
                  transition
                  hover:bg-[#5a4a42]
                  disabled:opacity-50
                  "
                >

                  {placingOrder
                    ? "Placing Order..."
                    : "Place Order"
                  }

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