import apiClient from "./apiClient";

// Fetch all registered users.
export async function getAllUsers() {
  const response = await apiClient.get("/admin/users");
  return response.data;
}

// Update a user's approval status.
export async function updateUserStatus(userId, status) {
  const response = await apiClient.post(`/admin/users/${userId}/status`, {
    approvalStatus: status,
  });

  return response.data;
}

// Delete a user.
export async function deleteUser(userId) {
  const response = await apiClient.delete(`/admin/users/${userId}`);

  return response.data;
}
