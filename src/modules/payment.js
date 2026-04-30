import { dbUsers, dbProducts } from "../data/database.js";
import { calculateShipping } from "./cupones.js";
import { isValidNumber } from "../utils/validators.js";
import { notifyUser } from "./notifications.js";

const computeSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const product = dbProducts.find((prod) => prod.id === item.prodId);
    return total + (product ? product.prec * item.qty : 0);
  }, 0);
};

export const calculatePrice = ({
  subtotal,
  discount = 0,
  shipping = 0,
  iva = true,
}) => {
  const afterDiscount = Math.max(0, subtotal - discount);
  const tax = iva ? afterDiscount * 0.19 : 0;
  const total = afterDiscount + tax + shipping;
  return { subtotal, discount, afterDiscount, iva: tax, shipping, total };
};

export const checkout = (
  userId,
  paymentMethod,
  paymentData = {},
  shippingData = {},
) => {
  const user = dbUsers.find((item) => item.id === userId);
  if (!user) return { ok: false, msg: "Usuario no encontrado" };
  if (!Array.isArray(user.carrito) || user.carrito.length === 0)
    return { ok: false, msg: "El carrito está vacío" };

  const shippingWeight = isValidNumber(shippingData.weight)
    ? shippingData.weight
    : 1;
  const subtotal = computeSubtotal(user.carrito);
  const shipping = calculateShipping(
    shippingData.destCity || "Santiago",
    shippingWeight,
    shippingData.prodType,
    shippingData.isUrgent,
    shippingData.hasInsurance,
    shippingData.isFree,
  );
  const priceDetails = calculatePrice({
    subtotal,
    discount: shippingData.discount || 0,
    shipping: shipping.costo,
    iva: true,
  });

  if (paymentMethod === "tarjeta") {
    if (
      !paymentData.numero ||
      !paymentData.cvv ||
      paymentData.numero.length !== 16 ||
      paymentData.cvv.length !== 3
    ) {
      return { ok: false, msg: "Datos de tarjeta inválidos" };
    }
  }

  if (
    paymentMethod !== "tarjeta" &&
    paymentMethod !== "transferencia" &&
    paymentMethod !== "efectivo"
  ) {
    return { ok: false, msg: "Método de pago no válido" };
  }

  user.carrito.forEach((item) => {
    const product = dbProducts.find((prod) => prod.id === item.prodId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.qty);
    }
  });

  const order = {
    id: `ORD-${Date.now()}`,
    userId,
    items: user.carrito.map((item) => ({ prodId: item.prodId, qty: item.qty })),
    subtotal,
    shipping: shipping.costo,
    total: priceDetails.total,
    metodoPago: paymentMethod,
    status: "pagado",
    createdAt: new Date().toISOString(),
  };

  const points = Math.floor(priceDetails.total / 1000);
  user.puntos += points;
  user.historial.push(order);
  user.carrito = [];

  notifyUser(
    "email",
    userId,
    `Tu orden ${order.id} quedó registrada (total ${priceDetails.total}).`,
    { orderId: order.id, total: priceDetails.total },
  );

  return {
    ok: true,
    msg: "Pedido creado con éxito",
    data: { order, priceDetails, points },
  };
};
