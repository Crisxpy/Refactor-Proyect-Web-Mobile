function buscarProducto(productos, idProducto) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      return productos[i];
    }
  }

  return null;
}

function buscarUsuario(usuarios, idUsuario) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === idUsuario) {
      return usuarios[i];
    }
  }

  return null;
}

function validarStock(producto, cantidad) {
  if (producto === null) {
    return { ok: false, msg: "producto no encontrado" };
  }

  if (producto.activo === false) {
    return { ok: false, msg: "producto no disponible" };
  }

  if (cantidad <= 0) {
    return { ok: false, msg: "cantidad invalida" };
  }

  if (producto.stock < cantidad) {
    return { ok: false, msg: "stock insuficiente" };
  }

  return { ok: true, msg: "ok" };
}

function calcularSubtotal(carrito, productos) {
  let subtotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    const producto = buscarProducto(productos, carrito[i].prodId);

    if (producto !== null) {
      subtotal += producto.prec * carrito[i].qty;
    }
  }

  return subtotal;
}

function calcularTotalesCarrito(carrito, productos) {
  const subtotal = calcularSubtotal(carrito, productos);

  return {
    subtotal: subtotal,
    total: subtotal
  };
}

function agregarAlCarrito(usuarios, productos, idUsuario, idProducto, cantidad) {
  const usuario = buscarUsuario(usuarios, idUsuario);
  const producto = buscarProducto(productos, idProducto);

  if (usuario === null) {
    return { ok: false, msg: "usuario no encontrado", data: null };
  }

  const validacion = validarStock(producto, cantidad);

  if (validacion.ok === false) {
    return { ok: false, msg: validacion.msg, data: null };
  }

  let yaEsta = false;

  for (let i = 0; i < usuario.carrito.length; i++) {
    if (usuario.carrito[i].prodId === idProducto) {
      const nuevaCantidad = usuario.carrito[i].qty + cantidad;
      const validacionCantidad = validarStock(producto, nuevaCantidad);

      if (validacionCantidad.ok === false) {
        return { ok: false, msg: validacionCantidad.msg, data: null };
      }

      usuario.carrito[i].qty = nuevaCantidad;
      yaEsta = true;
      break;
    }
  }

  if (yaEsta === false) {
    usuario.carrito.push({
      prodId: idProducto,
      qty: cantidad,
      addeat: new Date()
    });
  }

  const totales = calcularTotalesCarrito(usuario.carrito, producto);

return {
    ok: true,
    msg: "producto agregado al carrito",
    data: {
      carrito: usuario.carrito,
      subtotal: totales.subtotal,
      total: totales.total
    }
  };
}
function actualizarCantidadCarrito(usuarios, productos, idUsuario, idProducto, cantidad) {
  const usuario = buscarUsuario(usuarios, idUsuario);
  const producto = buscarProducto(productos, idProducto);

  if (usuario === null) {
    return { ok: false, msg: "usuario no encontrado", data: null };
  }

  const validacion = validarStock(producto, cantidad);

  if (validacion.ok === false) {
    return { ok: false, msg: validacion.msg, data: null };
  }

  for (let i = 0; i < usuario.carrito.length; i++) {
    if (usuario.carrito[i].prodId === idProducto) {
      usuario.carrito[i].qty = cantidad;

      const totales = calcularTotalesCarrito(usuario.carrito, productos);

      return {
        ok: true,
        msg: "cantidad actualizada",
        data: {
          carrito: usuario.carrito,
          subtotal: totales.subtotal,
          total: totales.total
        }
      };
    }
  }

  return { ok: false, msg: "producto no esta en el carrito", data: null };
}

module.exports = {
  agregarAlCarrito,
  actualizarCantidadCarrito,
  calcularTotalesCarrito,
  validarStock
};