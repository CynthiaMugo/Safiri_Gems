import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.response.use(

  (response) => response,


  (error) => {

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem("adminToken");

      toast.error(
        "Session expired. Please login again."
      );

      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 1000);

    }


    return Promise.reject(error);
  }

);


export default api;