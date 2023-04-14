import express from "express";
import UsuariosController from "../controllers/UsuariosController.js";
import { verificarToken } from "../middlewares/verificarToken.js";



const router = express.Router();

router.get("/abrigos/", UsuariosController.listarAbrigos);
router.get("/abrigos/:id", UsuariosController.listarAbrigoPorId);
router.post("/abrigos", UsuariosController.cadastrarUsuario);
router.put("/abrigos/:id", verificarToken,UsuariosController.atualizarUsuario);
router.delete("/abrigos/:id",verificarToken, UsuariosController.excluirUsuario);

export default router;