import ErroBase from "./ErroBase.js";

class UsuarioNaoAutorizado extends ErroBase {
  constructor(mensagem = "Usuário não autorizado") {
    super(mensagem, 401);
  }
}

export default UsuarioNaoAutorizado;