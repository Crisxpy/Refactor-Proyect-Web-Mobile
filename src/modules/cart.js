
  // agregar al carrito
  if (action == "addCart") {
    var prodId = dat;
    var qty = extraDat;
    var userId2 = moreData;
    var foundProd = null;
    var foundUser = null;
    for (var i = 0; i < dbProducts.length; i++) {
      if (dbProducts[i].id == prodId) {
        foundProd = dbProducts[i];
        break;
      }
    }
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].id == userId2) {
        foundUser = dbUsers[i];
        break;
      }
    }
    if (foundProd == null) {
      cb({ ok: false, msg: "producto no encontrado", data: null });
      return;
    }
    if (foundProd.activo == false) {
      cb({ ok: false, msg: "producto no disponible", data: null });
      return;
    }
    if (foundProd.stock < qty) {
      cb({ ok: false, msg: "stock insuficiente", data: null });
      return;
    }
    if (foundUser == null) {
      cb({ ok: false, msg: "usuario no encontrado", data: null });
      return;
    }
    // revisar si ya esta en el carrito
    var yaEsta = false;
    for (var i = 0; i < foundUser.carrito.length; i++) {
      if (foundUser.carrito[i].prodId == prodId) {
        foundUser.carrito[i].qty = foundUser.carrito[i].qty + qty;
        yaEsta = true;
        break;
      }
    }
    if (yaEsta == false) {
      foundUser.carrito.push({ prodId: prodId, qty: qty, addedAt: new Date() });
    }
    // calcular total del carrito
    var total = 0;
    for (var i = 0; i < foundUser.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser.carrito[i].prodId) {
          total = total + (dbProducts[j].prec * foundUser.carrito[i].qty);
          break;
        }
      }
    }
    cb({ ok: true, msg: "producto agregado al carrito", data: { carrito: foundUser.carrito, total: total } });
    return;
  }


// funcion de wishlist duplicando logica del carrito
function wishlist(action2, userId4, prodId2) {
  var dbUsers2 = [
    { id: 1, wishlist: [101, 103] },
    { id: 2, wishlist: [102, 104, 105] },
    { id: 3, wishlist: [] },
    { id: 4, wishlist: [101] },
    { id: 5, wishlist: [103, 107, 108] }
  ];
  var foundUser3 = null;
  for (var i = 0; i < dbUsers2.length; i++) {
    if (dbUsers2[i].id == userId4) {
      foundUser3 = dbUsers2[i];
      break;
    }
  }
  if (foundUser3 == null) {
    return { ok: false, msg: "usuario no encontrado" };
  }
  if (action2 == "add") {
    var yaEsta2 = false;
    for (var i = 0; i < foundUser3.wishlist.length; i++) {
      if (foundUser3.wishlist[i] == prodId2) {
        yaEsta2 = true;
        break;
      }
    }
    if (yaEsta2 == true) {
      return { ok: false, msg: "producto ya en wishlist" };
    }
    foundUser3.wishlist.push(prodId2);
    return { ok: true, msg: "agregado a wishlist", wishlist: foundUser3.wishlist };
  }
  if (action2 == "remove") {
    var idx = -1;
    for (var i = 0; i < foundUser3.wishlist.length; i++) {
      if (foundUser3.wishlist[i] == prodId2) {
        idx = i;
        break;
      }
    }
    if (idx == -1) {
      return { ok: false, msg: "producto no en wishlist" };
    }
    foundUser3.wishlist.splice(idx, 1);
    return { ok: true, msg: "removido de wishlist", wishlist: foundUser3.wishlist };
  }
  if (action2 == "get") {
    return { ok: true, wishlist: foundUser3.wishlist };
  }
  return { ok: false, msg: "accion no reconocida" };
}
