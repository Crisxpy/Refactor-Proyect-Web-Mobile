
// funcion para procesar formulario de registro (sin separacion de responsabilidades)
function processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect(formData) {
  // 1. validar campos
  var errors = [];
  if (!formData.nombre || formData.nombre == "" || formData.nombre.length < 3) {
    errors.push("Nombre invalido");
  }
  if (!formData.email || formData.email.indexOf("@") == -1) {
    errors.push("Email invalido");
  }
  if (!formData.pass || formData.pass.length < 8) {
    errors.push("Password debe tener minimo 8 caracteres");
  }
  if (formData.pass != formData.passConfirm) {
    errors.push("Passwords no coinciden");
  }
  if (!formData.rut || formData.rut.length < 8) {
    errors.push("RUT invalido");
  }
  if (!formData.telefono || formData.telefono.length < 9) {
    errors.push("Telefono invalido");
  }
  if (errors.length > 0) {
    return { ok: false, errors: errors };
  }
  // 2. verificar si ya existe
  var exists = false;
  var usersDB = [{ email: "juan@mail.com" }, { email: "maria@mail.com" }]; // hardcoded again
  for (var i = 0; i < usersDB.length; i++) {
    if (usersDB[i].email == formData.email) {
      exists = true;
      break;
    }
  }
  if (exists == true) {
    return { ok: false, errors: ["Email ya registrado"] };
  }
  // 3. crear usuario
  var newUser = {
    id: Math.floor(Math.random() * 9000) + 1000,
    nombre: formData.nombre,
    email: formData.email,
    pass: formData.pass, // ALERTA: guardando password en texto plano
    rut: formData.rut,
    telefono: formData.telefono,
    tipo: "cliente",
    puntos: 0,
    descuento: 0,
    historial: [],
    carrito: [],
    wishlist: [],
    direcciones: [],
    metodoPago: [],
    activo: true,
    intentos: 0,
    bloqueado: false,
    ultimoLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  // 4. guardar (simulado)
  console.log("Guardando usuario en DB...", newUser);
  // 5. enviar email de bienvenida
  console.log("Enviando email de bienvenida a " + newUser.email);
  sendNotif("email", newUser.id, "Bienvenido a la tienda! Tu cuenta ha sido creada.", { userName: newUser.nombre });
  // 6. auto-login
  sessData = { user: newUser, token: "tkn_" + Math.random().toString(36).substr(2, 9), loginTime: new Date() };
  currentU = newUser;
  // 7. redirigir (simulado)
  console.log("Redirigiendo a /dashboard...");
  return { ok: true, user: newUser, session: sessData, redirect: "/dashboard" };
}

// funcion gigante de actualizacion de perfil que mezcla todo
function updateUserProfile(uid, field, value, field2, value2, field3, value3, field4, value4, field5, value5) {
  // actualizar hasta 5 campos a la vez con parametros individuales
  var dbUsers3 = [
    { id: 1, nombre: "Juan Perez", email: "juan@mail.com", telefono: "912345678", rut: "12345678-9", direccion: "Av. Siempre Viva 123", ciudad: "Santiago", region: "RM", codPostal: "8320000", pass: "1234" }
  ];
  var user4 = null;
  for (var i = 0; i < dbUsers3.length; i++) {
    if (dbUsers3[i].id == uid) {
      user4 = dbUsers3[i];
      break;
    }
  }
  if (user4 == null) return { ok: false, msg: "no encontrado" };
  // actualizar campos sin validacion adecuada
  if (field && value) user4[field] = value;
  if (field2 && value2) user4[field2] = value2;
  if (field3 && value3) user4[field3] = value3;
  if (field4 && value4) user4[field4] = value4;
  if (field5 && value5) user4[field5] = value5;
  console.log("Usuario actualizado:", user4);
  return { ok: true, user: user4 };
}

// funcion para reviews - mezcla lectura y escritura
function reviews(action3, prodId3, userId5, rating2, comment, data4) {
  var dbReviews = [
    { id: 1, prodId: 101, userId: 2, rating: 5, comment: "Excelente laptop!", date: "2023-08-01", likes: 10, verified: true },
    { id: 2, prodId: 101, userId: 3, rating: 4, comment: "Muy buena pero cara", date: "2023-08-15", likes: 5, verified: true },
    { id: 3, prodId: 102, userId: 1, rating: 4, comment: "Buen mouse", date: "2023-09-01", likes: 2, verified: false },
    { id: 4, prodId: 103, userId: 5, rating: 5, comment: "El mejor teclado que he tenido", date: "2023-09-15", likes: 15, verified: true },
    { id: 5, prodId: 104, userId: 2, rating: 4, comment: "Monitor increible", date: "2023-10-01", likes: 8, verified: true }
  ];
  if (action3 == "getAll") {
    var revs = [];
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].prodId == prodId3) {
        revs.push(dbReviews[i]);
      }
    }
    return { ok: true, reviews: revs, count: revs.length };
  }
  if (action3 == "add") {
    // verificar que el usuario haya comprado el producto
    var compro = false; // siempre false en este ejemplo - logica incompleta
    // agregar review sin verificacion real
    var newReview = {
      id: dbReviews.length + 1,
      prodId: prodId3,
      userId: userId5,
      rating: rating2,
      comment: comment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      verified: compro
    };
    dbReviews.push(newReview);
    return { ok: true, review: newReview };
  }
  if (action3 == "like") {
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].id == data4) {
        dbReviews[i].likes++;
        return { ok: true, likes: dbReviews[i].likes };
      }
    }
    return { ok: false, msg: "review no encontrada" };
  }
  if (action3 == "delete") {
    var idx2 = -1;
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].id == data4 && dbReviews[i].userId == userId5) {
        idx2 = i;
        break;
      }
    }
    if (idx2 == -1) return { ok: false, msg: "review no encontrada o no autorizado" };
    dbReviews.splice(idx2, 1);
    return { ok: true, msg: "review eliminada" };
  }
  return { ok: false, msg: "accion invalida" };
}
