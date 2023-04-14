import express from "express";
import UsuariosController from "../controllers/UsuariosController.js";
import { verificarToken } from "../middlewares/verificarToken.js";


const router = express.Router();

router.get("/tutores", UsuariosController.listarTutores);
router.get("/tutores/:id", UsuariosController.listarTutorPorId);
router.post("/tutores", UsuariosController.cadastrarUsuario);
router.put("/tutores/:id",verificarToken,UsuariosController.atualizarUsuario);
router.delete("/tutores/:id", verificarToken, UsuariosController.excluirUsuario);

export default router;