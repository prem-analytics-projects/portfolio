export function formatCurrency(amount, currency = "INR", locale = "en-IN") {
  if (amount === null || amount === undefined || amount === "") {
    return "";
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return "";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}
