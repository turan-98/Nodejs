import RequestError from "./RequestError.js";

class ValidationError extends RequestError{
    constructor(erro){
        const messageErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ");
    super(`Os seguintes erros foram encontrados: ${messageErro}`);
    }
}

export default ValidationError;