import express from "express";
import conectar from "./config/dbconnect.js"
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

  try {
   const db = await conectar();
    console.log('Conexão aberta com o banco de dados');

    db.on('connected', () => {
      console.log('Conexão com o banco de dados estabelecida');
    });

    db.on('error', (err) => {
      console.error('Erro ao conectar ao banco de dados:', err);
    });

    db.on('disconnected', () => {
      console.log('Conexão com o banco de dados encerrada');
    });

  } catch (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
  }

const app = express();
app.use(express.json())
routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;