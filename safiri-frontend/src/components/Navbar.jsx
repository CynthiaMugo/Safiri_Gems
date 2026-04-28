import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#f8f5f2]">
      <Link to="/" className="text-xl font-semibold tracking-wide">
        Safiri Gems
      </Link>

      <ul className="hidden md:flex gap-8 text-sm">
        <li><Link to="/" className="hover:text-[#c2a67a]">Home</Link></li>
        <li><Link to="/shop" className="hover:text-[#c2a67a]">Shop</Link></li>
        <li><Link to="/about" className="hover:text-[#c2a67a]">About</Link></li>
        <li><Link to="/contact" className="hover:text-[#c2a67a]">Contact</Link></li>
      </ul>

      <div className="flex gap-4 items-center">
        <Search className="w-5 h-5 opacity-50" />

        <Link to="/cart" className="relative">
          <ShoppingBag className="w-5 h-5" />

          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-[#c2a67a] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;