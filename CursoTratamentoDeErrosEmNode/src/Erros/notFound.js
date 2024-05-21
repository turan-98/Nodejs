import ErroBase from "./ErroBase.js";

class notFound extends ErroBase{
    constructor(msg = 'Página não encontrada'){
        super(msg,404);
    }
}
export default notFound