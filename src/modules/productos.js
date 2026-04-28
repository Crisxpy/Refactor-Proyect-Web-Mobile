function buscarProductos(productos, filtros = {}) {
  // Preparar filtros de busqueda (como no se definieron los limites de precio se dejan los mismos que el problema original).
  const {
    query = "",
    categoria = "",
    precioMin = 0,
    precioMax = 999999999
  } = filtros;

  const texto = String(query).trim().toLowerCase();
  const categoriaBuscada = String(categoria).trim().toLowerCase();
  const min = Number(precioMin);
  const max = Number(precioMax);

  // Filtrar productos activos que coincidan con texto, categoria y precio.
  const resultados = productos.filter((producto) => {
    const nombre = producto.nom ? producto.nom.toLowerCase() : "";
    const descripcion = producto.desc ? producto.desc.toLowerCase() : "";
    const tags = Array.isArray(producto.tags) ? producto.tags : [];

    const coincideTexto =
      texto === "" ||
      nombre.includes(texto) ||
      descripcion.includes(texto) ||
      tags.some((tag) => tag.toLowerCase().includes(texto));

    const coincideCategoria =
      categoriaBuscada === "" || String(producto.cat).toLowerCase() === categoriaBuscada;

    const coincidePrecio = producto.prec >= min && producto.prec <= max;

    return producto.activo !== false && coincideTexto && coincideCategoria && coincidePrecio;
  });

  // Ordenar resultados por mejor rating.
  return ordenarProductos(resultados, { campo: "rating", orden: "desc" });
}

function ordenarProductos(productos, opciones = {}) {
  // Crear una copia para no modificar el arreglo original.
  const { campo = "rating", orden = "desc" } = opciones;
  const lista = productos.slice();

  // Ordenar por el campo solicitado.
  lista.sort((productoA, productoB) => {
    if (orden === "asc") {
      if (productoA[campo] < productoB[campo]) return -1;
      if (productoA[campo] > productoB[campo]) return 1;
      return 0;
    }

    if (productoA[campo] > productoB[campo]) return -1;
    if (productoA[campo] < productoB[campo]) return 1;
    return 0;
  });

  return lista;
}

function paginarProductos(productos, opciones = {}) {
  // Validar pagina y cantidad por pagina.
  const { pagina = 1, cantidad = 10 } = opciones;
  const paginaActual = Number(pagina) > 0 ? Number(pagina) : 1;
  const cantidadPorPagina = Number(cantidad) > 0 ? Number(cantidad) : 10;

  // Calcular rango de elementos.
  const total = productos.length;
  const totalPaginas = Math.ceil(total / cantidadPorPagina);
  const inicio = (paginaActual - 1) * cantidadPorPagina;
  const fin = inicio + cantidadPorPagina;

  // Devolver productos de la pagina actual con metadata.
  return {
    items: productos.slice(inicio, fin),
    pagina: paginaActual,
    totalPaginas: totalPaginas,
    total: total,
    cantidad: cantidadPorPagina,
    tienePaginaAnterior: paginaActual > 1,
    tienePaginaSiguiente: paginaActual < totalPaginas
  };
}

function renderProduct(producto) {
  // Preparar datos visuales del producto.
  let html = "";
  const precio = "$" + producto.prec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const estrellas = Array.from({ length: 5 }, (_, i) => {
    return i < Math.floor(producto.rating) ? "*" : "-";
  }).join("");

  // Crear contenedor principal.
  html += "<div class='product-card'>";
  html += "<div class='product-img'>";
  html += "<img src='" + producto.imgs[0] + "' alt='" + producto.nom + "'>";

  // Agregar etiquetas segun stock.
  if (producto.stock <= 0) {
    html += "<div class='badge-agotado'>AGOTADO</div>";
  }

  if (producto.stock > 0 && producto.stock <= 5) {
    html += "<div class='badge-poco-stock'>ULTIMAS " + producto.stock + " UNIDADES</div>";
  }

  html += "</div>";
  html += "<div class='product-info'>";
  html += "<h3>" + producto.nom + "</h3>";

  // Mostrar rating, descripcion, precio y categoria.
  html += "<div class='rating'>";
  html += estrellas;
  html += " (" + producto.rating + ")";
  html += "</div>";
  html += "<p class='desc'>" + producto.desc + "</p>";
  html += "<div class='price'>" + precio + "</div>";
  html += "<div class='category'>Categoria: " + producto.cat + "</div>";

  // Mostrar accion disponible segun stock y estado.
  if (producto.activo === true && producto.stock > 0) {
    html += "<button onclick='addToCart(" + producto.id + ", 1)' class='btn-cart'>Agregar al carrito</button>";
  } else {
    html += "<button disabled class='btn-cart-disabled'>No disponible</button>";
  }

  html += "</div>";
  html += "</div>";

  return html;
}

module.exports = {
  buscarProductos,
  ordenarProductos,
  paginarProductos,
  renderProduct
};

/*
Codigo original pendiente de reemplazar progresivamente.

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
*/
