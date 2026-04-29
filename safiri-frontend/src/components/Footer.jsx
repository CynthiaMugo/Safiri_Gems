import { Link } from "react-router-dom";
import { Phone, MessageCircle, Share2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-[#e8ddd4] bg-[#5a4a42] px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl">Safiri Gems</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Pearl-inspired jewelry for women who love subtle luxury, quiet
            confidence, and timeless elegance.
          </p>

          <p className="mt-5 font-serif text-xl text-[#d6c3b3]">
            “Let your jewelry mirror your inner elegance.”
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d6c3b3]">
            Explore
          </h4>

          <div className="flex flex-col gap-3 text-sm text-white/70">
            <Link to="/" className="transition hover:text-[#d6c3b3]">
              Home
            </Link>
            <Link to="/shop" className="transition hover:text-[#d6c3b3]">
              Shop
            </Link>
            <Link to="/about" className="transition hover:text-[#d6c3b3]">
              About
            </Link>
            <Link to="/contact" className="transition hover:text-[#d6c3b3]">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d6c3b3]">
            Connect
          </h4>

          <div className="flex flex-col gap-3 text-sm text-white/70">
            <a
              href="https://wa.me/254793199194"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition hover:text-[#d6c3b3]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/safirigems/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70 transition hover:text-[#d6c3b3]"
            >
              <FaInstagram size={16} />
              Instagram
            </a>

            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 md:flex-row md:justify-between md:text-left">
        <p>© {new Date().getFullYear()} Safiri Gems. All rights reserved.</p>
        <p>Subtle luxury, made for everyday elegance.</p>
      </div>
    </footer>
  );
}

export default Footer;