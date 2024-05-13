import mongoose from "mongoose";
import ErroBase from "../Erros/ErroBase.js";
import RequestError from "../Erros/RequestError.js";
import ValidationError from "../Erros/ValidationError.js";
// middleware de erro, caracterizado por sempre ter 4 parametros
// essa função vai capturar todo tipo de erro.
// assim ajuda a evitar a repetição de código.

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
    //Imprimindo erro para o desenvolvedor
    console.log(erro)

    // erro interno do moongose que podemos acessar 
    if(erro instanceof mongoose.Error.CastError)
      new RequestError().sendAnswer(res);
    else if(erro instanceof mongoose.Error.ValidationError )
      new ValidationError(erro).sendAnswer(res);
    else
      new ErroBase().sendAnswer(res);
  }
export default manipuladorDeErros

/**
 * Middleware são funções que basicamente interceptam alguma requisição que são lançadas para a API
 */