export const formatPrice = (price) => {
  const value = Number(price) || 0;
  return "$" + value.toLocaleString("es-CL", { minimumFractionDigits: 0 });
};

export const formatDateTime = (date) => {
  const input = typeof date === "string" ? new Date(date) : date;
  if (!(input instanceof Date) || Number.isNaN(input.getTime())) return "";
  const day = String(input.getDate()).padStart(2, "0");
  const month = String(input.getMonth() + 1).padStart(2, "0");
  const year = input.getFullYear();
  const hours = String(input.getHours()).padStart(2, "0");
  const mins = String(input.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${mins}`;
};

export const formatDate = (date) => {
  const input = typeof date === "string" ? new Date(date) : date;
  if (!(input instanceof Date) || Number.isNaN(input.getTime())) return "";
  const day = String(input.getDate()).padStart(2, "0");
  const month = String(input.getMonth() + 1).padStart(2, "0");
  const year = input.getFullYear();
  return `${day}/${month}/${year}`;
};
