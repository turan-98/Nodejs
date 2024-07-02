import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true
    },
    editora: {
      type: String, 
      required: [true, "O título do livro é obrigatório"],
      enum:{
        values:["Casa do códgio", "Alura"],
        message:"A editora {VALUE} não é um valor permitido."
      }
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

const livros= mongoose.model('livros', livroSchema);

export default livros;