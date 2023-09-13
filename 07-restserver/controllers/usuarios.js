const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "get API - controlador",
  });
};

const usuariosPut = (req, res = response) => {
  res.status(500).json({
    msg: "put API - controlador",
  });
};

const usuariosPost = (req, res = response) => {
  const {nombre,edad} = req.body;
  res.status(201).json({
    msg: "post API - controlador",
    nombre,
    edad,
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
};
