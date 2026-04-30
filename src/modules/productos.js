import { dbProducts, dbReviews } from "../data/database.js";

export const getProducts = () => {
  return dbProducts.filter((product) => product.activo);
};

export const getProductById = (productId) => {
  return dbProducts.find((product) => product.id === productId) || null;
};

export const getReviewsForProduct = (productId) => {
  return dbReviews.filter((r) => r.prodId === productId);
};

export const searchProducts = ({
  query = "",
  category = "",
  minPrice = 0,
  maxPrice = Infinity,
} = {}) => {
  const normalizedQuery = query.trim().toLowerCase();
  return dbProducts
    .filter((product) => product.activo)
    .filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.nom.toLowerCase().includes(normalizedQuery) ||
        product.desc.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      const matchesCategory = !category || product.cat === category;
      const matchesPrice = product.prec >= minPrice && product.prec <= maxPrice;
      return matchesQuery && matchesCategory && matchesPrice;
    })
    .sort((a, b) => b.rating - a.rating);
};
