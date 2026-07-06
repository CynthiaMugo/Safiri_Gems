import api from "../../services/api";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  };
}

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const createCategory = async (category) => {
  const response = await api.post(
    "/categories",
    category,
    authHeader()
  );

  return response.data;
};