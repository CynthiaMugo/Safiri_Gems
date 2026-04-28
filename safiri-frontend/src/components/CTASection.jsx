import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="px-6 py-20 bg-[#eee6df]">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#5a4a42] px-8 py-14 text-center text-white shadow-xl">
        
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#d6c3b3]">
          Discover Your Style
        </p>

        <h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-5xl">
          Let your jewelry be the exclamation point of your outfit.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75">
          Explore pearl-inspired pieces designed for everyday elegance and special moments.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/shop"
            className="rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#d6c3b3]"
          >
            Shop Collection
          </Link>

          <span className="text-sm text-white/70">
            Earrings • Necklaces • Sets
          </span>

        </div>
      </div>
    </section>
  );
}

export default CTASection;