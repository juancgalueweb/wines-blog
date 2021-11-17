const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WineSchema = new Schema({
  brand: {
    type: String,
    required: [true, "El vino debe tener una marca"],
  },
  bottleCapacity: {
    type: Number,
    required: [true, "Se debe especificar la capacidad de la botella en ml"],
  },
  origin: {
    type: String,
    required: [true, "Especificar el valle o lugar donde se cosechó el vino"],
  },
  type: {
    type: String,
    required: [
      true,
      "Especificar que tipo de vino es: tinto, blanco, blend...",
    ],
  },
  variety: {
    type: String,
    required: [true, "La cepa del vino es requerida"],
  },
  alcoholicStrength: {
    type: Number,
    required: [true, "Se requiere indicar el grado alcophólico del vino"],
  },
  year: {
    type: Number,
    required: [true, "Se requiere el año de la cosecha"],
  },
  classification: {
    type: String,
    required: [
      true,
      "Se requiere especificar la clasificación del vino según el fabricante, ej: Reserva, Gran Reserva",
    ],
  },
  rating: {
    type: Number,
    required: [true, "Debe clasificar su vino"],
  },
  price: {
    type: Number,
    required: [true, "Debe indicar el costo de la botella de vino"],
  },
  // imageURL: {
  //   type: String,
  //   required: [true, "El vino requiere una URL para su imagen"],
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    required: [true, "El ID del usuario es requerido"],
  },
});

//Convertir el esquema en modelo y exportarlo
const WineModel = model("Wine model", WineSchema);
module.exports = WineModel;
