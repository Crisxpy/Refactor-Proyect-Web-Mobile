
// funcion de sorting tambien duplicada
function sortProducts(arr4, field, order) {
  var sorted = arr4.slice();
  sorted.sort(function(a, b) {
    if (order == "asc") {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    } else {
      if (a[field] > b[field]) return -1;
      if (a[field] < b[field]) return 1;
      return 0;
    }
  });
  return sorted;
}
function sortUsers(arr5, field2, order2) {
  var sorted2 = arr5.slice();
  sorted2.sort(function(a2, b2) {
    if (order2 == "asc") {
      if (a2[field2] < b2[field2]) return -1;
      if (a2[field2] > b2[field2]) return 1;
      return 0;
    } else {
      if (a2[field2] > b2[field2]) return -1;
      if (a2[field2] < b2[field2]) return 1;
      return 0;
    }
  });
  return sorted2;
}
function sortOrders(arr6, field3, order3) {
  var sorted3 = arr6.slice();
  sorted3.sort(function(a3, b3) {
    if (order3 == "asc") {
      if (a3[field3] < b3[field3]) return -1;
      if (a3[field3] > b3[field3]) return 1;
      return 0;
    } else {
      if (a3[field3] > b3[field3]) return -1;
      if (a3[field3] < b3[field3]) return 1;
      return 0;
    }
  });
  return sorted3;
}
