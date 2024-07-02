import notFound from "../Erros/notFound.js";
import {autores, livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if(livroResultados != null) res.status(200).send(livroResultados);
      else next(new notFound('Livro não encontrado'));
      
    } catch (erro) {
      next(erro)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livros != null) res.status(200).send({message: "Livro atualizado com sucesso"});
      else next(new notFound('Livro não encontrado'));

    } catch (erro) {
      next(erro)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      if(livros != null) res.status(200).send({message: "Livro removido com sucesso"});
      else next(new notFound('Livro não encontrado'));

    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.body);
      
      const livrosResultado = await livros
        .find(busca)
        .populate("autor");

      res.status(200).send(livrosResultado);
      
    } catch (erro) {
     next(erro)
    }
  }
}

export default LivroController

async function  processaBusca(params) {

  const {editora, titulo, minPage, maxPage, autor} = params;

  const busca = {};

  if(editora) busca.editora = editora
  // Regex para busca case insensitive em títulos de livros, funciona como o contais.
  if(titulo) busca.titulo = { $regex: titulo, $options: 'i' };

  if(minPage || maxPage) busca.numeroPaginas ={};

  if(minPage) busca.numeroPaginas.$gte = minPage;
  if(maxPage) busca.numeroPaginas.$lte = maxPage;

  if(autor){
    const autorName = await autores.findOne({nome:autor});
    const autorId = autorName._id;
    busca.autor = autorId;
  }

  return busca;
}