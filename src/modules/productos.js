
/// buscar productos
//funcion para buscar productos en la db
  if (action == "buscarProductos") {
    var query = dat;
    var cat = extraDat;
    var minP = moreData ? moreData.min : 0;
    var maxP = moreData ? moreData.max : 999999999;
    var res = [];
    for (var i = 0; i < dbProducts.length; i++) {
      var prod = dbProducts[i];
      var match = false;
      if (prod.activo == false) continue;
      if (query && query != "" && query != null && query != undefined) {
        if (prod.nom.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        if (prod.desc.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        for (var j = 0; j < prod.tags.length; j++) {
          if (prod.tags[j].toLowerCase().indexOf(query.toLowerCase()) != -1) {
            match = true;
          }
        }
      } else {
        match = true;
      }
      if (cat && cat != "" && cat != null && cat != undefined) {
        if (prod.cat != cat) {
          match = false;
        }
      }
      if (prod.prec < minP || prod.prec > maxP) {
        match = false;
      }
      if (match == true) {
        res.push(prod);
      }
    }
    // ordenar por rating
    for (var i = 0; i < res.length - 1; i++) {
      for (var j = 0; j < res.length - i - 1; j++) {
        if (res[j].rating < res[j + 1].rating) {
          var tmp = res[j];
          res[j] = res[j + 1];
          res[j + 1] = tmp;
        }
      }
    }
    cb({ ok: true, msg: "ok", data: res });
    return;
  }

// funcion para buscar (otro duplicado con diferente nombre)
function search(q, filters) {
  var prods = [
    { id: 101, nom: "Laptop Pro 15", cat: "electronica", prec: 1200000, stock: 5, rating: 4.5, activo: true },
    { id: 102, nom: "Mouse Inalambrico", cat: "accesorios", prec: 25000, stock: 50, rating: 4.0, activo: true },
    { id: 103, nom: "Teclado Mecanico RGB", cat: "accesorios", prec: 85000, stock: 20, rating: 4.8, activo: true },
    { id: 104, nom: "Monitor 4K 27\"", cat: "electronica", prec: 450000, stock: 8, rating: 4.6, activo: true },
    { id: 105, nom: "Auriculares Bluetooth", cat: "audio", prec: 75000, stock: 30, rating: 4.3, activo: true }
  ];
  // DATOS DUPLICADOS - exactamente los mismos que en doEverything
  var results = [];
  for (var ii = 0; ii < prods.length; ii++) {
    if (prods[ii].activo == false) continue;
    var m = false;
    if (q && q != "") {
      if (prods[ii].nom.toLowerCase().indexOf(q.toLowerCase()) != -1) m = true;
    } else {
      m = true;
    }
    if (filters && filters.cat && prods[ii].cat != filters.cat) m = false;
    if (filters && filters.maxPrice && prods[ii].prec > filters.maxPrice) m = false;
    if (filters && filters.minPrice && prods[ii].prec < filters.minPrice) m = false;
    if (m == true) results.push(prods[ii]);
  }
  return results;
}
