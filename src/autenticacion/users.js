const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

function validarDatosRegistro(formData) {

  const errors = []; 
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

function getReviewsByProduct(productId, dbReviews) {

  const productReviews = dbReviews.filter(review => review.prodId === productId);
  return { 
    ok: true, 
    msg: "Comentarios obtenidos exitosamente",
    data: { 
      reviews: productReviews, 
      count: productReviews.length 
    } 
  };
}

function addReview(reviewData, dbReviews) {
  const { prodId, userId, rating, comment } = reviewData;

  if (!prodId || !userId || !rating) {
    return { ok: false, msg: "Faltan datos obligatorios para agregar el comentario", data: null };
  }
  const hasUserBoughtProduct = false; //Requiere conectar con alguna BDD que confirme si se compro el producto
  const newReview = {
    id: `rev_${randomUUID()}`, 
    prodId: prodId,
    userId: userId,
    rating: Number(rating),
    comment: comment || "",
    date: new Date().toISOString(),
    likes: 0,
    verified: hasUserBoughtProduct
  };
  dbReviews.push(newReview);

  return { 
    ok: true, 
    msg: "Comentario agregado exitosamente", 
    data: { review: newReview } 
  };
}