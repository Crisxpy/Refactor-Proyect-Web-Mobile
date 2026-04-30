import { dbUsers, dbProducts } from "../data/database.js";

export const getCart = (userId) => {
  const user = dbUsers.find((item) => item.id === userId);
  if (!user) return { ok: false, msg: "Usuario no encontrado", cart: [] };
  const items = user.carrito.map((entry) => {
    const product = dbProducts.find((item) => item.id === entry.prodId);
    return {
      prodId: entry.prodId,
      qty: entry.qty,
      addedAt: entry.addedAt,
      product: product
        ? {
            id: product.id,
            nom: product.nom,
            prec: product.prec,
            stock: product.stock,
          }
        : null,
    };
  });
  const total = items.reduce(
    (sum, item) => sum + (item.product ? item.product.prec * item.qty : 0),
    0,
  );
  return { ok: true, cart: items, total };
};

export const addToCart = (userId, prodId, qty = 1) => {
  const user = dbUsers.find((item) => item.id === userId);
  const product = dbProducts.find((item) => item.id === prodId);
  if (!user) return { ok: false, msg: "Usuario no encontrado" };
  if (!product || !product.activo)
    return { ok: false, msg: "Producto no disponible" };
  if (product.stock < qty) return { ok: false, msg: "Stock insuficiente" };
  const existing = user.carrito.find((item) => item.prodId === prodId);
  if (existing) {
    existing.qty += qty;
  } else {
    user.carrito.push({ prodId, qty, addedAt: new Date().toISOString() });
  }
  return getCart(userId);
};

export const removeFromCart = (userId, prodId) => {
  const user = dbUsers.find((item) => item.id === userId);
  if (!user) return { ok: false, msg: "Usuario no encontrado" };
  user.carrito = user.carrito.filter((item) => item.prodId !== prodId);
  return getCart(userId);
};

export const clearCart = (userId) => {
  const user = dbUsers.find((item) => item.id === userId);
  if (!user) return { ok: false, msg: "Usuario no encontrado" };
  user.carrito = [];
  return { ok: true, msg: "Carrito vaciado", cart: [] };
};
