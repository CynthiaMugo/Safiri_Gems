import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-[#c2a67a] ${
      isActive ? "text-[#c2a67a]" : "text-[#5a4a42]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8ddd4]/70 bg-[#f8f5f2]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="group">
          <p className="font-['Great_Vibes'] text-4xl md:text-5xl leading-none text-[#5a4a42]">
            Safiri Gems
          </p>
          {/* <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl">
  Safiri Gems
</h1> */}
          <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#c2a67a]">
            Pearl Elegance
          </p>
        </Link>

        <ul className="hidden items-center gap-9 text-sm font-medium md:flex">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4 text-[#5a4a42]">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full bg-white/60 p-2 transition hover:bg-[#e8ddd4]"
          >
            <Search size={18} />
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative rounded-full bg-white/60 p-2 transition hover:bg-[#e8ddd4]"
          >
            <ShoppingBag size={18} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c2a67a] text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;