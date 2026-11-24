import apiClient from "./apiClient";

// Fetch publicly available portfolio profiles.
export async function getProfiles() {
  const response = await apiClient.get("/public/profiles");
  return response.data;
}

// Fetch public website settings.
export async function getWebsiteSettings() {
  const response = await apiClient.get("/public/website-settings");
  return response.data;
}
