import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usuarios from '../models/Usuario.js';

class LoginController {
    static authToken = async (req, res) => {
        try {

          const { email, senha } = req.body;
          const usuario = await usuarios.findOne({ email: email });
      
          if (!usuario) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
          }
      
          const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
          if (!senhaValida) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
          }
      
          const token = jwt.sign({ usuarioId: usuario._id, tipo: usuario.tipo }, process.env.MEU_SEGREDO, { expiresIn: '1h'});
          
          console.log(token,usuario.tipo)
         
          res.status(200).json({ token: token });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
}

export default LoginController;