/** Simula envío (no manda mail/SMS real); arma el objeto como haría un sender */
export const notifyUser = (channel, userId, message, payload = null) => {
  const timestamp = new Date().toISOString();
  const notification = {
    channel,
    userId,
    message,
    payload,
    timestamp,
    success: true,
  };
  switch (channel) {
    case "email":
      console.log(`Enviar email a ${userId}: ${message}`);
      break;
    case "sms":
      console.log(`Enviar SMS a ${userId}: ${message}`);
      break;
    case "push":
      console.log(`Enviar push a ${userId}: ${message}`);
      break;
    case "inapp":
      console.log(`Guardar notificación in-app para ${userId}: ${message}`);
      break;
    default:
      notification.success = false;
      notification.error = "Canal no válido";
  }
  return notification;
};

/** Nombre viejo del problema.js — mismos datos útiles para tests/UI que llamen así */
export const sendNotif = (tipo, userId, msg, data = null) => {
  const inner = notifyUser(tipo, userId, msg, data);
  return {
    tipo: inner.channel,
    userId,
    msg,
    data,
    sentAt: inner.timestamp ? new Date(inner.timestamp) : new Date(),
    ok: inner.success,
    err: inner.error,
  };
};
