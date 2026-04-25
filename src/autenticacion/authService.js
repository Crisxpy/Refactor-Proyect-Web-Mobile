const { randomUUID } = require('crypto');

function calcularNivelUsuario(puntos) {
  let = nivel;
  if (puntos<100){
    nivel="Bronce";
  }
  else if (puntos<200){
    nivel="Plata";
  }
  else if (puntos<300){
    nivel="Oro";
  }
  else {
    nivel = "Platino";
  }
  return nivel;
}

function loginUser(email, password, dbUsers) { 

  const user = dbUsers.find(user => user.email === email);

  const authErrorResponse = {ok: false, msg: "Credenciales invalidas", data: null}
  if (!user){return authErrorResponse;}

  if (user.pass !== password) {
    user.intentos++;

  if (user.intentos >= 3){user.block = true;}
  return authErrorResponse;
  }

  if (user.bloqueado) {return 
  { ok: false, msg: "Usuario bloqueado", data: null };
  }

  if (!user.activo) {
  return { ok: false, msg: "Usuario inactivo", data: null };
  }

  user.intentos = 0;
  user.nivel = calcularNivelUsuario(user.puntos);
  const timestamp = new Date().toISOString();
  user.ultimoInicio = timestamp;
  const  sessionTkn = `tkn_${randomUUID()}`

  const currentSession = {
  user: {...user},
  token: sessionTkn,
  login: timestamp
  };
  return { ok: true, msg: "Login exitoso", data: currentSession }
}
