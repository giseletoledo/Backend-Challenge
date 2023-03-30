import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    id: {type: String},
    foto: {type: String},
    nome: {
        type: String,
        required: [true, "O nome do(a) tutor(a) é obrigatório"]
    },
    telefone: {
        type: String,
        required: [true, "O telefone do(a) tutor(a) é obrigatório"]
    },
    cidade: {
        type: String,
        required: [true, "A cidade do(a) tutor(a) é obrigatório"]
    },
    sobre: {
        type: String,
        required: [true, "A descrição do(a) tutor(a) é obrigatório"]
    },
  },
  {
    versionKey: false
  }
)

const tutores = mongoose.model("tutores", tutorSchema)

export default tutores;