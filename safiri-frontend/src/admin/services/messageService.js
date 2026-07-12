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