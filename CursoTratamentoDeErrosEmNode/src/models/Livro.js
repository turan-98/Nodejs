import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
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
      min:[10, "O número de páginas deve estar entre 10 e 5 mil."],
      max:[3000, "O número de páginas deve estar entre 10 e 5 mil."]
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;