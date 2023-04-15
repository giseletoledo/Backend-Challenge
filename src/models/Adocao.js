import mongoose from 'mongoose';
import usuarios from '../models/Usuario.js';

const adocaoSchema = new mongoose.Schema({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'O ID do animal é obrigatório']
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'O ID do tutor é obrigatório'],
    validate: {
      validator: async function(userId) {
        const user = await usuarios.findById(userId).where({ tipo: 'Tutor' });
        return user !== null;
      },
      message: 'O ID do tutor é inválido'
    }
  },
  data: {
    type: Date,
    default: Date.now,
    required: [true, 'A data da adoção é obrigatória']
  }
});

const Adocao = mongoose.model('Adocao', adocaoSchema);

export default Adocao;