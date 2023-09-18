const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligfatorio"],
  },
  correo: {
    type: String,
    require: [true, "El correo es obligfatorio"],
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligfatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Usuario", UsuarioSchema);
