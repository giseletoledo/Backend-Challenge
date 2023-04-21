import jwt from "jsonwebtoken";
import Usuario from '../models/Usuario.js';

export async function verificarTipoUsuario(req, res, next)  {
 
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.MEU_SEGREDO);
    
        const usuario = await Usuario.findById(decoded.usuarioId).where({ tipo: 'Abrigo' });
        
        //console.log(usuario.tipo === 'Abrigo')

        if (!usuario || usuario.tipo !== 'Abrigo') { // verifica se o usuário é do tipo Abrigo
            return res.status(403).json({ mensagem: 'Usuário não autorizado' });
          }
          next();      
  }
  


