import { login } from "../autenticacion/authService.js";
import { searchProducts, getReviewsForProduct } from "../modules/productos.js";
import { addToCart, getCart, clearCart } from "../modules/cart.js";
import { checkout } from "../modules/payment.js";
import { formatPrice } from "../utils/formatters.js";

const state = {
  user: null,
  cartCount: 0,
  products: [],
  currentProducts: [],
};

const elements = {
  productList: document.getElementById("productList"),
  cartList: document.getElementById("cartList"),
  cartCount: document.getElementById("cartCount"),
  searchQuery: document.getElementById("searchQuery"),
  searchCategory: document.getElementById("searchCategory"),
  btnSearch: document.getElementById("btnSearch"),
  btnShowLogin: document.getElementById("btnShowLogin"),
  btnShowCart: document.getElementById("btnShowCart"),
  btnLogin: document.getElementById("btnLogin"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  loginMessage: document.getElementById("loginMessage"),
  loginSection: document.getElementById("loginSection"),
  cartSection: document.getElementById("cartSection"),
  checkoutSection: document.getElementById("checkoutSection"),
  btnCheckout: document.getElementById("btnCheckout"),
  btnClearCart: document.getElementById("btnClearCart"),
};

const starRow = (ratingVal) => {
  let s = "";
  const r = Number(ratingVal) || 0;
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(r)) s += "★";
    else if (i < r) s += "☆";
    else s += "☆";
  }
  return `${s} (${r})`;
};

const renderProductCard = (product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const imageWrap = document.createElement("div");
  if (product.stock <= 0) {
    const b = document.createElement("span");
    b.className = "badge-stock badge-agotado";
    b.textContent = "AGOTADO";
    imageWrap.appendChild(b);
  }

  const info = document.createElement("div");
  info.className = "product-info";
  const title = document.createElement("h3");
  title.textContent = product.nom;
  const rating = document.createElement("div");
  rating.className = "rating";
  rating.textContent = starRow(product.rating);
  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = product.desc;
  const price = document.createElement("div");
  price.className = "price";
  price.textContent = formatPrice(product.prec);
  const category = document.createElement("div");
  category.className = "category";
  category.textContent = `Categoría: ${product.cat}`;

  const reviewsWrap = document.createElement("div");
  reviewsWrap.className = "reviews-block";
  const revs = getReviewsForProduct(product.id);
  reviewsWrap.innerHTML =
    revs.length === 0
      ? "<strong>Reviews:</strong> nadie opinó todavía."
      : `<strong>Reviews (${revs.length}):</strong>`;
  if (revs.length > 0) {
    const ul = document.createElement("ul");
    revs.slice(0, 3).forEach((r) => {
      const li = document.createElement("li");
      li.textContent = `${r.rating}/5 — ${r.comment}`;
      ul.appendChild(li);
    });
    reviewsWrap.appendChild(ul);
  }

  const button = document.createElement("button");
  button.className =
    product.activo && product.stock > 0
      ? "btn btn-primary"
      : "btn btn-secondary";
  button.textContent =
    product.activo && product.stock > 0
      ? "Agregar al carrito"
      : "No disponible";
  button.disabled = !product.activo || product.stock <= 0;
  button.addEventListener("click", async () => {
    const result = addToCart(state.user ? state.user.id : 1, product.id, 1);
    if (result.ok) {
      state.cartCount = result.cart.length;
      elements.cartCount.textContent = state.cartCount;
      renderCart();
    }
  });

  info.append(title, rating, desc, price, category, reviewsWrap, button);
  card.append(imageWrap, info);
  return card;
};

const renderProductList = (products) => {
  elements.productList.innerHTML = "";
  if (products.length === 0) {
    elements.productList.textContent = "No se encontraron productos.";
    return;
  }
  products.forEach((product) => {
    elements.productList.appendChild(renderProductCard(product));
  });
};

const renderCart = () => {
  const cart = getCart(state.user ? state.user.id : 1);
  elements.cartList.innerHTML = "";
  if (!cart.ok || cart.cart.length === 0) {
    elements.cartList.textContent = "El carrito está vacío.";
    elements.cartCount.textContent = 0;
    state.cartCount = 0;
    return;
  }
  elements.cartCount.textContent = cart.cart.length;
  state.cartCount = cart.cart.length;
  cart.cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    const label = document.createElement("div");
    label.textContent = `${item.product.nom} x ${item.qty}`;
    const price = document.createElement("div");
    price.textContent = formatPrice(item.product.prec * item.qty);
    row.append(label, price);
    elements.cartList.appendChild(row);
  });
  const totalRow = document.createElement("div");
  totalRow.style.marginTop = "1rem";
  totalRow.textContent = `Total: ${formatPrice(cart.total)}`;
  elements.cartList.appendChild(totalRow);
};

const hideAllPanels = () => {
  elements.loginSection.classList.add("hidden");
  elements.checkoutSection.classList.add("hidden");
};

const toggleLoginPanel = () => {
  hideAllPanels();
  elements.loginSection.classList.toggle("hidden");
};

const toggleCartPanel = () => {
  hideAllPanels();
  elements.checkoutSection.classList.toggle("hidden");
  renderCart();
  const summary = document.getElementById("checkoutSummary");
  summary.textContent = "";
};

const bindEvents = () => {
  elements.btnSearch.addEventListener("click", () => {
    const products = searchProducts({
      query: elements.searchQuery.value,
      category: elements.searchCategory.value,
    });
    state.currentProducts = products;
    renderProductList(products);
  });

  elements.btnShowLogin.addEventListener("click", () => {
    toggleLoginPanel();
  });

  elements.btnShowCart.addEventListener("click", () => {
    toggleCartPanel();
  });

  elements.btnLogin.addEventListener("click", () => {
    const result = login(
      elements.loginEmail.value,
      elements.loginPassword.value,
    );
    elements.loginMessage.textContent = result.msg;
    if (result.ok) {
      state.user = result.data.user;
      elements.loginMessage.style.color = "green";
      toggleLoginPanel();
    } else {
      elements.loginMessage.style.color = "red";
    }
  });

  elements.btnCheckout.addEventListener("click", () => {
    const result = checkout(
      state.user ? state.user.id : 1,
      "tarjeta",
      { numero: "0000000000000000", cvv: "123" },
      {
        destCity: "Santiago",
        weight: 2,
        prodType: "normal",
        isUrgent: false,
        hasInsurance: false,
      },
    );
    const summary = document.getElementById("checkoutSummary");
    if (result.ok) {
      summary.textContent = `Compra realizada. Total: ${formatPrice(result.data.priceDetails.total)}. Estado: ${result.data.order.status}`;
      elements.cartList.textContent = "";
      renderProductList(state.currentProducts);
    } else {
      summary.textContent = result.msg;
    }
    summary.style.fontWeight = "700";
  });

  elements.btnClearCart.addEventListener("click", () => {
    clearCart(state.user ? state.user.id : 1);
    renderCart();
  });
};

const init = () => {
  state.products = searchProducts({});
  state.currentProducts = state.products;
  renderProductList(state.products);
  renderCart();
  bindEvents();
};

init();
