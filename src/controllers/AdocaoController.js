import Adocao from "../models/Adocao.js";
import Pet from "../models/Pet.js"
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AdocaoController {

  static listarAdocoes = async (req, res) => {
    try {
        const adocoesResultado = await Adocao.find({});
        res.status(200).json(adocoesResultado);
    } catch (erro) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static async cadastrarAdocao(req, res, next) {
    try {

      const petId = req.body.animal;

      // Verificar se o pet já foi adotado
      const pet = await Pet.findById(petId);

      if (pet === null) {
        next(new NaoEncontrado("Id do pet não encontrado."))
      }

      if (pet.adotado) {
        return res.status(400).json({ mensagem: 'Pet já foi adotado' });
      }

      // Obter a data de adoção do corpo da requisição
      const dataAdocao = req.body.data;
      // Separar a data em dia, mês e ano
      const [dia, mes, ano] = dataAdocao.split('-');
      // Criar um objeto Date com o formato correto
      const dataFormatada = new Date(ano, mes - 1, dia);
      // Atualizar o valor do campo 'data' no corpo da requisição
      req.body.data = dataFormatada;

      const adocao = new Adocao(req.body);
      const adocaoResultado = await adocao.save();

      pet.adotado = true;
      await pet.save();

      res.status(201).json(adocaoResultado);
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAdocao(req, res, next) {

    try {
      const id = req.params.id;

      const adocaoPet = await Adocao.findOne({ _id: id}).select('animal');
      const petId = adocaoPet.animal;
   
      const pet = await Pet.findById(petId);
      
      if (pet.adotado) {
       pet.adotado = false;
       await pet.save();
      } 

      const adocaoResultado = await Adocao.findByIdAndDelete(id);

      if (adocaoResultado !== null) {
        res.status(200).send({ message: 'Adocao removido com sucesso' })
      } else {
        next(new NaoEncontrado("Id da Adocao não encontrado."));
      }
    } catch (erro) {
      next(erro)
    }
  }
}

export default AdocaoController;
