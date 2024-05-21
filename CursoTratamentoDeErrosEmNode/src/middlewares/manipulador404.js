import notFound from "../Erros/notFound";

function manipulador404(req,res, next){
 const error = new notFound();
 next(error);
}
export default manipulador404;