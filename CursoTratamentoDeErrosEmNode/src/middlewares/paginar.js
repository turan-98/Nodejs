import RequestError from '../Erros/RequestError.js';
async function  paginar (req, res, next) {
    try{
        let {limite = 5, page = 1, ordenacao = "_id:-1"} = req.query;
        let [campoOrdenacao,ordem] = ordenacao.split(":");
  
        limite = parseInt(limite);
        page = parseInt(page);
        ordem = parseInt(ordem);
  
        const resultado = req.resultado;
        if(limite > 0 && page > 0){
            const resultadopaginado =  await resultado.find()
            .sort({[campoOrdenacao]:ordem})
            .skip((page -1) * limite)
            .limit(limite)
            .exec();
  
          res.status(200).json(resultadopaginado);
        }else{
          next(new RequestError)
        }
    }catch(err){
        next(err);
    }
}
export default paginar;