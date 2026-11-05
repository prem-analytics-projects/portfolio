import apiClient from "./apiClient";

// Signup API
export async function signupUser(userData) {
  const response = await apiClient.post("/auth/signup", userData);

  return response.data;
}

// Email verification API
export async function verifyEmail(token) {
  const response = await apiClient.post("/auth/verify-email", {
    token: token,
  });

  return response.data;
}

// Login API
export async function loginUser(loginData) {
  const response = await apiClient.post("/auth/login", loginData);

  return response.data;
}

// Fetch all registered users
export async function getAllUsers() {
  const response = await apiClient.get("/admin/users");

  return response.data;
}

// Update user approval status
export async function updateUserStatus(userId, status) {
  const response = await apiClient.post(`/admin/users/${userId}/status`, {
    approvalStatus: status,
  });

  return response.data;
}

// Delete user
export async function deleteUser(userId) {
  const response = await apiClient.delete(`/admin/users/${userId}`);

  return response.data;
}
