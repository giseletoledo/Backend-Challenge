import express from "express";
import PetsController from "../controllers/PetsController.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarTipoRecurso } from "../middlewares/verificarTipoRecurso.js";

const router = express.Router();

router.get("/pets/", PetsController.listarPets);
router.get("/pets/:id", PetsController.listarPetPorId);
router.post("/pets", PetsController.cadastrarPet);
router.put("/pets/:id", verificarToken,verificarTipoRecurso("Abrigo"),PetsController.atualizarPet);
router.delete("/pets/:id",verificarToken,verificarTipoRecurso("Abrigo"), PetsController.excluirPet);

export default router;