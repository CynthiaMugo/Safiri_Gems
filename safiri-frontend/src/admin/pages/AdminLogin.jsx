import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Gem } from "lucide-react";
import toast from "react-hot-toast";

import { loginAdmin } from "../services/adminService";


function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await loginAdmin(
        email,
        password
      );


      localStorage.setItem(
        "adminToken",
        data.token
      );


      toast.success("Welcome back!");

      navigate("/admin/dashboard");


    } catch(error) {

      console.error(error);

      toast.error(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center px-6">


      <div className="w-full max-w-md">


        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c2a67a]">

            <Gem
              className="text-white"
              size={32}
            />

          </div>


          <h1 className="font-serif text-4xl text-[#5a4a42]">
            Safiri Gems
          </h1>


          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#c2a67a]">
            Admin Portal
          </p>

        </div>



        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm"
        >


          <div className="space-y-5">


            <div>

              <label className="mb-2 block text-sm text-[#7a6a61]">
                Email
              </label>

              <input
                type="email"
                placeholder="admin@safirigems.com"
                className="w-full rounded-xl border border-[#eee6df] bg-[#f8f5f2] p-3 text-[#5a4a42] outline-none transition focus:border-[#c2a67a]"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

            </div>




            <div>

              <label className="mb-2 block text-sm text-[#7a6a61]">
                Password
              </label>


              <div className="relative">

                <input
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-[#eee6df] bg-[#f8f5f2] p-3 pr-12 text-[#5a4a42] outline-none transition focus:border-[#c2a67a]"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3 text-[#7a6a61] hover:text-[#c2a67a]"
                >

                  {
                    showPassword
                    ? <EyeOff size={20}/>
                    : <Eye size={20}/>
                  }

                </button>

              </div>

            </div>


          </div>



          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-full bg-[#c2a67a] py-3 text-white transition hover:bg-[#5a4a42] disabled:opacity-50"
          >

            {
              loading
              ? "Signing in..."
              : "Login"
            }

          </button>


        </form>

      </div>


    </div>

  );

}

export default AdminLogin;