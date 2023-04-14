import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  abrigo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "O abrigo do pet é obrigatório"]
  },  
  nome: {
    type: String,
    required: [true, 'O nome do animal é obrigatório']
  },
  foto: {
    type: String
  },
  idade: {
    type: String,
    required: [true, 'a idade do animal é obrigatória']
  },
  especie: {
    type: String,
    required: [true, "A espécie do pet é obrigatória"]
  },
  descricao: {
    type: String,
    required: [true, 'A descrição do animal é obrigatória']
  },
  adotado: {
    type: Boolean,
    required: [true, 'O status de adoção do animal é obrigatório']
  },
});

export default mongoose.model('Pet', PetSchema);
