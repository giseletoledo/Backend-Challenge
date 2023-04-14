import NaoEncontrado from "../erros/NaoEncontrado.js";
import Pet from "../models/Pet.js";
import usuarios from "../models/Usuario.js";

class PetController {

    static listarPets = async (req, res) => {
        try {
            const petsResultado = await Pet.find({});
            res.status(200).json(petsResultado);
        } catch (erro) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static listarPetPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const petResultado = await Pet.findById(id);

            if (petResultado !== null) {
                res.status(200).send(petResultado);
            } else {
                next(new NaoEncontrado("Id do pet não encontrado."))
            }

        } catch (erro) {
            next(erro)
        }
    }

static cadastrarPet = async (req, res, next) => {
  try {

    const abrigoId = req.body.abrigo_id;
    const abrigo = await usuarios.findById(abrigoId).where({ tipo: 'Abrigo' });
   
    if (!abrigo) {
      return next(new NaoEncontrado('Abrigo não encontrado'));
    } 
        const pet = new Pet(req.body);
        await pet.save();   
        res.status(201).json(pet.toJSON());
  
  } catch (erro) {
    next(erro);
  }
}

    static atualizarPet = async (req, res, next) => {
        try {
            const id = req.params.id;

            const petResultado = await Pet.findByIdAndUpdate(id, { $set: req.body });

            if (petResultado !== null) {
                res.status(200).send({ message: 'Pet atualizado com sucesso' });
            } else {
                next(new NaoEncontrado("Id do pet não encontrado."));
            }
        } catch (erro) {
            next(erro)
        }
    }

    static excluirPet = async (req, res, next) => {
        try {
            const id = req.params.id;

            const petResultado = await Pet.findByIdAndDelete(id);

            if (petResultado !== null) {
                res.status(200).send({ message: 'Pet removido com sucesso' })
            } else {
                next(new NaoEncontrado("Id do pet não encontrado."));
            }
        } catch (erro) {
            next(erro)
        }
    }
}

export default PetController;
