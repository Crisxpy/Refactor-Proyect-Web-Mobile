
// funcion de "utilidades" que hace 10 cosas diferentes
function utils(op, val, val2, val3) {
  if (op == "capitalize") {
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  }
  if (op == "truncate") {
    return val.length > val2 ? val.substring(0, val2) + "..." : val;
  }
  if (op == "random") {
    return Math.floor(Math.random() * (val2 - val + 1)) + val;
  }
  if (op == "slugify") {
    return val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }
  if (op == "deepClone") {
    return JSON.parse(JSON.stringify(val));
  }
  if (op == "isEmptyObj") {
    return Object.keys(val).length === 0;
  }
  if (op == "sumArray") {
    var s = 0; for (var i = 0; i < val.length; i++) s += val[i]; return s;
  }
  if (op == "avgArray") {
    var s2 = 0; for (var i = 0; i < val.length; i++) s2 += val[i]; return val.length > 0 ? s2 / val.length : 0;
  }
  if (op == "uniqueArray") {
    var u = []; for (var i = 0; i < val.length; i++) { if (u.indexOf(val[i]) == -1) u.push(val[i]); } return u;
  }
  if (op == "flatArray") {
    var f = []; for (var i = 0; i < val.length; i++) { if (Array.isArray(val[i])) { for (var j = 0; j < val[i].length; j++) f.push(val[i][j]); } else f.push(val[i]); } return f;
  }
}
