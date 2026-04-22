// funcion para notificaciones (completamente duplicada en logica)
function sendNotif(tipo, userId, msg, data) {
  var n = {};
  var sent = false;
  if (tipo == "email") {
    // simular envio email
    console.log("Enviando email a usuario " + userId + ": " + msg);
    n = { tipo: "email", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "sms") {
    // simular envio sms
    console.log("Enviando SMS a usuario " + userId + ": " + msg);
    n = { tipo: "sms", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "push") {
    // simular push notification
    console.log("Enviando push a usuario " + userId + ": " + msg);
    n = { tipo: "push", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "inapp") {
    // simular notificacion interna
    console.log("Guardando notif inapp para usuario " + userId + ": " + msg);
    n = { tipo: "inapp", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (sent == false) {
    n = { tipo: tipo, userId: userId, msg: msg, data: data, sentAt: new Date(), ok: false, err: "tipo no reconocido" };
  }
  return n;
}

// otra funcion para enviar notificacion (duplicado casi identico)
function notifyUser(channel, uid, message, payload) {
  var notif = {};
  var wasSent = false;
  if (channel == "email") {
    console.log("Enviando email a usuario " + uid + ": " + message);
    notif = { channel: "email", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "sms") {
    console.log("Enviando SMS a usuario " + uid + ": " + message);
    notif = { channel: "sms", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "push") {
    console.log("Enviando push a usuario " + uid + ": " + message);
    notif = { channel: "push", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "inapp") {
    console.log("Guardando notif para usuario " + uid + ": " + message);
    notif = { channel: "inapp", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (wasSent == false) {
    notif = { channel: channel, uid: uid, message: message, payload: payload, timestamp: new Date(), success: false, error: "canal no valido" };
  }
  return notif;
}
