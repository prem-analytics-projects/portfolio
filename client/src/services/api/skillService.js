import apiClient from "./apiClient";

// Fetch skills for a specific portfolio profile.
export async function getSkills(profileId) {
  const response = await apiClient.get("/public/skills", {
    params: {
      profileId,
    },
  });

  return response.data;
}

// Fetch all available skill categories.
export async function getSkillCategories() {
  const response = await apiClient.get("/public/skill-categories");

  return response.data;
}
