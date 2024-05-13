import ErroBase from "./ErroBase.js";

class RequestError extends ErroBase{
    constructor(msg = "Um ou mais dados fornecidos estão incorretos"){
        //chamando construtor do ErroBase
        super(msg, 400);
    }
}
export default RequestError;