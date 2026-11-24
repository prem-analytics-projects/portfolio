// Check whether a value is empty.
export function isRequired(value) {
  return (
    value !== null && value !== undefined && String(value).trim().length > 0
  );
}

// Validate an email address.
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(String(email).trim());
}

// Validate password length.
export function isValidPassword(password, minLength = 8) {
  return typeof password === "string" && password.length >= minLength;
}

// Check whether two password values match.
export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

// Validate a mobile number containing 10 digits.
export function isValidMobile(mobile) {
  const mobileRegex = /^[6-9]\d{9}$/;

  return mobileRegex.test(String(mobile).trim());
}
