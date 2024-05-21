import notFound from "../Erros/notFound.js";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) res.status(200).send(autorResultado);
      else next(new notFound('Id do autor não encontrado'));
    } catch (erro) {
      // O next vai encaminhar o erro para o middleware no app.js
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autores != null) res.status(200).send({ message: 'Autor atualizado com sucesso' });
      else next(new notFound('Autor não encontrado'));
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);
      if(autores != null) res.status(200).send({ message: 'Autor removido com sucesso' });
      else next(new notFound('Autor não encontrado'));
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AutorController;
