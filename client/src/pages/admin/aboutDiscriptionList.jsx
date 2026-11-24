import { useEffect, useState } from "react";
import { getAllAboutSections, updateAboutStatus } from "../api/adminApi";

export default function DescriptionList() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all descriptions
  useEffect(() => {
    let ignore = false;

    const fetchSections = async () => {
      try {
        const data = await getAllAboutSections();

        if (!ignore) {
          setSections(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchSections();

    return () => {
      ignore = true;
    };
  }, []);

  // Activate / Disable description
  const handleStatusChange = async (id, currentStatus) => {
    try {
      setError("");

      await updateAboutStatus(id, !currentStatus);

      // Update the card after successful API response
      setSections((previous) =>
        previous.map((section) =>
          section.contentId === id
            ? { ...section, isActive: !currentStatus }
            : section,
        ),
      );
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Unable to update status",
      );
    }
  };

  if (loading) {
    return <p>Loading descriptions...</p>;
  }

  return (
    <div>
      <h2>All Descriptions</h2>

      {error && <p className="error-message">{error}</p>}

      {sections.length === 0 && <p>No descriptions found.</p>}

      <div className="description-grid">
        {sections.map((section) => (
          <div className="description-card" key={section.contentId}>
            <div className="description-card-header">
              <h3>{section.sectionTitle}</h3>

              <span
                className={
                  section.isActive ? "status-active" : "status-disabled"
                }
              >
                {section.isActive ? "Active" : "Disabled"}
              </span>
            </div>

            <p className="description-content">{section.description}</p>

            <div className="description-meta">
              <small>
                Created:{" "}
                {section.createdAt
                  ? new Date(section.createdAt).toLocaleDateString()
                  : "N/A"}
              </small>

              <small>
                Updated:{" "}
                {section.updatedAt
                  ? new Date(section.updatedAt).toLocaleDateString()
                  : "N/A"}
              </small>
            </div>

            <button
              type="button"
              className="status-link"
              onClick={() =>
                handleStatusChange(section.contentId, section.isActive)
              }
            >
              {section.isActive ? "Disable" : "Set Active"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
