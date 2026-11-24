import apiClient from "./apiClient";

// Fetch professional experience for a specific profile.
export async function getExperiences(profileId) {
  const response = await apiClient.get("/public/experiences", {
    params: {
      profileId,
    },
  });

  return response.data;
}

// Fetch company information.
export async function getCompanies() {
  const response = await apiClient.get("/public/companies");

  return response.data;
}
