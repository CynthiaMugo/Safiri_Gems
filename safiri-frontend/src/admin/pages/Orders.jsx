import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";

import {
  getOrders,
  updateOrderStatus,
} from "../services/adminOrderService";

import toast from "react-hot-toast";
import OrderDetailsDrawer from "../components/OrderDetailsDrawer";



function Orders() {
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const [orderStatus, setOrderStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    function openOrder(order) {
        setSelectedOrder(order);
        setDrawerOpen(true);
    }

    useEffect(() => {
      const timeout = setTimeout(() => {
          setPage(1);
          setSearch(searchInput);

      }, 500);

      return () => clearTimeout(timeout);

  }, [searchInput]);

    async function loadOrders() {
        try {
            setLoading(true);

            const data = await getOrders({
                page,
                search,
                orderStatus,
                paymentStatus,
                startDate,
                endDate,
            });

            setOrders(data.orders);
            setPagination(data.pagination);

        } catch (error) {
            console.error(error);

            toast.error("Failed to load orders");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrders();
        }, [page,
              search,
              orderStatus,
              paymentStatus,
              startDate,
              endDate,]);


    async function handleStatusChange(
        orderId,
        field,
        value
    ){

        try {


            await updateOrderStatus(
                orderId,
                {
                    [field]: value
                }
            );


            toast.success(
            "Order updated"
            );


            loadOrders();

        } catch(error){

            console.error(error);

            toast.error(
            "Update failed"
            );

        }

    }
    function getPaymentStyles(status) {
        switch (status) {
            case "paid":
            return "bg-green-50 text-green-700 border-green-200";

            default:
            return "bg-amber-50 text-amber-700 border-amber-200";
        }
    }

    function getOrderStyles(status) {
        switch (status) {
            case "new":
            return "bg-blue-50 text-blue-700 border-blue-200";

            case "processing":
            return "bg-orange-50 text-orange-700 border-orange-200";

            case "ready":
            return "bg-purple-50 text-purple-700 border-purple-200";

            case "delivered":
            return "bg-green-50 text-green-700 border-green-200";

            case "cancelled":
            return "bg-red-50 text-red-700 border-red-200";

            default:
            return "bg-gray-50 text-gray-700 border-gray-200";
        }
    }

    if (loading) {

    return (

        <AdminLayout>

            <Header />

            <div className="space-y-8">

                <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
                        Orders
                    </p>

                    <div className="mt-3 h-12 w-72 animate-pulse rounded-xl bg-[#eee6df]" />

                    <div className="mt-3 h-5 w-96 animate-pulse rounded bg-[#f3ede8]" />

                </div>

                <div className="rounded-3xl bg-white p-8 shadow-sm">

                    {[...Array(6)].map((_, index) => (

                        <div
                            key={index}
                            className="grid grid-cols-5 gap-6 border-b border-[#f1ece7] py-5 last:border-none"
                        >

                            {[...Array(5)].map((_, cell) => (

                                <div
                                    key={cell}
                                    className="h-5 animate-pulse rounded bg-[#eee6df]"
                                />

                            ))}

                        </div>

                    ))}

                </div>

            </div>

        </AdminLayout>

    );

}

    return (

    <AdminLayout>

    <Header />
        <div className="mb-8">

            <p className="text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
            Orders
            </p>

            <h1 className="font-serif text-5xl text-[#5a4a42]">
            Customer Orders
            </h1>

            <p className="mt-2 text-[#7a6a61]">
            Manage customer purchases and deliveries.
            </p>
        </div>
        
            <div className="mb-6 grid gap-4 lg:grid-cols-5">

            <input
                type="text"
                placeholder="Search customer or order..."
                value={searchInput}
                onChange={(e) => {
                    setPage(1);
                    setSearchInput(e.target.value);
                }}
                className="rounded-xl border border-[#e8ddd4] px-4 py-3"
            />

            <select
                value={orderStatus}
                onChange={(e) => {
                    setPage(1);
                    setOrderStatus(e.target.value);
                }}
                className="rounded-xl border border-[#e8ddd4] px-4 py-3"
            >
                <option value="">All Orders</option>
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <select
                value={paymentStatus}
                onChange={(e) => {
                    setPage(1);
                    setPaymentStatus(e.target.value);
                }}
                className="rounded-xl border border-[#e8ddd4] px-4 py-3"
            >
                <option value="">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
            </select>

            <input
                type="date"
                value={startDate}
                onChange={(e) => {
                    setPage(1);
                    setStartDate(e.target.value);
                }}
                className="rounded-xl border border-[#e8ddd4] px-4 py-3"
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => {
                    setPage(1);
                    setEndDate(e.target.value);
                }}
                className="rounded-xl border border-[#e8ddd4] px-4 py-3"
            />

        </div>
        <p className="mt-2 text-[#7a6a61]">
              {pagination.total ?? 0} order(s) found
          </p>


    

    <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
        <table className="w-full">
            <thead className="bg-[#eee6df]">
            <tr>
            <th className="p-4 text-left">
            Order
            </th>
            <th className="p-4 text-left">
            Customer
            </th>
            <th className="p-4 text-left">
            Items
            </th>
            <th className="p-4 text-left">
            Payment
            </th>
            <th className="p-4 text-left">
            Status
            </th>
            </tr>

            </thead>

    <tbody>
    {orders.map((order)=>(
    <tr
    key={order.id}
    onClick={() => openOrder(order)}
    className="cursor-pointer border-t transition hover:bg-[#faf7f4]"
    >

    <td className="px-4 py-5 align-top">

    <p className="font-medium">

    {order.order_number}

    </p>


    <p className="text-xs text-gray-500">

    {new Date(order.created_at)
    .toLocaleDateString()}

    </p>


    </td>
        <td className="px-4 py-5 align-top">

        <p>
        {order.customer_name}
        </p>

        <p className="text-sm text-gray-500">
        {order.customer_phone}
        </p>

        </td>
        <td className="px-4 py-5 align-top">

            <div className="space-y-1">

                <p className="text-sm font-semibold text-[#5a4a42]">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>

                {order.items.slice(0, 2).map((item) => (

                    <p
                        key={item.id}
                        className="truncate text-sm text-[#7a6a61]"
                    >
                        • {item.product_name}
                    </p>

                ))}

                {order.items.length > 2 && (

                    <p className="text-xs font-medium text-[#c2a67a]">
                        +{order.items.length - 2} more
                    </p>

                )}

            </div>

        </td>

        <td className="px-4 py-5 align-top"
            onClick={(e) => e.stopPropagation()}
        >
        <select value={order.payment_status}
        onChange={(e)=>
        handleStatusChange(
        order.id,
        "payment_status",
        e.target.value
        )
        }

        className={`rounded-xl border px-4 py-2 font-medium transition focus:outline-none
            ${getPaymentStyles(order.payment_status)}
            `}
        >


        <option value="pending">
        Pending
        </option>


        <option value="paid">
        Paid
        </option>


        </select>
        </td>

        <td className="px-4 py-5 align-top"
            onClick={(e) => e.stopPropagation()}
        >
        <select

        value={order.order_status}

        onChange={(e)=>
        handleStatusChange(
        order.id,
        "order_status",
        e.target.value
        )
        }

        className={`rounded-xl border px-4 py-2 font-medium transitionfocus:outline-none
        ${getOrderStyles(order.order_status)}
        `}
        >

        <option value="new">
        New
        </option>
        <option value="processing">
        Processing
        </option>
        <option value="ready">
        Ready
        </option>
        <option value="delivered">
        Delivered
        </option>

        <option value="cancelled">
        Cancelled
        </option>


        </select>
        </td>

        </tr>
        ))}

        </tbody>
        </table>
        </div>
        <div className="mt-6 flex items-center justify-between">

      <button
        onClick={() => setPage(page - 1)}
        disabled={!pagination.has_previous}
        className="rounded-xl border border-[#c2a67a] px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <p className="text-sm text-[#7a6a61]">
        Page {pagination.page || 1} of {pagination.pages || 1}
      </p>

      <button
        onClick={() => setPage(page + 1)}
        disabled={!pagination.has_next}
        className="rounded-xl bg-[#c2a67a] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
    <OrderDetailsDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
    />

    </AdminLayout>

    )

    }

    export default Orders;