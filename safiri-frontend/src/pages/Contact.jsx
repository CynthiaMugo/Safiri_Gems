import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, MessageCircle, MapPin } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />

      <main>
        <section className="px-6 py-20 bg-[#eee6df] text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#c2a67a] mb-3">
            Contact Us
          </p>

          <h1 className="font-serif text-4xl md:text-5xl mb-5">
            Let’s Help You Find Your Piece
          </h1>

          <p className="max-w-2xl mx-auto text-[#7a6a61] leading-relaxed">
            Have a question about an item, delivery, or placing an order?
            Reach out to Safiri Gems directly.
          </p>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm">
              <h2 className="font-serif text-3xl mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6 text-[#7a6a61]">
                <div className="flex gap-4">
                  <MessageCircle className="text-[#c2a67a]" />
                  <div>
                    <p className="font-medium text-[#5a4a42]">WhatsApp</p>
                    <p>+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[#c2a67a]" />
                  <div>
                    <p className="font-medium text-[#5a4a42]">Phone</p>
                    <p>+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-[#c2a67a]" />
                  <div>
                    <p className="font-medium text-[#5a4a42]">Location</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-[2rem] bg-[#5a4a42] p-8 text-white shadow-sm">
              <h2 className="font-serif text-3xl mb-6">
                Order Notes
              </h2>

              <div className="space-y-5 text-white/75 leading-relaxed">
                <p>
                  You can place your order through the cart and confirm it via
                  WhatsApp.
                </p>

                <p>
                  Payment is currently made through Till Number. The Till Number
                  will be shared clearly during order confirmation.
                </p>

                <p>
                  For custom requests, gift packaging, or delivery questions,
                  contact Safiri Gems directly on WhatsApp.
                </p>
              </div>

              <p className="mt-8 font-serif text-2xl text-[#d6c3b3]">
                “Elegance is never loud.”
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;