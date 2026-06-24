import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data.map((product) => ({
    ...product,
    image: product.image_url,
  }));
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);

  return {
    ...response.data,
    image: response.data.image_url,
  };
};