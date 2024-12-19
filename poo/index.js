class Pregunta {
  constructor(texto, opciones) {
    this.texto = texto;
    this.opciones = opciones;
  }

  mostrarPregunta() {
    console.log(this.texto);
    this.opciones.forEach((opcion, indice) => {
      console.log(`${indice + 1}  ${opcion}`);
    });
  }

  recibirRespuesta() {
    let respuesta = prompt("Ingresa tu respuesta (solo números del 1 al 4)");
    respuesta = parseInt(respuesta, 10);
    while (isNaN(respuesta) || respuesta < 1 || respuesta > 4) {
      respuesta = prompt(
        "Respuesta no válida, por favor ingrese nuevamente (solo números del 1 al 4)"
      );
      respuesta = parseInt(respuesta, 10);
    }
    return respuesta;
  }
}

class Encuesta {
  constructor() {
    this.preguntas = [];
    this.respuestas = [];
    this.conteos = [];
  }

  agregarPregunta(pregunta) {
    this.preguntas.push(pregunta);
    this.conteos.push([0, 0, 0, 0]);
  }

  iniciar() {
    console.clear();
    this.respuestas = [];
    this.preguntas.forEach((pregunta, indice) => {
      pregunta.mostrarPregunta();
      const respuesta = pregunta.recibirRespuesta();
      this.respuestas.push(respuesta);
      this.conteos[indice][respuesta - 1] += 1;
    });
    alert("Ha finalizado la encuesta");
    document.getElementById("btnResultados").style.display = "inline-block";
    document.getElementById("btnConteos").style.display = "inline-block";
  }

  mostrarResultados() {
    console.log("Resultados de tu encuesta:");
    this.preguntas.forEach((pregunta, indice) => {
      console.log(
        `${pregunta.texto} - Respuesta: ${
          pregunta.opciones[this.respuestas[indice] - 1]
        }`
      );
    });
  }

  mostrarConteos() {
    console.clear();
    console.log("Conteo de votos:");
    this.preguntas.forEach((pregunta, indice) => {
      console.log(`${pregunta.texto}:`);
      pregunta.opciones.forEach((opcion, indiceOpcion) => {
        console.log(`${opcion}: ${this.conteos[indice][indiceOpcion]} veces`);
      });
    });
  }
}

class EncuestaUI {
  constructor(encuesta) {
    this.encuesta = encuesta;
    this.preguntaIndex = 1;
    this.maxPreguntas = 4;
  }

  openModal() {
    document.getElementById("preguntasModal").style.display = "block";
  }

  closeModal() {
    document.getElementById("preguntasModal").style.display = "none";
  }

  agregarPregunta() {
    const preguntaInput = document.querySelector(".pregunta").value;
    const opcionesInputs = document.querySelectorAll(".opciones");

    if (
      preguntaInput === "" ||
      [...opcionesInputs].some((opcion) => opcion.value === "")
    ) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const nuevaPregunta = new Pregunta(
      preguntaInput,
      [...opcionesInputs].map((opcion) => opcion.value)
    );
    this.encuesta.agregarPregunta(nuevaPregunta);

    document.querySelector(".pregunta").value = "";
    opcionesInputs.forEach((opcion) => (opcion.value = ""));

    const campo = document.querySelector(".preguntasI");
    campo.textContent = `Pregunta ${this.preguntaIndex + 1}`;

    this.preguntaIndex++;

    if (this.preguntaIndex > this.maxPreguntas) {
      document.getElementById("btnPreguntas").style.display = "none";
      document.getElementById("btnIniciar").style.display = "block";
      alert("Has añadido todas las preguntas.");
      this.closeModal();
    }
  }

  mostrarBotonIniciar() {
    document.getElementById("btnPreguntas").style.display = "none";
    document.getElementById("btnIniciar").style.display = "block";
  }
}

// Inicializando las clases
const encuesta = new Encuesta();
const encuestaUI = new EncuestaUI(encuesta);

// Eventos de botones
document
  .querySelector(".continuarModal")
  .addEventListener("click", () => encuestaUI.agregarPregunta());

document
  .getElementById("btnIniciar")
  .addEventListener("click", () => encuesta.iniciar());

document
  .getElementById("btnResultados")
  .addEventListener("click", () => encuesta.mostrarResultados());

document
  .getElementById("btnConteos")
  .addEventListener("click", () => encuesta.mostrarConteos());

document
  .getElementById("btnPreguntas")
  .addEventListener("click", () => encuestaUI.openModal());
