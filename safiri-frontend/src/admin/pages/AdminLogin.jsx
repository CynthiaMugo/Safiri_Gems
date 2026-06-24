import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminService";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await loginAdmin(
        email,
        password
      );

      localStorage.setItem(
        "adminToken",
        data.token
      );

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-serif text-center mb-6 text-[#5a4a42]">
          Safiri Gems Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="w-full bg-[#c2a67a] text-white py-3 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;