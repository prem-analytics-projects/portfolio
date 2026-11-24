import apiClient from "./apiClient";

// Fetch education records for a specific profile.
export async function getEducations(profileId) {
  const response = await apiClient.get("/public/educations", {
    params: {
      profileId,
    },
  });

  return response.data;
}
