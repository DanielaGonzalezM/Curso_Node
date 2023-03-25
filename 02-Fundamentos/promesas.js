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
const id = 34;

// getEmpleado(id)
//   .then((empleado) => {
//     getSalario(id)
//       .then((salario) =>
//         console.log(`empleado ${empleado} tiene salario: ${salario}`)
//       )
//       .catch(() =>
//         console.log(`El empleado ${empleado} no tiene información de salario`)
//       );
//   })
//   .catch((err) => console.log(err));

let nombre;
getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log(`empleado ${nombre} tiene salario: ${salario}`)
  )
  .catch((err) => console.log(err));
