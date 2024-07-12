import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      autopopulate: {select:'nome'}
    },
    editora: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    numeroPaginas: {
      type: Number,
      validate:{
            validator:(valor) =>{
            //validação personalizada mongoose, retorna um booleano
            return valor >= 10 && valor <= 5000
          },
          message:"O número de páginas deve estar entre 10 e 5000. valor fornecido {VALUE}"
        }
    }
  }
);
livroSchema.plugin(autopopulate);
const livros= mongoose.model('livros', livroSchema);

export default livros;