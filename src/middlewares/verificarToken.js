import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido." });
    }

    req.usuario = decoded.usuario;
    next();
  });
}
