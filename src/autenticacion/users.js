import { dbUsers, dbReviews } from "../data/database.js";
import { sendNotif } from "../modules/notifications.js";

export function processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect(
  formData,
) {
  const errors = [];
  if (!formData.nombre || formData.nombre === "" || formData.nombre.length < 3) {
    errors.push("Nombre invalido");
  }
  if (!formData.email || formData.email.indexOf("@") === -1) {
    errors.push("Email invalido");
  }
  if (!formData.pass || formData.pass.length < 8) {
    errors.push("Password debe tener minimo 8 caracteres");
  }
  if (formData.pass !== formData.passConfirm) {
    errors.push("Passwords no coinciden");
  }
  if (!formData.rut || formData.rut.length < 8) {
    errors.push("RUT invalido");
  }
  if (!formData.telefono || formData.telefono.length < 9) {
    errors.push("Telefono invalido");
  }
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  let exists = false;
  for (let i = 0; i < dbUsers.length; i++) {
    if (dbUsers[i].email === formData.email) {
      exists = true;
      break;
    }
  }
  if (exists) {
    return { ok: false, errors: ["Email ya registrado"] };
  }

  const newUser = {
    id: Math.floor(Math.random() * 9000) + 1000,
    nombre: formData.nombre,
    email: formData.email,
    pass: formData.pass,
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
    updatedAt: new Date().toISOString(),
  };

  dbUsers.push(newUser);

  sendNotif(
    "email",
    newUser.id,
    "Bienvenido a la tienda! Tu cuenta ha sido creada.",
    { userName: newUser.nombre },
  );

  const sessionData = {
    user: newUser,
    token: `tkn_${Math.random().toString(36).slice(2, 11)}`,
    loginTime: new Date(),
  };

  return {
    ok: true,
    user: newUser,
    session: sessionData,
    redirect: "/dashboard",
  };
}

export function updateUserProfile(
  uid,
  field,
  value,
  field2,
  value2,
  field3,
  value3,
  field4,
  value4,
  field5,
  value5,
) {
  let user = null;
  for (let i = 0; i < dbUsers.length; i++) {
    if (dbUsers[i].id === uid) {
      user = dbUsers[i];
      break;
    }
  }
  if (!user) return { ok: false, msg: "no encontrado" };
  if (field && value) user[field] = value;
  if (field2 && value2) user[field2] = value2;
  if (field3 && value3) user[field3] = value3;
  if (field4 && value4) user[field4] = value4;
  if (field5 && value5) user[field5] = value5;
  return { ok: true, user };
}

export function reviews(action3, prodId3, userId5, rating2, comment, data4) {
  if (action3 === "getAll") {
    const revs = dbReviews.filter((r) => r.prodId === prodId3);
    return { ok: true, reviews: revs, count: revs.length };
  }
  if (action3 === "add") {
    const compro = false;
    const newReview = {
      id: dbReviews.length ? Math.max(...dbReviews.map((r) => r.id)) + 1 : 1,
      prodId: prodId3,
      userId: userId5,
      rating: rating2,
      comment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      verified: compro,
    };
    dbReviews.push(newReview);
    return { ok: true, review: newReview };
  }
  if (action3 === "like") {
    const hit = dbReviews.find((r) => r.id === data4);
    if (!hit) return { ok: false, msg: "review no encontrada" };
    hit.likes++;
    return { ok: true, likes: hit.likes };
  }
  if (action3 === "delete") {
    const idx = dbReviews.findIndex(
      (r) => r.id === data4 && r.userId === userId5,
    );
    if (idx === -1)
      return { ok: false, msg: "review no encontrada o no autorizado" };
    dbReviews.splice(idx, 1);
    return { ok: true, msg: "review eliminada" };
  }
  return { ok: false, msg: "accion invalida" };
}
