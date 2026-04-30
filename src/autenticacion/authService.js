import { dbUsers } from "../data/database.js";
import { isValidEmail, isValidPassword } from "../utils/validators.js";

export const getUserLevel = (points) => {
  if (points >= 300) return "platino";
  if (points >= 200) return "oro";
  if (points >= 100) return "plata";
  return "bronce";
};

export const findUserByEmail = (email) => {
  return dbUsers.find((user) => user.email === email);
};

export const login = (email, password) => {
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return { ok: false, msg: "Correo o contraseña inválidos", data: null };
  }

  const user = dbUsers.find(
    (item) => item.email === email && item.pass === password,
  );
  if (!user) {
    const existing = dbUsers.find((item) => item.email === email);
    if (existing) {
      existing.intentos += 1;
      if (existing.intentos >= 3) {
        existing.bloqueado = true;
      }
    }
    return { ok: false, msg: "Credenciales inválidas", data: null };
  }

  if (user.bloqueado) {
    return { ok: false, msg: "Usuario bloqueado", data: null };
  }

  if (!user.activo) {
    return { ok: false, msg: "Usuario inactivo", data: null };
  }

  user.nivel = getUserLevel(user.puntos);
  user.ultimoLogin = new Date().toISOString();
  user.intentos = 0;

  const session = {
    user: { ...user, pass: undefined },
    token: `tkn_${Math.random().toString(36).slice(2, 10)}`,
    loginTime: new Date().toISOString(),
  };

  return { ok: true, msg: "Login exitoso", data: session };
};
