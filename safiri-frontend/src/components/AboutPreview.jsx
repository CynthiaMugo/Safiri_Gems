import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";

function AboutPreview() {
  return (
    <section className="bg-[#f8f5f2] px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        
        <div className="overflow-hidden rounded-[2rem] shadow-lg">
          <img
            src="/images/about-pearls.jpg"
            alt="Pearl jewelry detail"
            className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="About Safiri Gems"
            title="Elegance, Worn Effortlessly"
            description=""
          />

          <div className="space-y-5 text-[#7a6a61] leading-relaxed">
            <p>
              Safiri Gems was founded by Violet Mugo, a lover of pearls and
              timeless accessories that reflect quiet confidence.
            </p>

            <p>
              Each piece is selected to feel personal — not just something you
              wear, but something that mirrors your inner elegance.
            </p>

            <p className="font-serif text-2xl text-[#5a4a42]">
              “Pearls are nature’s timeless treasures.”
            </p>
          </div>

          <Link
            to="/about"
            className="inline-block mt-8 rounded-full border border-[#c2a67a] px-6 py-3 text-sm text-[#5a4a42] transition hover:bg-[#c2a67a] hover:text-white"
          >
            Learn More
          </Link>

        </div>
      </div>
    </section>
  );
}

export default AboutPreview;