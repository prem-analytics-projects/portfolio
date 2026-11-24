import apiClient from "./apiClient";

// Fetch blog posts for a specific portfolio profile.
export async function getBlogs(profileId) {
  const response = await apiClient.get("/public/blogs", {
    params: {
      profileId,
    },
  });

  return response.data;
}
