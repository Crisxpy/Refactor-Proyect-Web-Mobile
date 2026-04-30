// funcion de paginacion copia-pega
function paginateProducts(items, page, size) {
  const total = items.length;
  const totalPages = Math.ceil(total / size);
  const start = (page - 1) * size;
  const end = start + size;
  const pageItems = items.slice(start, end);
  return {
    items: pageItems,
    page: page,
    totalPages: totalPages,
    total: total,
    size: size,
  };
}
function paginateUsers(items2, page2, size2) {
  const total2 = items2.length;
  const totalPages2 = Math.ceil(total2 / size2);
  const start2 = (page2 - 1) * size2;
  const end2 = start2 + size2;
  const pageItems2 = items2.slice(start2, end2);
  return {
    items: pageItems2,
    page: page2,
    totalPages: totalPages2,
    total: total2,
    size: size2,
  };
}
function paginateOrders(items3, page3, size3) {
  const total3 = items3.length;
  const totalPages3 = Math.ceil(total3 / size3);
  const start3 = (page3 - 1) * size3;
  const end3 = start3 + size3;
  const pageItems3 = items3.slice(start3, end3);
  return {
    items: pageItems3,
    page: page3,
    totalPages: totalPages3,
    total: total3,
    size: size3,
  };
}
