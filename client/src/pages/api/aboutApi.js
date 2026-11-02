import apiClient from "./apiClient";

export const getAboutData = async () => {
  return await apiClient.get("/about");
};
