import apiClient from "./apiClient";

// Fetch social links for a specific portfolio profile.
export async function getSocialLinks(profileId) {
  const response = await apiClient.get("/public/social-links", {
    params: {
      profileId,
    },
  });

  return response.data;
}
