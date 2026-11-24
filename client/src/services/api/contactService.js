import apiClient from "./apiClient";

// Fetch contact details for a specific portfolio profile.
export async function getContactDetails(profileId) {
  const response = await apiClient.get("/public/contact-details", {
    params: {
      profileId,
    },
  });

  return response.data;
}

// Submit a message through the public contact form.
export async function submitContactMessage(messageData) {
  const response = await apiClient.post(
    "/public/contact-messages",
    messageData,
  );

  return response.data;
}
