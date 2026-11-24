export function formatDate(date, options = {}) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(parsedDate);
}

// Format a date range, such as professional experience.
export function formatDateRange(startDate, endDate, isCurrent = false) {
  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : formatDate(endDate);

  if (!start) return end;
  if (!end) return start;

  return `${start} - ${end}`;
}
