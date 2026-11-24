const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 15000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export default API_CONFIG;
