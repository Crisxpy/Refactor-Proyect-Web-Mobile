


function cupones(code, userId, cartTotal, products) {
  const cupones = [
    { code: "DESC10", tipo: "porcentaje", valor: 10, minCompra: 50000, maxUsos: 100, usos: 45, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "DESC20", tipo: "porcentaje", valor: 20, minCompra: 100000, maxUsos: 50, usos: 50, activo: true, expira: "2024-06-30", categorias: ["electronica"], usuarios: [] },
    { code: "ENVGRATIS", tipo: "envio", valor: 100, minCompra: 30000, maxUsos: 200, usos: 180, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "BIENVENIDO", tipo: "fijo", valor: 5000, minCompra: 20000, maxUsos: 1000, usos: 523, activo: true, expira: "2025-12-31", categorias: [], usuarios: [] },
    { code: "VIP2024", tipo: "porcentaje", valor: 25, minCompra: 200000, maxUsos: 20, usos: 15, activo: true, expira: "2024-12-31", categorias: [], usuarios: [1, 3, 5] }
  ];

  const fail = (msg) => ({ ok: false, msg, descuento: 0 });

  const found = cupones.find(c => c.code === code);

  if (!found) return fail("cupon no existe");
  if (!found.activo) return fail("cupon inactivo");

  const today = new Date();
  const expDate = new Date(found.expira);

  if (today > expDate) return fail("cupon expirado");
  if (found.usos >= found.maxUsos) return fail("cupon agotado");
  if (cartTotal < found.minCompra) return fail("monto minimo no alcanzado");

  if (found.usuarios.length > 0 && !found.usuarios.includes(userId)) {
    return fail("cupon no valido para este usuario");
  }

  return { ok: true, msg: "cupon valido", descuento: 0 };
}