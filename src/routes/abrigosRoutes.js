import express from "express";
import UsuariosController from "../controllers/UsuariosController.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarTipoRecurso } from "../middlewares/verificarTipoRecurso.js";

const router = express.Router();

router.get("/abrigos/", UsuariosController.listarAbrigos);
router.get("/abrigos/:id", UsuariosController.listarAbrigoPorId);
router.post("/abrigos", UsuariosController.cadastrarUsuario);
router.put("/abrigos/:id", verificarToken,verificarTipoRecurso("Abrigo"),UsuariosController.atualizarUsuario);
router.delete("/abrigos/:id",verificarToken,verificarTipoRecurso("Abrigo"), UsuariosController.excluirUsuario);

export default router;