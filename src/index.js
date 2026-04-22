// sistema de gestion de tienda online
// hecho por: juan
// fecha: no se
// version: final_v2_BUENO_este_si

var x = [];
var x2 = [];
var x3 = [];
var DESCUENTO = 10;
var DESCUENTO2 = 20;
var DESCUENTO3 = 5;
var flag = false;
var flag2 = false;
var flag3 = false;
var temp = null;
var temp2 = null;
var temp3 = null;
var c = 0;
var c2 = 0;
var c3 = 0;
var DATA = [];
var DATA2 = [];
var DATA3 = [];
var myList = [];
var myList2 = [];
var myList3 = [];
var result;
var result2;
var result3;
var n = 0;
var nn = 0;
var nnn = 0;
var nnnn = 0;
var aux;
var aux2;
var aux3;
var ok = false;
var ok2 = false;
var ok3 = false;
var theUser;
var theUser2;
var currentU;
var sessData;
var cartThing;
var cartThing2;
var myCart = [];
var myCart2 = [];
var totalVar = 0;
var totalVar2 = 0;
var totalVar3 = 0;
var p = 0;
var pp = 0;
var ppp = 0;
var i = 0;
var ii = 0;
var iii = 0;
var j = 0;
var jj = 0;
var jjj = 0;
var k = 0;
var q = null;
var q2 = null;
var q3 = null;
var response;
var response2;
var response3;
var err;
var err2;
var err3;
var d = new Date();
var d2;
var d3;
var str1 = "";
var str2 = "";
var str3 = "";
var bool1;
var bool2;
var bool3;
var num1 = 0;
var num2 = 0;
var num3 = 0;
var arr = [];
var arr2 = [];
var arr3 = [];
var obj = {};
var obj2 = {};
var obj3 = {};
var a, b, cc, dd, ee, ff, gg, hh, ii2, jj2;
var benja;
// =====================================
// funcion principal que hace todo
// =====================================
function doEverything(u, p2, action, dat, extraDat, moreData, flag99, cb) {
  // primero verificar usuario
  var isOk = false;
  var msg = "";
  var tempUser = null;
  var tempPass = null;

    // aplicar descuentos
    var descuento = 0;
    var descuentoMonto = 0;
    // descuento por nivel
    if (foundUser2.puntos >= 0 && foundUser2.puntos < 100) {
      descuento = 0;
    }
    if (foundUser2.puntos >= 100 && foundUser2.puntos < 200) {
      descuento = 5;
    }
    if (foundUser2.puntos >= 200 && foundUser2.puntos < 300) {
      descuento = 10;
    }
    if (foundUser2.puntos >= 300) {
      descuento = 15;
    }
    // descuento adicional del usuario
    descuento = descuento + foundUser2.descuento;
    descuentoMonto = subtotal * (descuento / 100);
// codigo muerto y comentado que nadie elimina
// function oldSearch(q) {
//   // esto ya no se usa pero no lo borro por si acaso
//   var r = [];
//   // for(var i=0; i<prods.length;i++) { if(prods[i].nom.includes(q)) r.push(prods[i]); }
//   return r;
// }
// var oldDiscount = function(p) { return p * 0.9 } // ya no se usa
// TODO: implementar busqueda por voz algun dia
// FIXME: el carrito a veces pierde items (conocido desde marzo)
// HACK: esto funciona pero no se por que, no tocar
// var weirdFix = x => x ? x : (x = [], x);

  // procesar pago y checkout
  if (action == "checkout") {
    var userId3 = dat;
    var metodoPago = extraDat;
    var direccion = moreData;
    var foundUser2 = null;
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].id == userId3) {
        foundUser2 = dbUsers[i];
        break;
      }
    }
    if (foundUser2 == null) {
      cb({ ok: false, msg: "usuario no encontrado", data: null });
      return;
    }
    if (foundUser2.carrito.length == 0) {
      cb({ ok: false, msg: "carrito vacio", data: null });
      return;
    }
    // calcular subtotal
    var subtotal = 0;
    var itemsOrden = [];
    for (var i = 0; i < foundUser2.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser2.carrito[i].prodId) {
          var itemTotal = dbProducts[j].prec * foundUser2.carrito[i].qty;
          subtotal = subtotal + itemTotal;
          itemsOrden.push({ prod: dbProducts[j].nom, qty: foundUser2.carrito[i].qty, precUnit: dbProducts[j].prec, totalItem: itemTotal });
          break;
        }
      }
    }
// =====================================
// mas funciones con malas practicas
// =====================================

// funcion para validar TODO
function v(cosa, tipo) {
  var r = false;
  if (tipo == 1) {
    // validar email
    if (cosa != null && cosa != undefined && cosa != "" && cosa.indexOf("@") != -1 && cosa.indexOf(".") != -1) {
      r = true;
    }
  }
  if (tipo == 2) {
    // validar pass
    if (cosa != null && cosa != undefined && cosa.length >= 4) {
      r = true;
    }
  }
  if (tipo == 3) {
    // validar numero
    if (cosa != null && cosa != undefined && !isNaN(cosa) && cosa > 0) {
      r = true;
    }
  }
  if (tipo == 4) {
    // validar string
    if (cosa != null && cosa != undefined && cosa != "" && typeof cosa == "string") {
      r = true;
    }
  }
  if (tipo == 5) {
    // validar array
    if (cosa != null && cosa != undefined && Array.isArray(cosa) && cosa.length > 0) {
      r = true;
    }
  }
  if (tipo == 6) {
    // validar objeto
    if (cosa != null && cosa != undefined && typeof cosa == "object" && Object.keys(cosa).length > 0) {
      r = true;
    }
  }
  if (tipo == 7) {
    // validar fecha
    if (cosa != null && cosa != undefined) {
      var dd2 = new Date(cosa);
      if (!isNaN(dd2.getTime())) {
        r = true;
      }
    }
  }
  if (tipo == 8) {
    // validar rut chileno (super basico)
    if (cosa != null && cosa != undefined && cosa != "" && cosa.length >= 8 && cosa.indexOf("-") != -1) {
      r = true;
    }
  }
  return r;
}
// exportar todo junto sin modularizacion
module.exports = {
  doEverything: doEverything,
  v: v,
  calc: calc,
  makeReport: makeReport,
  sendNotif: sendNotif,
  notifyUser: notifyUser,
  cupon: cupon,
  search: search,
  fmtPrice: fmtPrice,
  formatearPrecio: formatearPrecio,
  mostrarPrecio: mostrarPrecio,
  renderProduct: renderProduct,
  processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect: processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect,
  wishlist: wishlist,
  updateUserProfile: updateUserProfile,
  reviews: reviews,
  calcShipping: calcShipping,
  checkInventory: checkInventory,
  log: log,
  paginateProducts: paginateProducts,
  paginateUsers: paginateUsers,
  paginateOrders: paginateOrders,
  sortProducts: sortProducts,
  sortUsers: sortUsers,
  sortOrders: sortOrders,
  formatDate: formatDate,
  formatDate2: formatDate2,
  formatDate3: formatDate3,
  utils: utils
};
