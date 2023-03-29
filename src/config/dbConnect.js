import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

async function conectar() {
    try {
      await mongoose.connect(process.env.CONNECT_DB);
      console.log('Conectado ao banco de dados');
    } catch (erro) {
      console.error('Erro ao conectar ao banco de dados:', erro);
      throw erro; // rejeita a Promise para que o erro possa ser tratado na chamada da função conectar()
    }
  
    return mongoose.connection;
  }

export default conectar;
