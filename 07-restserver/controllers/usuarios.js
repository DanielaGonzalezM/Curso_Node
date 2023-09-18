const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;

  res.status(500).json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);
  await usuario.save();
  res.status(201).json({
    msg: "post API - controlador",
    usuario
  });
};
const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

const usuariosPatch = (req = request, res = response) => {
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
