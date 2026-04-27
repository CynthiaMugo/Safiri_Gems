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
          <a href="#" className="hover:text-[#c2a67a]">Home</a>
          <a href="#" className="hover:text-[#c2a67a]">Shop</a>
          <a href="#" className="hover:text-[#c2a67a]">About</a>
          <a href="#" className="hover:text-[#c2a67a]">Contact</a>
        </div>

        <p className="text-xs text-[#7a6a61]">
          © {new Date().getFullYear()} Safiri Gems
        </p>
      </div>
    </footer>
  );
}

export default Footer;