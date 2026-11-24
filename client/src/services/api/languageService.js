import apiClient from "./apiClient";

// Fetch languages for a specific portfolio profile.
export async function getLanguages(profileId) {
  const response = await apiClient.get("/public/languages", {
    params: {
      profileId,
    },
  });

  return response.data;
}
