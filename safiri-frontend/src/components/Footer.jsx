import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#f8f5f2] px-6 py-10 border-t border-[#e8ddd4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">

        <div>
          <h3 className="font-serif text-2xl text-[#5a4a42]">
            Safiri Gems
          </h3>
          <p className="mt-2 text-sm text-[#7a6a61]">
            Subtle luxury, made for everyday elegance.
          </p>
        </div>

        <div className="flex justify-center gap-6 text-sm text-[#7a6a61]">
          <Link to="/" className="hover:text-[#c2a67a]">Home</Link>
          <Link to="/shop" className="hover:text-[#c2a67a]">Shop</Link>
          <Link to="/about" className="hover:text-[#c2a67a]">About</Link>
          <Link to="/contact" className="hover:text-[#c2a67a]">Contact</Link>
        </div>

        <p className="text-xs text-[#7a6a61]">
          © {new Date().getFullYear()} Safiri Gems
        </p>
      </div>
    </footer>
  );
}

export default Footer;