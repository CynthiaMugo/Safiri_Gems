import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#f8f5f2]">
      
      <Link to="/" className="text-xl font-semibold">
        Safiri Gems
      </Link>

      <ul className="hidden md:flex gap-8 text-sm">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="flex gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <ShoppingBag className="w-5 h-5 cursor-pointer" />
      </div>
    </nav>
  );
}
export default Navbar;