const getUsuarioByID = (id, callback) => {
  const usuario = {
    id,
    nombre: "Daniela",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1000);
};

getUsuarioByID(10, (user) => {
  console.log(`Hola ${user.nombre.toUpperCase()}`);
});
