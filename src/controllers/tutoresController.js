import NaoEncontrado from "../erros/NaoEncontrado.js";
import tutores from "../models/Tutor.js";

class TutorController {

    static listarTutores = async (req, res) => {
        try {
            const tutoresResultado = await tutores.find();
            res.status(200).json(tutoresResultado)
        } catch (erro) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static listarTutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const tutorResultado = await tutores.findById(id);

            if (tutorResultado !== null) {
                res.status(200).send(tutorResultado);
            } else {
                next(new NaoEncontrado("Id do tutor não encontrado."))
            }

        } catch (erro) {
            next(erro)
        }
    }

    static cadastrarTutor = async (req, res, next) => {

        try {
            let tutor = new tutores(req.body);

            const tutorResultado = await tutor.save();

            res.status(201).send(tutor.toJSON())

        } catch (erro) {
            next(erro)
        }
    }

    static atualizarTutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const tutorResultado = await tutores.findByIdAndUpdate(id, { $set: req.body });

            if (tutorResultado !== null) {
                res.status(200).send({ message: 'Tutor atualizado com sucesso' });
            } else {
                next(new NaoEncontrado("Id do tutor não encontrado."));
            }
        } catch (erro) {
            next(erro)
        }
    }

    static excluirTutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const tutorResultado = await tutores.findByIdAndDelete(id);

            if (tutorResultado !== null) {
                res.status(200).send({ message: 'Tutor removido com sucesso' })
            } else {
                next(new NaoEncontrado("Id do tutor não encontrado."));
            }
        } catch (erro) {
            next(erro)
        }
    }
}

export default TutorController