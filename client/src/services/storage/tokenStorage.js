const TOKEN_KEY = "token";

// Save the authentication token.
export function saveToken(token) {
  if (!token) return;

  localStorage.setItem(TOKEN_KEY, token);
}

// Retrieve the authentication token.
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove the authentication token.
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Check whether a token exists.
export function hasToken() {
  return Boolean(getToken());
}
