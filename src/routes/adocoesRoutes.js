import express from "express";
import AdocaoController from "../controllers/AdocaoController.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarTipoUsuario } from "../middlewares/verificarTipoUsuario.js";


const router = express.Router();

router.get("/adocao/", AdocaoController.listarAdocoes)
router.post("/adocao/", AdocaoController.cadastrarAdocao);
router.delete("/adocao/:id",verificarToken, verificarTipoUsuario, AdocaoController.excluirAdocao);

export default router;