import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  login: { 
    type: String, 
    required: [true, "O login é obrigatório"]
 },
  senha: { 
    type: String, 
    required: [true, "A senha é obrigatória"] 
    },
  tipo: { 
    type: String, 
    enum: ["Tutor", "Abrigo"],
    required: [true, "O tipo de usuário é obrigatório"]
 },
  nome: { 
    type: String, 
    required: [true, "O nome do usuário é obrigatório"]
 },
 foto: {
     type: String
     },
 endereco: { 
    type: String
 },
  telefone: { 
    type: String, 
    required: [true, "O telefone do usuário é obrigatório"]
},
  cidade: { 
    type: String,
     required: [true, "A cidade do usuário é obrigatório"]
    },
  sobre: { 
    type: String, 
    required:  [true, "A descrição do usuário é obrigatório"]
 }
});


usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
  } catch (erro) {
    next(erro);
  }
});

usuarioSchema.methods.checkSenha = async function (senha) {
  try {
    return await bcrypt.compare(senha, this.senha);
  } catch (erro) {
    throw erro;
  }
};

const usuarios = mongoose.model("usuarios", usuarioSchema);

export default usuarios;
