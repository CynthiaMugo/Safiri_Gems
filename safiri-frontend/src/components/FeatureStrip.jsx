import { Package, Sparkles, Truck, Gem } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Timeless Pieces",
    text: "Jewelry chosen to feel elegant beyond trends.",
  },
  {
    icon: Sparkles,
    title: "Pearl Inspired",
    text: "Soft, refined pieces inspired by classic beauty.",
  },
  {
    icon: Package,
    title: "Beautiful Packaging",
    text: "Presented with care, ready to gift or keep.",
  },
  {
    icon: Truck,
    title: "Easy Ordering",
    text: "Order conveniently through WhatsApp.",
  },
];

function FeatureStrip() {
  return (
    <section className="bg-[#eee6df] px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-3xl bg-[#f8f5f2]/70 p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d6c3b3]/40 text-[#5a4a42]">
              <Icon size={22} />
            </div>

            <h3 className="mb-2 font-serif text-xl text-[#5a4a42]">
              {title}
            </h3>

            <p className="text-sm leading-relaxed text-[#7a6a61]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureStrip;