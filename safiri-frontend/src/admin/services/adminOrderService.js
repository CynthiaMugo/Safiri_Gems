import api from "../../services/api";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  };
}

export const getOrders = async ({
  page = 1,
  perPage = 10,
  search = "",
  orderStatus = "",
  paymentStatus = "",
  startDate = "",
  endDate = "",
}) => {

  const response = await api.get("/orders/", {
    params: {
      page,
      per_page: perPage,
      search,
      order_status: orderStatus,
      payment_status: paymentStatus,
      start_date: startDate,
      end_date: endDate,
    },
    ...authHeader(),
  });

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