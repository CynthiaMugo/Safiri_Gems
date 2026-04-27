function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">

      {/* Background image */}
      <img
        src="/images/hero.jpg"
        alt="Jewelry"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-xl px-4">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Timeless Elegance
        </h1>

        <p className="text-sm md:text-base mb-6">
          Let your jewelry mirror your inner elegance.
        </p>

        <button className="bg-[#c2a67a] text-white px-6 py-3 rounded-full hover:opacity-90 transition">
          Shop Collection
        </button>
      </div>
    </section>
  );
}

export default Hero;