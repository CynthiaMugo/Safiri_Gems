import api from "../../services/api";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  };
}

export const getAdminProducts = async () => {
  const response = await api.get("/products");

  return response.data.map((product) => ({
    ...product,
    image: product.image_url,
  }));
};

export const createProduct = async (product) => {
  const response = await api.post(
    "/products",
    product,
    authHeader()
  );

  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(
    `/products/${id}`,
    product,
    authHeader()
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`,
    authHeader()
  );

  return response.data;
};