export default function getErrorMessage(
  error,
  fallbackMessage = "Something went wrong. Please try again.",
) {
  // Handle API errors returned by Axios.
  const responseMessage = error?.response?.data?.message;

  if (responseMessage) {
    return responseMessage;
  }

  // Handle errors returned as plain strings.
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  // Handle standard JavaScript errors.
  if (error?.message) {
    return error.message;
  }

  return fallbackMessage;
}
