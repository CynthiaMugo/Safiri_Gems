import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import Header from "../components/Header";

import {
  getOrders,
  updateOrderStatus,
} from "../services/adminOrderService";

import toast from "react-hot-toast";



function Orders() {


    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);



    async function loadOrders(){

        try {

            setLoading(true);

            const data =
            await getOrders();

            setOrders(data);


        } catch(error){

            console.error(error);

            toast.error(
            "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }

    }



    useEffect(()=>{

        loadOrders();

    },[]);





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





    if(loading){

    return (

    <AdminLayout>

    <Header />

    <div className="p-10 text-center">

    Loading orders...

    </div>

    </AdminLayout>

    )

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
    className="border-t"
    >


    <td className="p-4">

    <p className="font-medium">

    {order.order_number}

    </p>


    <p className="text-xs text-gray-500">

    {new Date(order.created_at)
    .toLocaleDateString()}

    </p>


    </td>





    <td className="p-4">

    <p>
    {order.customer_name}
    </p>

    <p className="text-sm text-gray-500">
    {order.customer_phone}
    </p>

    </td>






    <td className="p-4">

    {order.items.map(item=>(

    <div key={item.id}>

    {item.product_name}
    x {item.quantity}

    </div>

    ))}


    </td>







    <td className="p-4">


    <select

    value={order.payment_status}

    onChange={(e)=>
    handleStatusChange(
    order.id,
    "payment_status",
    e.target.value
    )
    }

    className="rounded-lg border px-3 py-2"

    >


    <option value="pending">
    Pending
    </option>


    <option value="paid">
    Paid
    </option>


    </select>


    </td>







    <td className="p-4">


    <select

    value={order.order_status}

    onChange={(e)=>
    handleStatusChange(
    order.id,
    "order_status",
    e.target.value
    )
    }

    className="rounded-lg border px-3 py-2"

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



    </AdminLayout>

    )

    }


    export default Orders;