
function sendNotif(channel, userId, message, data) {
  const now = new Date();

  const channels = {
    email: {
      log: `Enviando email a usuario ${userId}: ${message}`,
      build: () => ({ tipo: "email", userId, msg: message, data, sentAt: now, ok: true })
    },
    sms: {
      log: `Enviando SMS a usuario ${userId}: ${message}`,
      build: () => ({ tipo: "sms", userId, msg: message, data, sentAt: now, ok: true })
    },
    push: {
      log: `Enviando push a usuario ${userId}: ${message}`,
      build: () => ({ tipo: "push", userId, msg: message, data, sentAt: now, ok: true })
    },
    inapp: {
      log: `Guardando notif inapp para usuario ${userId}: ${message}`,
      build: () => ({ tipo: "inapp", userId, msg: message, data, sentAt: now, ok: true })
    }
  };

  const config = channels[channel];

  if (!config) {
    return {
      tipo: channel,
      userId,
      msg: message,
      data,
      sentAt: now,
      ok: false,
      err: "tipo no reconocido"
    };
  }

  console.log(config.log);

  return config.build();
}
