import notFound from "../Erros/notFound.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;
      //sem passar parametros ele vai executar o próximo middleware
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id,{}, {autopopulate:false})
        .populate("autor");

      if (livroResultados != null) res.status(200).send(livroResultados);
      else next(new notFound("Livro não encontrado"));
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livros != null)
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      else next(new notFound("Livro não encontrado"));
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      if (livros != null)
        res.status(200).send({ message: "Livro removido com sucesso" });
      else next(new notFound("Livro não encontrado"));
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.body);

      if (busca !== null) {
        const livrosResultado =  livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;

async function processaBusca(params) {
  const { editora, titulo, minPage, maxPage, autor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  // Regex para busca case insensitive em títulos de livros, funciona como o contais.
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPage || maxPage) busca.numeroPaginas = {};

  if (minPage) busca.numeroPaginas.$gte = minPage;
  if (maxPage) busca.numeroPaginas.$lte = maxPage;

  if (autor) {
    const autorName = await autores.findOne({ nome: autor });

    if (autor !== null) {
      const autorId = autorName._id;
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }

  return busca;
}
