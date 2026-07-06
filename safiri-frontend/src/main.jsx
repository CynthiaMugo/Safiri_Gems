import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#5a4a42",
              color: "#fff",
              borderRadius: "14px",
              padding: "16px",
            },
            success: {
              iconTheme: {
                primary: "#c2a67a",
                secondary: "#fff",
              },
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);