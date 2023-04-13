import NaoEncontrado from "../erros/NaoEncontrado.js";
import usuarios from "../models/Usuario.js";

class UsuariosController {
 static async listarTutores(req, res, next) {
    try {
      const tutoresResultado = await usuarios.find({ tipo: "Tutor" });
      res.status(200).json(tutoresResultado);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarTutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const tutorResultado = await usuarios.findById(id).where({ tipo: 'Tutor' });
  
      if (tutorResultado !== null) {
        res.status(200).json(tutorResultado);
      } else {
        next(new NaoEncontrado("Tutor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAbrigos(req, res, next) {
    try {
      const abrigosResultado = await usuarios.find({ tipo: "Abrigo" });
      res.status(200).json(abrigosResultado);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAbrigoPorId(req, res, next) {
    try {
      const id = req.params.id;
      const abrigoResultado = await usuarios.findById(id).where({ tipo: 'Abrigo' });
  
      if (abrigoResultado !== null) {
        res.status(200).json(abrigoResultado);
      } else {
        next(new NaoEncontrado("Abrigo não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
  
  static async cadastrarUsuario(req, res, next) {
    console.log(req);
    try {
      const usuario = new usuarios(req.body);
      const usuarioResultado = await usuario.save();

      console.log(usuario)

      res.status(201).json(usuario.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarUsuario(req, res, next) {
    try {
      const id = req.params.id;
      const usuario = await usuarios.findByIdAndUpdate(id, { $set: req.body });

      if (usuario !== null) {
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      } else {
        next(new NaoEncontrado("Usuário não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirUsuario(req, res, next) {
    try {
      const id = req.params.id;
      const usuario = await usuarios.findByIdAndDelete(id);

      if (usuario !== null) {
        res.status(200).json({ message: 'Usuário removido com sucesso' });
      } else {
        next(new NaoEncontrado("Usuário não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default UsuariosController;