
    var totalConDescuento = subtotal - descuentoMonto;
    // calcular iva
    var iva = totalConDescuento * 0.19;
    var totalFinal = totalConDescuento + iva;
    // calcular puntos ganados
    var puntosGanados = Math.floor(totalFinal / 1000);
    // crear orden
    var ordenId = "ORD-" + Date.now();
    var orden = {
      id: ordenId,
      userId: userId3,
      items: itemsOrden,
      subtotal: subtotal,
      descuentoPct: descuento,
      descuentoMonto: descuentoMonto,
      totalSinIva: totalConDescuento,
      iva: iva,
      total: totalFinal,
      metodoPago: metodoPago,
      direccion: direccion,
      estado: "pendiente",
      puntosGanados: puntosGanados,
      createdAt: new Date()
    };
    // actualizar stock
    for (var i = 0; i < foundUser2.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser2.carrito[i].prodId) {
          dbProducts[j].stock = dbProducts[j].stock - foundUser2.carrito[i].qty;
          break;
        }
      }
    }
    // agregar puntos al usuario
    foundUser2.puntos = foundUser2.puntos + puntosGanados;
    // limpiar carrito
    foundUser2.carrito = [];
    // agregar al historial
    foundUser2.historial.push(orden);
    // simular proceso de pago
    var pagoOk = false;
    if (metodoPago == "tarjeta") {
      // simular validacion tarjeta
      if (flag99 && flag99.numero && flag99.numero.length == 16 && flag99.cvv && flag99.cvv.length == 3) {
        pagoOk = true;
      } else {
        cb({ ok: false, msg: "datos de tarjeta invalidos", data: null });
        return;
      }
    }
    if (metodoPago == "transferencia") {
      pagoOk = true;
    }
    if (metodoPago == "efectivo") {
      pagoOk = true;
    }
    if (pagoOk == true) {
      orden.estado = "pagado";
      cb({ ok: true, msg: "orden creada exitosamente", data: orden });
    } else {
      cb({ ok: false, msg: "metodo de pago no valido", data: null });
    }
    return;
  }

// calcular precio con todo
function calc(p, d, d2, d3, iva, envio, cuotas) {
  // p = precio base
  // d = descuento nivel
  // d2 = descuento cupon
  // d3 = descuento especial
  // iva = si aplica iva
  // envio = costo envio
  // cuotas = numero cuotas
  var r = 0;
  var r2 = 0;
  var r3 = 0;
  var r4 = 0;
  var r5 = 0;
  var r6 = 0;
  var r7 = 0;
  r = p;
  if (d > 0) {
    r2 = r * (d / 100);
    r = r - r2;
  }
  if (d2 > 0) {
    r3 = r * (d2 / 100);
    r = r - r3;
  }
  if (d3 > 0) {
    r4 = r * (d3 / 100);
    r = r - r4;
  }
  if (iva == true) {
    r5 = r * 0.19;
    r = r + r5;
  }
  if (envio > 0) {
    r = r + envio;
  }
  r6 = r;
  if (cuotas > 1) {
    // agregar interes segun cuotas
    if (cuotas == 2) {
      r7 = r * 0.02;
      r = r + r7;
    }
    if (cuotas == 3) {
      r7 = r * 0.04;
      r = r + r7;
    }
    if (cuotas == 6) {
      r7 = r * 0.08;
      r = r + r7;
    }
    if (cuotas == 12) {
      r7 = r * 0.15;
      r = r + r7;
    }
    if (cuotas == 24) {
      r7 = r * 0.28;
      r = r + r7;
    }
    if (cuotas == 36) {
      r7 = r * 0.45;
      r = r + r7;
    }
  }
  return {
    base: p,
    dscto1: r2,
    dscto2: r3,
    dscto3: r4,
    subtotal: r6,
    iva: r5,
    envio: envio,
    totalCuota: cuotas > 1 ? r / cuotas : r,
    total: r
  };
}

  // calcular descuento
  var descuentoFinal = 0;
  if (found.tipo == "porcentaje") {
    descuentoFinal = cartTotal * (found.valor / 100);
  }
  if (found.tipo == "fijo") {
    descuentoFinal = found.valor;
    if (descuentoFinal > cartTotal) descuentoFinal = cartTotal;
  }
  if (found.tipo == "envio") {
    descuentoFinal = found.valor; // descuento en envio
  }
  found.usos++;
  return { ok: true, msg: "cupon aplicado", descuento: descuentoFinal, tipo: found.tipo };
}

// funcion de envio con logica embebida
function calcShipping(destCity, weight, dimensions, prodType, isUrgent, isFree, hasInsurance) {
  // tasas hardcodeadas
  var baseCost = 0;
  var cityMult = 1;
  var weightCost = 0;
  var insuranceCost = 0;
  var urgentCost = 0;
  
  if (destCity == "Santiago") cityMult = 1;
  if (destCity == "Valparaiso") cityMult = 1.2;
  if (destCity == "Concepcion") cityMult = 1.4;
  if (destCity == "La Serena") cityMult = 1.6;
  if (destCity == "Antofagasta") cityMult = 1.8;
  if (destCity == "Iquique") cityMult = 2.0;
  if (destCity == "Punta Arenas") cityMult = 2.5;
  
  // costo por peso
  if (weight <= 1) weightCost = 2000;
  if (weight > 1 && weight <= 5) weightCost = 3500;
  if (weight > 5 && weight <= 10) weightCost = 5000;
  if (weight > 10 && weight <= 20) weightCost = 8000;
  if (weight > 20) weightCost = 12000;
  
  // tipo de producto
  if (prodType == "fragil") weightCost = weightCost * 1.5;
  if (prodType == "electronico") weightCost = weightCost * 1.3;
  if (prodType == "normal") weightCost = weightCost * 1;
  
  baseCost = weightCost * cityMult;
  
  if (isUrgent == true) urgentCost = baseCost * 0.5;
  if (hasInsurance == true) insuranceCost = baseCost * 0.1;
  if (isFree == true) return { costo: 0, desglose: "Envio gratis" };
  
  var total = baseCost + urgentCost + insuranceCost;
  return { costo: total, base: baseCost, urgente: urgentCost, seguro: insuranceCost };
}
