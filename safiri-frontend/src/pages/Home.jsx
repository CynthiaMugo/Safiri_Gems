import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import ProductGrid from "../components/ProductGrid";
import CategoryPreview from "../components/CategoryPreview";
import AboutPreview from "../components/AboutPreview";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useEffect } from "react";
import PageTransition from "../components/PageTransition";

function Home() {
  useEffect(() => {
    document.title = "Safiri Gems | Pearl Jewelry in Kenya";
  }, []);
  const featuredProducts = products.slice(0, 4);

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <ProductGrid
        products={featuredProducts}
        eyebrow="Featured Pieces"
        title="A First Look at Safiri Gems"
        description="A soft preview of elegant pieces selected to complement your everyday style."
        showActions={false}
        showViewAllButton={true}
      />
      <CategoryPreview />
      <AboutPreview />
      <CTASection />
      <Footer />
    </div>
    </PageTransition>
  );
}

export default Home;