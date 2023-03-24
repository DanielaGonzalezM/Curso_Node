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

const getSalario = (id, callback) => {
  const salario = salarios.find((e) => e.id === id)?.salario;
  return salario ? callback(null, salario) : callback("no existe");
};

const id = 5;

getEmpleado(id, (err, empleado) => {
  if (err) {
    console.log("Error");
    return console.log(err);
  }

  getSalario(id, (err, salario) => {
    if (err) {
        return console.log(`El empleado ${empleado.nombre} no tiene información de salario`);
       
    }
    console.log(`empleado ${empleado} tiene salario: ${salario}`);
  });
});


