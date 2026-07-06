import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FolderOpen,
  Mail,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
      isActive
        ? "bg-[#c2a67a] text-white shadow"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="w-72 bg-[#5a4a42] min-h-screen px-6 py-8 flex flex-col">
      <div>
        <h1 className="font-serif text-4xl text-white">
          Safiri Gems
        </h1>

        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#d6c3b3]">
          Admin Panel
        </p>
      </div>

      <nav className="mt-12 space-y-2">
        <NavLink to="/admin/dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={navClass}>
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={navClass}>
          <ShoppingBag size={20} />
          Orders
        </NavLink>

        <NavLink to="/admin/categories" className={navClass}>
          <FolderOpen size={20} />
          Categories
        </NavLink>

        <NavLink to="/admin/messages" className={navClass}>
          <Mail size={20} />
          Messages
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#c2a67a] py-3 text-white transition hover:bg-[#d6c3b3]"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;