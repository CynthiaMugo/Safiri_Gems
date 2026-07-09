import api from "../../services/api";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  };
}

export const getOrders = async () => {
  const response = await api.get("/orders/", authHeader());

  return response.data;
};

export const updateOrderStatus = async (
  id,
  statusData
) => {
  const response = await api.put(
    `/orders/${id}/status`,
    statusData,
    authHeader()
  );

  return response.data;
};