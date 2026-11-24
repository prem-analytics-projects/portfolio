import apiClient from "./apiClient";

// Add description
export const addDescription = async (description) => {
  const response = await apiClient.post("/admin/about-content", {
    description,
  });

  return response.data;
};

// Fetch all descriptions
export const getAllAboutSections = async () => {
  const response = await apiClient.get("/admin/about-content");

  return response.data;
};

// Activate or disable description
export const updateAboutStatus = async (contentId, isActive) => {
  const response = await apiClient.patch(
    `/admin/about-content/${contentId}/status`,
    { isActive },
  );

  return response.data;
};
