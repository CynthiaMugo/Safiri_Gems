import { X } from "lucide-react";

function OrderDetailsDrawer({
  order,
  open,
  onClose,
}) {
  if (!open || !order) return null;

  const total = order.items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#c2a67a]">
              Order
            </p>

            <h2 className="font-serif text-3xl text-[#5a4a42]">
              {order.order_number}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="space-y-8 p-6">

          {/* Customer */}

          <section>

            <h3 className="mb-3 font-semibold">
              Customer
            </h3>

            <div className="space-y-2 text-sm">

              <p>
                <strong>Name:</strong>{" "}
                {order.customer_name}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer_phone}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.customer_email || "-"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {order.delivery_location}
              </p>

            </div>

          </section>

          {/* Items */}

          <section>

            <h3 className="mb-3 font-semibold">
              Items
            </h3>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-[#f8f5f2] p-3"
                >

                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      {item.product_name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      KSh {item.unit_price.toLocaleString()}
                    </p>

                  </div>

                  <div className="font-medium">
                    KSh {item.subtotal.toLocaleString()}
                  </div>

                </div>

              ))}

            </div>

          </section>

          {/* Payment */}

          <section>

            <h3 className="mb-3 font-semibold">
              Payment
            </h3>

            <div className="space-y-2 text-sm">

              <p>

                <strong>Status:</strong>{" "}

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    order.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment_status}
                </span>

              </p>

              <p>
                <strong>Reference:</strong>{" "}
                {order.mpesa_reference || "-"}
              </p>

            </div>

          </section>

          {/* Total */}

          <section className="border-t pt-6">

            <div className="flex justify-between text-xl font-semibold">

              <span>Total</span>

              <span>
                KSh {total.toLocaleString()}
              </span>

            </div>

          </section>

        </div>

      </div>
    </>
  );
}

export default OrderDetailsDrawer;