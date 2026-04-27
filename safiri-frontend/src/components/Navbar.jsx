import { ShoppingBag, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#f8f5f2]">
      
      <h1 className="text-xl font-semibold tracking-wide">
        Safiri Gems
      </h1>

      <ul className="hidden md:flex gap-8 text-sm">
        <li className="cursor-pointer hover:text-[#c2a67a]">Home</li>
        <li className="cursor-pointer hover:text-[#c2a67a]">Shop</li>
        <li className="cursor-pointer hover:text-[#c2a67a]">About</li>
        <li className="cursor-pointer hover:text-[#c2a67a]">Contact</li>
      </ul>

      <div className="flex gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <ShoppingBag className="w-5 h-5 cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;