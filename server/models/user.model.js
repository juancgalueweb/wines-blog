import uniqueValidator from "mongoose-unique-validator";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "El usuario requiere un nombre completo"],
      minlength: [5, "Mínimo 5 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El usuario requiere un e-mail válido"],
      unique: [true, "El e-mail ya existe en la base de datos"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Por favor, ingrese un correo válido",
      },
    },
    isAdult: {
      type: Boolean,
      required: [true, "El usuario debe ser mayor de edad"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "6 characters min"],
    },
  },
  { timestamps: true }
);

//Aplicar el plugin de uniqueValidator al UserSchema
UserSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

//Convertir el esquema en modelo y exportarlo
const UserModel = model("User model", UserSchema);
export default UserModel;
