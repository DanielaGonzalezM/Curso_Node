const empleados = [
  { id: 1, nombre: "Daniela" },
  { id: 2, nombre: "Canela" },
  { id: 3, nombre: "Ceniza" },
];

const salarios = [
  { id: 1, salario: 3000 },
  { id: 2, salario: 2000 },
];

const getEmpleado = (id) => {
  const empleado = empleados.find((e) => e.id === id);
  return new Promise((resolve, reject) => {
    empleado ? resolve(empleado.nombre) : reject(`No existe empleado ${id}`);
  });
};
const getSalario = (id) => {
  const salario = salarios.find((e) => e.id === id)?.salario;
  return new Promise((resolve, reject) => {
    salario
      ? resolve(salario)
      : reject(`El empleado ${id} no tiene información de salario`);
  });
};

const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);
    return `El empleado ${empleado} tiene salario de: ${salario}`;
  } catch (error) {
    throw error;
  }
};
const id = 4;
getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
