const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buscarProductos,
  ordenarProductos,
  paginarProductos
} = require("../src/modules/productos");

const productos = [
  {
    id: 101,
    nom: "Laptop Pro 15",
    cat: "electronica",
    prec: 1200000,
    stock: 5,
    desc: "Laptop de alto rendimiento",
    rating: 4.5,
    imgs: ["img1.jpg"],
    tags: ["laptop", "computador", "pro"],
    activo: true
  },
  {
    id: 102,
    nom: "Mouse Inalambrico",
    cat: "accesorios",
    prec: 25000,
    stock: 50,
    desc: "Mouse ergonomico inalambrico",
    rating: 4.0,
    imgs: ["img3.jpg"],
    tags: ["mouse", "inalambrico"],
    activo: true
  },
  {
    id: 103,
    nom: "Teclado Mecanico RGB",
    cat: "accesorios",
    prec: 85000,
    stock: 20,
    desc: "Teclado mecanico con iluminacion RGB",
    rating: 4.8,
    imgs: ["img4.jpg"],
    tags: ["teclado", "mecanico", "rgb"],
    activo: true
  },
  {
    id: 104,
    nom: "Monitor 4K 27",
    cat: "electronica",
    prec: 450000,
    stock: 0,
    desc: "Monitor 4K con HDR",
    rating: 4.6,
    imgs: ["img6.jpg"],
    tags: ["monitor", "4k"],
    activo: true
  },
  {
    id: 105,
    nom: "Silla Gamer",
    cat: "muebles",
    prec: 350000,
    stock: 10,
    desc: "Silla ergonomica para gaming",
    rating: 4.2,
    imgs: ["img11.jpg"],
    tags: ["silla", "gamer"],
    activo: false
  }
];

test("buscarProductos filtra por query en nombre, descripcion o tags", () => {
  const resultado = buscarProductos(productos, { query: "mecanico" });

  assert.deepEqual(
    resultado.map((producto) => producto.id),
    [103]
  );
});

test("buscarProductos filtra por categoria y rango de precio", () => {
  const resultado = buscarProductos(productos, {
    categoria: "electronica",
    precioMin: 400000,
    precioMax: 1300000
  });

  assert.deepEqual(
    resultado.map((producto) => producto.id),
    [104, 101]
  );
});

test("buscarProductos no devuelve productos inactivos", () => {
  const resultado = buscarProductos(productos, { query: "silla" });

  assert.equal(resultado.length, 0);
});

test("buscarProductos ordena los resultados por rating descendente", () => {
  const resultado = buscarProductos(productos, { categoria: "accesorios" });

  assert.deepEqual(
    resultado.map((producto) => producto.id),
    [103, 102]
  );
});

test("ordenarProductos ordena por precio ascendente sin modificar el arreglo original", () => {
  const resultado = ordenarProductos(productos, { campo: "prec", orden: "asc" });

  assert.deepEqual(
    resultado.map((producto) => producto.id),
    [102, 103, 105, 104, 101]
  );
  assert.equal(productos[0].id, 101);
});

test("paginarProductos devuelve la pagina solicitada con metadata", () => {
  const resultado = paginarProductos(productos, { pagina: 2, cantidad: 2 });

  assert.deepEqual(
    resultado.items.map((producto) => producto.id),
    [103, 104]
  );
  assert.equal(resultado.pagina, 2);
  assert.equal(resultado.totalPaginas, 3);
  assert.equal(resultado.total, 5);
  assert.equal(resultado.cantidad, 2);
  assert.equal(resultado.tienePaginaAnterior, true);
  assert.equal(resultado.tienePaginaSiguiente, true);
});

test("paginarProductos usa valores por defecto cuando recibe parametros invalidos", () => {
  const resultado = paginarProductos(productos, { pagina: 0, cantidad: 0 });

  assert.equal(resultado.pagina, 1);
  assert.equal(resultado.cantidad, 10);
  assert.equal(resultado.totalPaginas, 1);
  assert.equal(resultado.items.length, 5);
});
