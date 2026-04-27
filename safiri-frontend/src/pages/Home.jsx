import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import ProductGrid from "../components/ProductGrid";
import CategoryPreview from "../components/CategoryPreview";
import AboutPreview from "../components/AboutPreview";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import { products } from "../data/products";

function Home() {
  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5a4a42]">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <ProductGrid products={products} />
      <CategoryPreview />
      <AboutPreview />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;