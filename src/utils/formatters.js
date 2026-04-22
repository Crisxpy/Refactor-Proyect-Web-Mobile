// formatear precio (funcion repetida 3 veces con minimas diferencias)
// Usamos 'const' en lugar de 'var' (siguiendo a ESLint)
// Agregamos la palabra 'export' antes de la declaración
export const fmtPrice = (n) => {
return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const formatearPrecio = (num) => {
return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const mostrarPrecio = (numero) =>  {
return "$" + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// funciones de fecha/hora sin libreria y con logica embebida
function formatDate(d4) {
  var day = d4.getDate();
  var month = d4.getMonth() + 1;
  var year = d4.getFullYear();
  var hours = d4.getHours();
  var mins = d4.getMinutes();
  var secs = d4.getSeconds();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + secs;
}
function formatDate2(d5) { // igual que la anterior
  var day2 = d5.getDate();
  var month2 = d5.getMonth() + 1;
  var year2 = d5.getFullYear();
  if (day2 < 10) day2 = "0" + day2;
  if (month2 < 10) month2 = "0" + month2;
  return day2 + "/" + month2 + "/" + year2;
}
function formatDate3(dateStr) { // otra variante
  var parts = dateStr.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}
