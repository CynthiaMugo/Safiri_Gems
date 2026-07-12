import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { sendMessage } from "../services/messageService";
import PageTransition from "../components/PageTransition";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendMessage(formData);

      setStatus("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    document.title = "Contact Safiri Gems | Order Jewelry in Nairobi";
  }, []);

  return (
    <PageTransition>
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
                    <p>+254 793 199 194</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[#c2a67a]" />
                  <div>
                    <p className="font-medium text-[#5a4a42]">Phone</p>
                    <p>+254 793 199 194</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-[#c2a67a]" />
                  <div>
                    <p className="font-medium text-[#5a4a42]">Location</p>
                    <p>Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex gap-4">
                    <FaInstagram className="text-[#c2a67a]" />
                    <div>
                    <p className="font-medium text-[#5a4a42]">Instagram</p>
                    <a
                        href="https://www.instagram.com/safirigems/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[#c2a67a] transition"
                    >
                        @safirigems
                    </a>
                    </div>
                </div>

              </div>

              <a
                href="https://wa.me/254793199194"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-[2rem] bg-[#5a4a42] p-8 text-white shadow-sm">

<h2 className="font-serif text-3xl mb-6">
  Send Us A Message
</h2>

<form onSubmit={handleSubmit} className="space-y-5">

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    className="w-full rounded-xl bg-white p-3 text-[#5a4a42] placeholder:text-[#9b8b80] outline-none"
  />


  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full rounded-xl bg-white p-3 text-[#5a4a42] placeholder:text-[#9b8b80] outline-none"
  />


  <textarea
    name="message"
    placeholder="Your Message"
    rows="5"
    value={formData.message}
    onChange={handleChange}
    className="w-full rounded-xl bg-white p-3 text-[#5a4a42] placeholder:text-[#9b8b80] outline-none"
  />


<button
  type="submit"
  className="rounded-full bg-[#c2a67a] px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#5a4a42]"
>
 Send Message
</button>

</form>

{
status && (
<p className="mt-4 text-[#d6c3b3]">
{status}
</p>
)
}

</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </PageTransition>
  );
}

export default Contact;