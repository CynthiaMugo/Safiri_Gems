import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Products from "./admin/pages/Products";

function App() {
  return (
    <>
    <ScrollToTop />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={<Products />}
      />
    </Routes>
    
    </>
  );
}

export default App;