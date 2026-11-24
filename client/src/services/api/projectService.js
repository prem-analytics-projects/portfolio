import apiClient from "./apiClient";

// Fetch projects for a specific portfolio profile.
export async function getProjects(profileId) {
  const response = await apiClient.get("/public/projects", {
    params: {
      profileId,
    },
  });

  return response.data;
}
