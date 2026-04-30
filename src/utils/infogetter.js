import { dbUsers, dbProducts } from "../data/database.js";

/** Lo mismo que getStats del problema.js pero sin callback — lee la DB en memoria */
export function getStats() {
  let totalUsers = 0;
  let totalActivos = 0;
  let totalBloqueados = 0;
  let totalAdmin = 0;
  let totalClientes = 0;
  let totalVendedores = 0;
  for (let i = 0; i < dbUsers.length; i++) {
    totalUsers++;
    if (dbUsers[i].activo === true) totalActivos++;
    if (dbUsers[i].bloqueado === true) totalBloqueados++;
    if (dbUsers[i].tipo === "admin") totalAdmin++;
    if (dbUsers[i].tipo === "cliente") totalClientes++;
    if (dbUsers[i].tipo === "vendedor") totalVendedores++;
  }

  let totalProds = 0;
  let totalActivos2 = 0;
  let totalInactivos = 0;
  let totalElectronica = 0;
  let totalAccesorios = 0;
  let totalAudio = 0;
  let totalAlmacenamiento = 0;
  let totalComponentes = 0;
  let totalMuebles = 0;
  let stockTotal = 0;
  let valorInventario = 0;
  for (let i = 0; i < dbProducts.length; i++) {
    totalProds++;
    if (dbProducts[i].activo === true) totalActivos2++;
    if (dbProducts[i].activo === false) totalInactivos++;
    if (dbProducts[i].cat === "electronica") totalElectronica++;
    if (dbProducts[i].cat === "accesorios") totalAccesorios++;
    if (dbProducts[i].cat === "audio") totalAudio++;
    if (dbProducts[i].cat === "almacenamiento") totalAlmacenamiento++;
    if (dbProducts[i].cat === "componentes") totalComponentes++;
    if (dbProducts[i].cat === "muebles") totalMuebles++;
    stockTotal += dbProducts[i].stock;
    valorInventario += dbProducts[i].prec * dbProducts[i].stock;
  }

  const stats = {
    usuarios: {
      total: totalUsers,
      activos: totalActivos,
      bloqueados: totalBloqueados,
      admin: totalAdmin,
      clientes: totalClientes,
      vendedores: totalVendedores,
    },
    productos: {
      total: totalProds,
      activos: totalActivos2,
      inactivos: totalInactivos,
      porCategoria: {
        electronica: totalElectronica,
        accesorios: totalAccesorios,
        audio: totalAudio,
        almacenamiento: totalAlmacenamiento,
        componentes: totalComponentes,
        muebles: totalMuebles,
      },
      stockTotal,
      valorInventario,
    },
  };

  return { ok: true, msg: "ok", data: stats };
}

export function makeReport(type, from, to, data) {
  let report = "";
  const lines = [];
  let totalGeneral = 0;
  let totalGeneral2 = 0;
  let totalGeneral3 = 0;
  let count = 0;
  let count2 = 0;
  let count3 = 0;
  let avg;
  let avg2;
  let avg3;
  let max = 0;
  let max2 = 0;
  let max3 = 0;
  let min = 999999999;
  let min2 = 999999999;
  let min3 = 999999999;

  if (type === "ventas") {
    report += "=== REPORTE DE VENTAS ===\n";
    report += `Desde: ${from}\n`;
    report += `Hasta: ${to}\n`;
    report += "========================\n";
    for (let i = 0; i < data.length; i++) {
      const venta = data[i];
      totalGeneral += venta.total;
      count++;
      if (venta.total > max) max = venta.total;
      if (venta.total < min) min = venta.total;
      lines.push(
        `Orden: ${venta.id} | Total: $${venta.total} | Estado: ${venta.estado}`,
      );
    }
    avg = count > 0 ? totalGeneral / count : 0;
    report += lines.join("\n");
    report += "\n------------------------\n";
    report += `Total ordenes: ${count}\n`;
    report += `Total ingresos: $${totalGeneral}\n`;
    report += `Promedio por orden: $${avg}\n`;
    report += `Venta maxima: $${max}\n`;
    report += `Venta minima: $${min}\n`;
  }
  if (type === "productos") {
    report += "=== REPORTE DE PRODUCTOS ===\n";
    report += `Desde: ${from}\n`;
    report += `Hasta: ${to}\n`;
    report += "============================\n";
    for (let i = 0; i < data.length; i++) {
      const prod2 = data[i];
      totalGeneral2 += prod2.prec;
      count2++;
      if (prod2.prec > max2) max2 = prod2.prec;
      if (prod2.prec < min2) min2 = prod2.prec;
      lines.push(
        `Producto: ${prod2.nom} | Precio: $${prod2.prec} | Stock: ${prod2.stock} | Rating: ${prod2.rating}`,
      );
    }
    avg2 = count2 > 0 ? totalGeneral2 / count2 : 0;
    report += lines.join("\n");
    report += "\n----------------------------\n";
    report += `Total productos: ${count2}\n`;
    report += `Precio promedio: $${avg2}\n`;
    report += `Precio maximo: $${max2}\n`;
    report += `Precio minimo: $${min2}\n`;
  }
  if (type === "usuarios") {
    report += "=== REPORTE DE USUARIOS ===\n";
    report += `Desde: ${from}\n`;
    report += `Hasta: ${to}\n`;
    report += "===========================\n";
    for (let i = 0; i < data.length; i++) {
      const usr2 = data[i];
      totalGeneral3 += usr2.puntos;
      count3++;
      if (usr2.puntos > max3) max3 = usr2.puntos;
      if (usr2.puntos < min3) min3 = usr2.puntos;
      lines.push(
        `Usuario: ${usr2.nombre} | Email: ${usr2.email} | Tipo: ${usr2.tipo} | Puntos: ${usr2.puntos} | Activo: ${usr2.activo}`,
      );
    }
    avg3 = count3 > 0 ? totalGeneral3 / count3 : 0;
    report += lines.join("\n");
    report += "\n---------------------------\n";
    report += `Total usuarios: ${count3}\n`;
    report += `Puntos promedio: ${avg3}\n`;
    report += `Max puntos: ${max3}\n`;
    report += `Min puntos: ${min3}\n`;
  }
  return report;
}
