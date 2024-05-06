import mongoose from "mongoose";
// middleware de erro, caracterizado por sempre ter 4 parametros
// essa função vai capturar todo tipo de erro.
// assim ajuda a evitar a repetição de código.

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
    // erro interno do moongose que podemos acessar 
    if(erro instanceof mongoose.Error.CastError)
      res.status(400).json({message:"Bad request."});
    else
      res.status(500).send({message: `${erro.message} Erro interno do servidor.`});
  }
export default manipuladorDeErros

/**
 * Middleware são funções que basicamente interceptam alguma requisição que são lançadas para a API
 */