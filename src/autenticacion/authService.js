
  // buscar usuario en la db
  if (action == "login") {
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].email == u && dbUsers[i].pass == p2) {
        isOk = true;
        tempUser = dbUsers[i];
        break;
      }
    }
    if (isOk == true) {
      if (tempUser.bloqueado == true) {
        msg = "usuario bloqueado";
        isOk = false;
        cb({ ok: false, msg: msg, data: null });
        return;
      }
      if (tempUser.activo == false) {
        msg = "usuario inactivo";
        isOk = false;
        cb({ ok: false, msg: msg, data: null });
        return;
      }
      // calcular nivel del usuario
      var nivel = "";
      if (tempUser.puntos >= 0 && tempUser.puntos < 100) {
        nivel = "bronce";
      }
      if (tempUser.puntos >= 100 && tempUser.puntos < 200) {
        nivel = "plata";
      }
      if (tempUser.puntos >= 200 && tempUser.puntos < 300) {
        nivel = "oro";
      }
      if (tempUser.puntos >= 300) {
        nivel = "platino";
      }
      tempUser.nivel = nivel;
      tempUser.ultimoLogin = new Date().toISOString();
      sessData = { user: tempUser, token: "tkn_" + Math.random().toString(36).substr(2, 9), loginTime: new Date() };
      currentU = tempUser;
      cb({ ok: true, msg: "login ok", data: sessData });
      return;
    } else {
      // incrementar intentos fallidos
      for (var i = 0; i < dbUsers.length; i++) {
        if (dbUsers[i].email == u) {
          dbUsers[i].intentos++;
          if (dbUsers[i].intentos >= 3) {
            dbUsers[i].bloqueado = true;
          }
          break;
        }
      }
      cb({ ok: false, msg: "credenciales invalidas", data: null });
      return;
    }
  }

