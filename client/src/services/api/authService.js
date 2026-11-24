import apiClient from "./apiClient";

// Register a new user.
export async function signupUser(userData) {
  const response = await apiClient.post("/auth/signup", userData);
  return response.data;
}

// Verify the user's email.
export async function verifyEmail(token) {
  const response = await apiClient.post("/auth/verify-email", {
    token,
  });

  return response.data;
}

// Authenticate an existing user.
export async function loginUser(loginData) {
  const response = await apiClient.post("/auth/login", loginData);
  return response.data;
}
