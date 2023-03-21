const deadpool = {
  nombre: "Wide",
  apellido: "Winston",
  poder: "regeneración",
  getNombre() {
    return `${this.nombre} ${this.apellido}`;
  },
};

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

// const { nombre, apellido, poder, edad = 0 } = deadpool;
// console.log({ nombre, apellido, poder, edad });

function imprimeHero({ nombre, apellido, poder, edad = 0 }) {
  nombre = "test";
  console.log({ nombre, apellido, poder, edad });
}

// imprimeHero(deadpool);

const heroes = ["Deadpool", "Superman", "Batman"];
// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];
const [, , h3] = heroes;
console.log(h3);
