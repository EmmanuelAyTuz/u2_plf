"use strict";

//Requerimientos
const readline = require("readline");

//Funciones
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "emmanuel> "
  //terminal: false
});

const expo = (a, b) => a + " ^ " + b + " = " + Math.pow(a, b);

const range = (i, f, n) => {
  if (f < i) {
    return "El final no puede ser menor al inicio.";
  }

  if (n >= i && n <= f) {
    return "El número se encuentra en el rango " + i + " ~ " + f;
  }

  return "El número NO se encuentra en el rango " + i + " ~ " + f;
};

const seconds = secs => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  return "Horas: " + hours + "\nMinutos: " + minutes + "\nSegundos: " + seconds;
};

const major = num => "El mayor: " + Math.max.apply(Math, num.split(" "));

const sum = num => {
  let sp = num.split(" ");
  let sum = 0;
  sp.forEach(n => (sum += parseInt(n)));
  return "La suma: " + sum;
};

const exists = (lt, s) => lt.includes(s);

const sorted = a => {
  let array = a.split(" ");
  //array.sort();
  const limit = array.length - 1;
  for (let i = 0; i < limit; i++) {
    const current = array[i],
      next = array[i + 1];
    if (current > next) {
      return false;
    }
  }
  return true;
};

const equals = (a, b) =>
  JSON.stringify(a) == JSON.stringify(b) ? true : false;

const oddsum = n => {
  if (n < 0) {
    return "Error! no negativos.";
  }
  if (n == 0) {
    return 0;
  }
  let sum = oddsum(n - 1);
  if (n % 2 != 0) {
    sum += n;
  }
  return sum;
};

const evenlist = ls => {
  //return ls.filter(n => !(n % 2));
  let result = [];
  if (ls.length === 0) {
    return result;
  }
  if (ls[0] % 2 === 0) {
    result.push(ls[0]);
  }
  return result.concat(evenlist(ls.slice(1)));
};

const conjdata = (al, bl) => {
  return {
    u: new Set([...al, ...bl]),
    i: new Set([...al].filter(x => bl.has(x))),
    d: new Set([...al].filter(x => !bl.has(x)))
  };
};

const getValFromMap = (mp, i) => mp.get(parseInt(i));

//Start Test
const out = (text, method) => {
  rl.question(text, n => {
    console.log(method(n));
    rl.close();
  });
};
//End Test

const options = op => {
  switch (parseInt(op)) {
    case 1:
      rl.question("x: ", x => {
        rl.question("n: ", n => {
          console.log(expo(x, n));
          rl.close();
        });
      });
      break;
    case 2:
      //Rango
      rl.question("número: ", n => {
        console.log(
          range(
            Math.floor(Math.random() * -100) + -1, // -1 a -100
            Math.floor(Math.random() * 101), // 0 a 100
            n
          )
        );
        rl.close();
      });
      break;
    case 3:
      //Segundos, determinar la cantidad de horas, minutos y segundos que contiene
      out("segundos: ", seconds); //Prueba
      break;
    case 4:
      //Mayor
      out("números {1 2 n..}: ", major);
      break;
    case 5:
      //Suma
      out("números {1 2 n..}: ", sum);
      break;
    case 6:
      //Existe
      let listn = ["hola", "mundo", "!"];
      console.log("lista: " + listn);
      rl.question("número: ", n => {
        console.log(exists(listn, n));
        rl.close();
      });
      break;
    case 7:
      //Ordenado
      out("números {1 2 n..}: ", sorted);
      break;
    case 8:
      //Iguales
      let lsa = ["a", "b", "x"];
      let lsb = ["a", "b", "c"];
      console.log("Lista 1: " + lsa);
      console.log("Lista 2: " + lsb);
      console.log(equals(lsa, lsb));
      break;
    case 9:
      //Impares 1, 3, 5, 7, 9, n.. suma
      rl.question("1 hasta n: ", n => {
        console.log("La suma es: " + oddsum(parseInt(n)));
        rl.close();
      });
      break;
    case 10:
      //Numeros pares de lista
      let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      console.log("Lista: " + num);
      console.log("Pares: " + evenlist(num));
      rl.close();
      break;
    case 11:
      //Cargar calcular la unión, intersección y diferencia de dos conjuntos
      let ax = new Set(["a", "b", "c"]);
      let bx = new Set(["d", "a", "b", "x"]);

      console.log("Conjunto 1: ");
      console.log(ax);
      console.log("Conjunto 2: ");
      console.log(bx);
      console.log("\n");
      let tmp = conjdata(ax, bx);
      console.log("Unión:");
      console.log(tmp.u);
      console.log("Intersección:");
      console.log(tmp.i);
      console.log("Diferencia:");
      console.log(tmp.d);
      rl.close();
      break;
    case 12:
      //Definir un mapa de datos y permita encontrar un valor a partir de su clave
      let mp = new Map();
      mp.set(0, "Programación");
      mp.set(1, "Unidad");
      mp.set(2, "1");

      console.log("Mapa de datos: ");
      for (const [k, v] of mp.entries()) {
        console.log(k, v);
      }

      rl.question("Index: ", n => {
        console.log(getValFromMap(mp, n));
        rl.close();
      });
      break;
    default:
        rl.close();
  }
};

console.log(
  "1. número x elevado a una potencia n\n2. número n en un rango\n3. n segundos a equivalente [h, m, s]\n4. el mayor de 4 enteros\n5. calcular la suma de una lista\n6. determinar si un elemento está en una lista\n7. determinar si una lista ésta ordenada.\n8, determinar si son iguales dos listas\n9. determinar recursivamente la suma de los numeros impares\n10. determinar recursivamente los pares de una lista\n11. calcular la unión, intersección y diferencia de dos conjuntos\n12. definir un mapa de datos y permita encontrar un valor a partir de su clave\n"
);

rl.prompt();
rl.on("line", op => {
  options(op);
});
