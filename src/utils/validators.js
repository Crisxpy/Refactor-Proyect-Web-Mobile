export const isValidEmail = (email) => {
  return (
    typeof email === "string" &&
    email.includes("@") &&
    email.includes(".") &&
    email.trim().length > 5
  );
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.trim().length >= 4;
};

export const isValidNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value) && value > 0;
};

export const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidCouponCode = (code) => {
  return typeof code === "string" && code.trim().length > 0;
};
