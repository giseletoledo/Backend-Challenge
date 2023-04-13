export function verificarTipoRecurso(tipoRecurso) {
    return (req, res, next) => {
      console.log(req);
      const tipoUsuario = req.user.tipo;
      if (tipoUsuario !== tipoRecurso) {
        const erro = new Error("Acesso negado");
        erro.status = 403;
        return next(erro);
      }
      next();
    };
  }
  