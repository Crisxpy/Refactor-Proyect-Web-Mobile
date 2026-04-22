
// funcion para generar html de producto (mezcla logica con presentacion)
function renderProduct(p) {
  var html = "";
  html += "<div class='product-card'>";
  html += "<div class='product-img'>";
  html += "<img src='" + p.imgs[0] + "' alt='" + p.nom + "'>";
  if (p.stock <= 0) {
    html += "<div class='badge-agotado'>AGOTADO</div>";
  }
  if (p.stock > 0 && p.stock <= 5) {
    html += "<div class='badge-poco-stock'>ÚLTIMAS " + p.stock + " UNIDADES</div>";
  }
  html += "</div>";
  html += "<div class='product-info'>";
  html += "<h3>" + p.nom + "</h3>";
  html += "<div class='rating'>";
  // generar estrellas
  var stars = "";
  for (var i = 0; i < 5; i++) {
    if (i < Math.floor(p.rating)) {
      stars += "★";
    } else if (i < p.rating) {
      stars += "☆";
    } else {
      stars += "☆";
    }
  }
  html += stars;
  html += " (" + p.rating + ")";
  html += "</div>";
  html += "<p class='desc'>" + p.desc + "</p>";
  html += "<div class='price'>" + fmtPrice(p.prec) + "</div>";
  html += "<div class='category'>Categoría: " + p.cat + "</div>";
  if (p.activo == true && p.stock > 0) {
    html += "<button onclick='addToCart(" + p.id + ", 1)' class='btn-cart'>Agregar al carrito</button>";
  } else {
    html += "<button disabled class='btn-cart-disabled'>No disponible</button>";
  }
  html += "</div>";
  html += "</div>";
  return html;
}
