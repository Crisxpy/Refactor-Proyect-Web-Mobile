const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

function validarDatosRegistro(formData) {

  const errors = []; // Cambio de var a const, pal commit
  const emailExpRegular= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (!formData.nombre || formData.nombre.trim().length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres validos");
  }
  if (!emailExpRegular.test(formData.email)){
    error.push("Formato de email invalido")
  }
  if(!formData.pass || formData.pass.length){
    errors.push("La contraseña debe tener al menos 8 caracteres")
  }
  if (!formData.rut || formData.rut.trim().length < 9) {
    errors.push("El RUT no es valido");
  }
  if (!formData.telefono || formData.telefono.trim().length < 9) {
    errors.push("El telefono no es valido");
  }
  return errors;
}

async function registerUser(formData, dbUsers) {
    const validarErrores = validarDatosRegistro(formData);
    if (validarErrores.length > 0) {
      return { ok: false, msg: "Errores de validacion", errors: validarErrores };
    }
  const emailExists = dbUsers.some(user => user.email === formData.email);

  if (emailExists) {
    return { ok: false, msg: "El email ya está registrado", errors: ["Email duplicado"] };
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(formData.pass, saltRounds); //SE LE ANADIO HASH BCRYPT A LA CONTRASEÑA
  const timestamp = new Date().toISOString();
  const newUser = { // TODO FORMATEADO A USUARIO NUEVO, 0 PUNTOS
    id: `usr_${randomUUID()}`,
    nombre: formData.nombre.trim(),
    email: formData.email.toLowerCase(),
    pass: hashedPassword,
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
    createdAt: timestamp,
    updatedAt: timestamp
  };
  dbUsers.push(newUser); 
  console.log(`Usuario creado con éxito: ${newUser.email}`);
  return { ok: true, msg: "Registro exitoso", user: newUser };
}

async function updateUserProfile(uid, updateData, dbUsers){
  const user = dbUsers.find(u => u.id === uid);
  if (!user) {
    return { ok: false, msg: "Usuario no encontrado" };
  }
  const allowedFields = ["nombre", "email", "pass", "rut", "telefono", "region", "comuna", "calle", "numero", "departamento"];
  const fieldsToUpdate = Object.keys(updateData);
  let hasBeenChanged = false; 

  fieldsReceived.forEach(field => {
    if (allowedFields.includes(field)) {

      user[field] = updateData[field];
      hasChanges = true;
    }
  });

  if (!hasChanges) {
    return { ok: false, msg: "No se enviaron campos validos para actualizar", data: null };
  } else {
  user.updatedAt = new Date().toISOString();
  return { ok: true, msg: "Perfil actualizado exitosamente", user };
}
}
////////TO DO LATER////////////////////////////////////
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
