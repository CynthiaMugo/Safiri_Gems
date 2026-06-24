import api from "../../services/api";

export async function loginAdmin(email, password) {
  const response = await api.post("/admin/login", {
    email,
    password,
  });

  return response.data;
}

export async function getDashboard(token) {
  const response = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}