export const applyCoupon = (code, cartTotal, userId) => {
  const coupons = [
    {
      code: "DESC10",
      type: "porcentaje",
      value: 10,
      minCompra: 50000,
      maxUsos: 100,
      usos: 45,
      activo: true,
      expira: "2024-12-31",
      categorias: [],
      usuarios: [],
    },
    {
      code: "DESC20",
      type: "porcentaje",
      value: 20,
      minCompra: 100000,
      maxUsos: 50,
      usos: 50,
      activo: true,
      expira: "2024-06-30",
      categorias: ["electronica"],
      usuarios: [],
    },
    {
      code: "ENVGRATIS",
      type: "envio",
      value: 100,
      minCompra: 30000,
      maxUsos: 200,
      usos: 180,
      activo: true,
      expira: "2024-12-31",
      categorias: [],
      usuarios: [],
    },
    {
      code: "BIENVENIDO",
      type: "fijo",
      value: 5000,
      minCompra: 20000,
      maxUsos: 1000,
      usos: 523,
      activo: true,
      expira: "2025-12-31",
      categorias: [],
      usuarios: [],
    },
    {
      code: "VIP2024",
      type: "porcentaje",
      value: 25,
      minCompra: 200000,
      maxUsos: 20,
      usos: 15,
      activo: true,
      expira: "2024-12-31",
      categorias: [],
      usuarios: [1, 3, 5],
    },
  ];

  const coupon = coupons.find((item) => item.code === code);
  if (!coupon) return { ok: false, msg: "Cupón no encontrado", descuento: 0 };
  if (!coupon.activo) return { ok: false, msg: "Cupón inactivo", descuento: 0 };
  const today = new Date();
  const expiration = new Date(coupon.expira);
  if (today > expiration)
    return { ok: false, msg: "Cupón expirado", descuento: 0 };
  if (coupon.usos >= coupon.maxUsos)
    return { ok: false, msg: "Cupón agotado", descuento: 0 };
  if (cartTotal < coupon.minCompra)
    return {
      ok: false,
      msg: `Compra mínima $${coupon.minCompra}`,
      descuento: 0,
    };
  if (coupon.usuarios.length > 0 && !coupon.usuarios.includes(userId))
    return {
      ok: false,
      msg: "Cupón no válido para este usuario",
      descuento: 0,
    };

  let discount = 0;
  if (coupon.type === "porcentaje") {
    discount = cartTotal * (coupon.value / 100);
  } else if (coupon.type === "fijo") {
    discount = Math.min(coupon.value, cartTotal);
  } else if (coupon.type === "envio") {
    discount = coupon.value;
  }

  return {
    ok: true,
    msg: "Cupón aplicado",
    descuento: discount,
    tipo: coupon.type,
  };
};

export const calculateShipping = (
  destCity,
  weight,
  prodType = "normal",
  isUrgent = false,
  hasInsurance = false,
  isFree = false,
) => {
  if (isFree) return { costo: 0, base: 0, urgente: 0, seguro: 0 };
  const cityMultiplier = {
    Santiago: 1,
    Valparaiso: 1.2,
    Concepcion: 1.4,
    "La Serena": 1.6,
    Antofagasta: 1.8,
    Iquique: 2.0,
    "Punta Arenas": 2.5,
  };
  const weightCost =
    weight <= 1
      ? 2000
      : weight <= 5
        ? 3500
        : weight <= 10
          ? 5000
          : weight <= 20
            ? 8000
            : 12000;
  const typeMultiplier =
    prodType === "fragil" ? 1.5 : prodType === "electronico" ? 1.3 : 1;
  const base = weightCost * typeMultiplier * (cityMultiplier[destCity] ?? 1);
  const urgente = isUrgent ? base * 0.5 : 0;
  const seguro = hasInsurance ? base * 0.1 : 0;
  return { costo: base + urgente + seguro, base, urgente, seguro };
};
