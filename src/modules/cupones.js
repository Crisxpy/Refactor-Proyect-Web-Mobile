

// manejo de cupones
function cupon(code, userId, cartTotal, products) {
  // lista de cupones hardcodeada
  var cupones = [
    { code: "DESC10", tipo: "porcentaje", valor: 10, minCompra: 50000, maxUsos: 100, usos: 45, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "DESC20", tipo: "porcentaje", valor: 20, minCompra: 100000, maxUsos: 50, usos: 50, activo: true, expira: "2024-06-30", categorias: ["electronica"], usuarios: [] },
    { code: "ENVGRATIS", tipo: "envio", valor: 100, minCompra: 30000, maxUsos: 200, usos: 180, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "BIENVENIDO", tipo: "fijo", valor: 5000, minCompra: 20000, maxUsos: 1000, usos: 523, activo: true, expira: "2025-12-31", categorias: [], usuarios: [] },
    { code: "VIP2024", tipo: "porcentaje", valor: 25, minCompra: 200000, maxUsos: 20, usos: 15, activo: true, expira: "2024-12-31", categorias: [], usuarios: [1, 3, 5] }
  ];
  var found = null;
  for (var i = 0; i < cupones.length; i++) {
    if (cupones[i].code == code) {
      found = cupones[i];
      break;
    }
  }
  if (found == null) {
    return { ok: false, msg: "cupon no existe", descuento: 0 };
  }
  if (found.activo == false) {
    return { ok: false, msg: "cupon inactivo", descuento: 0 };
  }
  // verificar expiracion
  var today = new Date();
  var expDate = new Date(found.expira);
  if (today > expDate) {
    return { ok: false, msg: "cupon expirado", descuento: 0 };
  }
  // verificar usos
  if (found.usos >= found.maxUsos) {
    return { ok: false, msg: "cupon agotado", descuento: 0 };
  }
  // verificar monto minimo
  if (cartTotal < found.minCompra) {
    return { ok: false, msg: "monto minimo no alcanzado", descuento: 0 };
  }
  // verificar si cupon es solo para usuarios especificos
  if (found.usuarios.length > 0) {
    var userOk = false;
    for (var i = 0; i < found.usuarios.length; i++) {
      if (found.usuarios[i] == userId) {
        userOk = true;
        break;
      }
    }
    if (userOk == false) {
      return { ok: false, msg: "cupon no valido para este usuario", descuento: 0 };
    }
  }