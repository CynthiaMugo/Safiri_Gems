import { useEffect, useState } from "react";
import { getDashboard } from "../services/adminService";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl">
          Products: {stats.products}
        </div>

        <div className="bg-white p-6 rounded-xl">
          Orders: {stats.orders}
        </div>

        <div className="bg-white p-6 rounded-xl">
          Pending: {stats.pending_orders}
        </div>

        <div className="bg-white p-6 rounded-xl">
          Messages: {stats.messages}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;