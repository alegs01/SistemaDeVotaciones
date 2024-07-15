class Pregunta {
    constructor(texto, opciones) {
        this.texto = texto;
        this.opciones = opciones;
    }

    mostrarPreguntas() {
        console.log(this.texto);
        this.opciones.forEach((opcion, indice) => {
            console.log(indice + 1, ' ', opcion);
        });
    }

    recibirRespuesta() {
        let respuesta = prompt('Ingresa tu respuesta (solo números del 1 al 4)');
        respuesta = parseInt(respuesta, 10); 
        while (isNaN(respuesta) || respuesta < 1 || respuesta > 4) {
            respuesta = prompt('Respuesta no válida, por favor ingrese nuevamente (solo números del 1 al 4)');
            respuesta = parseInt(respuesta, 10); 
        }
        return respuesta;
    }
}

class Encuesta {
    constructor(preguntas) {
        this.preguntas = preguntas;
        this.respuestas = [];
        this.conteos = preguntas.map(() => [0, 0, 0, 0]);
    }

    iniciar() {
        console.clear();
        this.respuestas = [];
        this.preguntas.forEach((pregunta, indice) => {
            pregunta.mostrarPreguntas();
            const respuesta = pregunta.recibirRespuesta(); 
            this.respuestas.push(respuesta);
            this.conteos[indice][respuesta - 1] += 1;
        });
        alert('Ha finalizado la encuesta');
        document.getElementById('btnResultados').style.display = 'inline-block';
        document.getElementById('btnConteos').style.display = 'inline-block';
    }

    mostrarResultados() {
        console.log('Resultados de tu encuesta:');
        this.preguntas.forEach((pregunta, indice) => {
            console.log(`${pregunta.texto} - Respuesta: ${pregunta.opciones[this.respuestas[indice] - 1]}`);
        });
    }

    mostrarConteos() {
        console.clear();
        console.log('Conteo de votos:');
        this.preguntas.forEach((pregunta, indice) => { 
            console.log(`${pregunta.texto}:`);
            pregunta.opciones.forEach((opcion, indiceOpcion) => { 
                console.log(`${opcion}: ${this.conteos[indice][indiceOpcion]} veces`);
            });
        });
    }
}

const preguntas = [
    new Pregunta("¿Cuál es tu dispositivo tecnológico favorito para el día a día?", ["Telefono", "Notebook", "Tablet", "Smartwatch"]),
    new Pregunta("¿Cuál es tu red social favorita?", ["Facebook", "Instagram", "Twitter", "TikTok"]),
    new Pregunta("¿Qué plataforma de streaming prefieres para ver películas y series?", ["Netflix", "Amazon Prime Video", "Disney+", "HBO Max"]),
    new Pregunta("¿Cuál es tu género de videojuegos favorito?", ["Acción/Aventura", "RPG (Role-Playing Game)", "FPS (First-Person Shooter)", "Estrategia"]),
    new Pregunta("¿Qué prefieres usar para escuchar música o podcasts?", ["Auriculares inalámbricos", "Auriculares con cable", "Altavoces Bluetooth", "No suelo utilizar dispositivos de audio"]),
    new Pregunta("¿Qué tipo de contenido prefieres ver en plataformas de video (YouTube, TikTok, etc.)?", ["Educacional", "Entretenimiento", "Vlogs/personal", "Música"]),
    new Pregunta("¿Qué tecnología emergente te interesa más?", ["Inteligencia Artificial", "Realidad Virtual/Aumentada", "Internet de las Cosas (IoT)", "Blockchain"]),
    new Pregunta("¿Cuál es tu plataforma preferida para trabajar o estudiar de forma remota?", ["Zoom", "Microsoft Teams", "Google Meet", "Skype"])
];

const encuesta = new Encuesta(preguntas);

document.getElementById('btnIniciar').addEventListener('click', () => encuesta.iniciar());
document.getElementById('btnResultados').addEventListener('click', () => encuesta.mostrarResultados());
document.getElementById('btnConteos').addEventListener('click', () => encuesta.mostrarConteos());