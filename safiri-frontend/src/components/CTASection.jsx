function CTASection() {
  return (
    <section className="px-6 py-20 bg-[#eee6df]">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#5a4a42] px-8 py-14 text-center text-white shadow-xl">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#d6c3b3]">
          Ready to order?
        </p>

        <h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-5xl">
          Let your jewelry be the exclamation point of your outfit.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75">
          Browse our collection and place your order directly through WhatsApp.
          Simple, personal, and convenient.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#d6c3b3]"
          >
            Order on WhatsApp
          </a>

          <span className="text-sm text-white/70">
            Till Number: <strong className="text-white">Coming Soon</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

export default CTASection;