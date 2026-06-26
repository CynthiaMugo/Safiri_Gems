import { useEffect, useState } from "react";
import { getDashboard } from "../services/adminService";
import AdminLayout from "../components/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import { Package, ShoppingBag, CircleAlert, Mail, Plus, FolderOpen, Tags, MessageSquare,} from "lucide-react";
import ActionCard from "../components/ActionCard";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      const token =
        localStorage.getItem("adminToken");

      const data =
        await getDashboard(token);

      setStats(data);
    }

    fetchDashboard();
  }, []);

  if (!stats) {
  return (
    <AdminLayout>
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#c2a67a] border-t-transparent" />
          <p className="font-serif text-xl text-[#5a4a42]">
            Loading dashboard...
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

  return (
    <AdminLayout>
      <Header />
       <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-4">
        <DashboardCard
            title="Products"
            value={stats.products}
            icon={Package}
            color="bg-[#5a4a42]"
        />

        <DashboardCard
            title="Orders"
            value={stats.orders}
            icon={ShoppingBag}
            color="bg-[#c2a67a]"
        />

        <DashboardCard
            title="Pending"
            value={stats.pending_orders}
            icon={CircleAlert}
            color="bg-orange-400"
        />

        <DashboardCard
            title="Messages"
            value={stats.messages}
            icon={Mail}
            color="bg-green-500"
        />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="font-serif text-3xl mb-6 text-[#5a4a42]">
            Recent Orders
            </h2>

            <p className="text-[#7a6a61]">
            Orders will appear here once customers begin purchasing.
            </p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#c2a67a]">
              Admin Tools
          </p>

          <h2 className="font-serif text-3xl text-[#5a4a42] mb-6">
              Quick Actions
          </h2>

          <div className="space-y-4">
              <ActionCard
                  title="Add Product"
                  description="Create a new jewelry listing."
                  icon={Plus}
                  onClick={() => console.log("Add Product")}
              />

              <ActionCard
                  title="Manage Orders"
                  description="View and update customer orders."
                  icon={FolderOpen}
                  onClick={() => console.log("Orders")}
              />

              <ActionCard
                  title="Manage Categories"
                  description="Edit product collections."
                  icon={Tags}
                  onClick={() => console.log("Categories")}
              />

              <ActionCard
                  title="Messages"
                  description="Respond to customer enquiries."
                  icon={MessageSquare}
                  onClick={() => console.log("Messages")}
              />
          </div>
          </div>
        </div>
    </div>

    </AdminLayout>
  );
}

export default Dashboard;

{/* <ActionCard
    title="Add Product"
    description="Create a new jewelry listing."
    icon={Plus}
    onClick={() => navigate("/admin/products/new")}
/>

<ActionCard
    title="Manage Orders"
    description="View customer purchases."
    icon={FolderOpen}
    onClick={() => navigate("/admin/orders")}
/>

<ActionCard
    title="Manage Categories"
    description="Organize your collections."
    icon={Tags}
    onClick={() => navigate("/admin/categories")}
/>

<ActionCard
    title="Messages"
    description="Read customer enquiries."
    icon={MessageSquare}
    onClick={() => navigate("/admin/messages")}
/> */}