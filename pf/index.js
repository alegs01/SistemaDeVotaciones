// index.js
let respuestas = [];
let conteos = [];
let preguntas = [];

const mostrarPreguntas = (pregunta) => {
  console.log(pregunta.texto);
  pregunta.opciones.forEach((opcion, indice) => {
    console.log(`${indice + 1}  ${opcion}`);
  });
};

const recibirRespuesta = () => {
  let respuesta = prompt("Ingresa tu respuesta (solo números del 1 al 4)");
  respuesta = parseInt(respuesta, 10);
  while (isNaN(respuesta) || respuesta < 1 || respuesta > 4) {
    respuesta = prompt(
      "Respuesta no válida, por favor ingrese nuevamente (solo números del 1 al 4)"
    );
    respuesta = parseInt(respuesta, 10);
  }
  return respuesta;
};

const iniciarEncuesta = () => {
  console.clear();
  respuestas = [];
  if (conteos.length === 0) {
    conteos = preguntas.map(() => [0, 0, 0, 0]);
  }
  preguntas.forEach((pregunta, indice) => {
    mostrarPreguntas(pregunta);
    const respuesta = recibirRespuesta();
    respuestas.push(respuesta);
    conteos[indice][respuesta - 1] += 1;
  });
  alert("Ha finalizado la encuesta");
  document.getElementById("btnResultados").style.display = "inline-block";
  document.getElementById("btnConteos").style.display = "inline-block";
};

const mostrarResultados = () => {
  console.log("Resultados de tu encuesta:");
  preguntas.forEach((pregunta, indice) => {
    console.log(
      `${pregunta.texto} - Respuesta: ${
        pregunta.opciones[respuestas[indice] - 1]
      }`
    );
  });
};

const mostrarConteos = () => {
  console.clear();
  console.log("Conteo de votos:");
  preguntas.forEach((pregunta, indice) => {
    console.log(`${pregunta.texto}:`);
    pregunta.opciones.forEach((opcion, indiceOpcion) => {
      console.log(`${opcion}: ${conteos[indice][indiceOpcion]} veces`);
    });
  });
};

function openModal() {
  document.getElementById("preguntasModal").style.display = "block";
}

function closeModal() {
  document.getElementById("preguntasModal").style.display = "none";
}

let preguntaIndex = 1;
const maxPreguntas = 4;

const agregarPregunta = () => {
  const preguntaInput = document.querySelector(".pregunta").value;
  const opcionesInputs = document.querySelectorAll(".opciones");

  if (
    preguntaInput === "" ||
    [...opcionesInputs].some((opcion) => opcion.value === "")
  ) {
    alert("Por favor, rellena todos los campos.");
    return;
  }

  preguntas.push({
    texto: preguntaInput,
    opciones: [...opcionesInputs].map((opcion) => opcion.value),
  });

  document.querySelector(".pregunta").value = "";
  opcionesInputs.forEach((opcion) => (opcion.value = ""));

  const campo = document.querySelector(".preguntasI");
  campo.textContent = `Pregunta ${preguntaIndex + 1}`;

  preguntaIndex++;

  if (preguntaIndex > maxPreguntas) {
    document.getElementById("btnPreguntas").style.display = "none";
    document.getElementById("btnIniciar").style.display = "block";
    alert("Has añadido todas las preguntas.");
    closeModal();
  }
};

document
  .querySelector(".continuarModal")
  .addEventListener("click", agregarPregunta);
document
  .getElementById("btnIniciar")
  .addEventListener("click", iniciarEncuesta);
document
  .getElementById("btnResultados")
  .addEventListener("click", mostrarResultados);
document.getElementById("btnConteos").addEventListener("click", mostrarConteos);
