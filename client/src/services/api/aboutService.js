import apiClient from "./apiClient";

// Fetch About Me content for a specific profile.
export async function getAboutContent(profileId) {
  const response = await apiClient.get("/public/about-content", {
    params: {
      profileId,
    },
  });

  return response.data;
}
