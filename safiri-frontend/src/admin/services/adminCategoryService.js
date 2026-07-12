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
    "/categories/",
    category,
    authHeader()
  );

  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await api.put(
    `/categories/${id}`,
    category,
    authHeader()
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(
    `/categories/${id}`,
    authHeader()
  );

  return response.data;
};