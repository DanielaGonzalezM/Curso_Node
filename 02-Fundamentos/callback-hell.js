const empleados = [
  { id: 1, nombre: "Daniela" },
  { id: 2, nombre: "Canela" },
  { id: 3, nombre: "Ceniza" },
];

const salarios = [
  { id: 1, salario: 3000 },
  { id: 2, salario: 2000 },
];

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id);
  return empleado ? callback(null, empleado) : callback("no existe");
};

getEmpleado(2, (err, empleado) => {
  if (err) {
    console.log("Error");
    return console.log(err);
  }
  console.log(empleado);
});
