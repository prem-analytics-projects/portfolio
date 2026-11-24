import { useState } from "react";
import { addDescription } from "../api/adminApi";

export default function DescriptionForm({ onSuccess }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Count characters after trimming whitespace
  const characterCount = description.trim().length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate character count
    if (characterCount < 250 || characterCount > 300) {
      setMessage("Description must contain between 250 and 300 characters.");
      return;
    }

    try {
      setLoading(true);

      await addDescription(description.trim());

      setDescription("");
      setMessage("Description added successfully!");

      // Refresh the description cards
      onSuccess();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Description</h2>

      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setMessage("");
        }}
        placeholder="Write your description here (250-300 characters)..."
        rows={6}
        required
      />

      <p>Characters: {characterCount} / 300</p>

      {characterCount < 250 && (
        <p>{250 - characterCount} more characters required.</p>
      )}

      {characterCount > 300 && (
        <p>Description exceeds the 300-character limit.</p>
      )}

      {message && <p>{message}</p>}

      <button
        type="submit"
        disabled={loading || characterCount < 250 || characterCount > 300}
      >
        {loading ? "Submitting..." : "Submit Description"}
      </button>
    </form>
  );
}
