import express from "express";
import TutorController from "../controllers/tutoresController.js";

const router = express.Router();

router
  .get("/tutores", TutorController.listarTutores)
  .get("/tutores/:id", TutorController.listarTutorPorId)
  .post("/tutores", TutorController.cadastrarTutor)
  .put("/tutores/:id", TutorController.atualizarTutor)
  .delete("/tutores/:id", TutorController.excluirTutor)

export default router;   