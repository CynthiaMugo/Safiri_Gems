import api from "../../services/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});


export const getMessages = async () => {
  const response = await api.get(
    "/messages/",
    authHeader()
  );

  return response.data;
};

export const markMessageRead = async (id) => {
  const response = await api.put(
    `/messages/${id}/read`,
    {},
    authHeader()
  );

  return response.data;
};


export const deleteMessage = async (id) => {
  const response = await api.delete(
    `/messages/${id}`,
    authHeader()
  );

  return response.data;
};