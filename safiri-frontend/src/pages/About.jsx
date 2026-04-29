import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import PageTransition from "../components/PageTransition";

function About() {
  useEffect(() => {
    document.title = "About Safiri Gems | Pearl Jewelry in Kenya";
  }, []);
  return (
    <PageTransition>
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <main>
        <section className="px-6 py-20 bg-[#eee6df] text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#c2a67a] mb-3">
            About Safiri Gems
          </p>

          <h1 className="font-serif text-4xl md:text-5xl mb-5">
            Pearls, Elegance & Everyday Beauty
          </h1>

          <p className="max-w-2xl mx-auto text-[#7a6a61] leading-relaxed">
            Safiri Gems is a jewelry brand founded by Violet Mugo, inspired by
            her love for pearls and timeless accessories that reflect personal
            elegance.
          </p>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 items-center">
            <div className="rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src="/placeholder1.jpeg"
                alt="Pearl jewelry"
                className="h-[430px] w-full object-cover"
              />
            </div>

            <div>
              <p className="font-serif text-3xl mb-6">
                Jewelry is not just an accessory, it is a reflection of one’s
                personality.
              </p>

              <div className="space-y-5 text-[#7a6a61] leading-relaxed">
                <p>
                  Safiri Gems was created for women who love subtle luxury,
                  graceful details, and pieces that feel personal.
                </p>

                <p>
                  Our collection currently includes earrings, necklaces, and
                  necklace-and-earring sets, with bracelets planned as part of
                  our growing collection.
                </p>

                <p>
                  Each piece is chosen to complement your outfit while still
                  allowing your natural elegance to shine through.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white/70 p-10 text-center shadow-sm">
            <p className="font-serif text-2xl md:text-3xl text-[#5a4a42]">
              “Let your jewelry mirror your inner elegance.”
            </p>

            <p className="mt-4 text-sm text-[#7a6a61]">
              Safiri Gems - subtle luxury, made for everyday elegance.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </PageTransition>
  );
}

export default About;