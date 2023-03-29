import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    id: {type: String},
    foto: {type: String},
    nome: {type: String, required: true},
    telefone: {type: String, required: true},
    cidade: {type: String, required: true},
    sobre: {type: String, required: true},
  },
  {
    versionKey: false
  }
)

const tutores = mongoose.model("tutores", tutorSchema)

export default tutores;