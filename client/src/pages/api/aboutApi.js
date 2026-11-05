import apiClient from "./apiClient";

export const getAboutSections = async () => {
  const response = await apiClient.get("/about-sections");

  return response.data;
};
