const USER_KEY = "portfolio-user";

// Save the logged-in user's information.
export function saveUser(user) {
  if (!user) return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Retrieve the logged-in user's information.
export function getUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

// Remove the logged-in user's information.
export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Check whether user information exists.
export function hasUser() {
  return Boolean(getUser());
}
