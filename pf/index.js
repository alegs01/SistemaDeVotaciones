let respuestas = [];
let conteos = [];

const mostrarPreguntas = (pregunta) => {
    console.log(pregunta.texto);
    pregunta.opciones.forEach((opcion, indice) => {
        console.log(`${indice + 1}  ${opcion}`);
    });
};

const recibirRespuesta = () => {
    let respuesta = prompt('Ingresa tu respuesta (solo números del 1 al 4)');
    respuesta = parseInt(respuesta, 10); 
    while (isNaN(respuesta) || respuesta < 1 || respuesta > 4) {
        respuesta = prompt('Respuesta no válida, por favor ingrese nuevamente (solo números del 1 al 4)');
        respuesta = parseInt(respuesta, 10); 
    }
    return respuesta;
};

const iniciarEncuesta = (preguntas) => {
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
    alert('Ha finalizado la encuesta');
    document.getElementById('btnResultados').style.display = 'inline-block';
    document.getElementById('btnConteos').style.display = 'inline-block';
};

const mostrarResultados = (preguntas, respuestas) => {
    console.log('Resultados de tu encuesta:');
    preguntas.forEach((pregunta, indice) => {
        console.log(`${pregunta.texto} - Respuesta: ${pregunta.opciones[respuestas[indice] - 1]}`);
    });
};

const mostrarConteos = (preguntas, conteos) => {
    console.clear();
    console.log('Conteo de votos:');
    preguntas.forEach((pregunta, indice) => { 
        console.log(`${pregunta.texto}:`);
        pregunta.opciones.forEach((opcion, indiceOpcion) => { 
            console.log(`${opcion}: ${conteos[indice][indiceOpcion]} veces`);
        });
    });
};

function openModal() {

    document.getElementById('preguntasModal').style.display = 'block';

};

function closeModal() {
    document.getElementById('preguntasModal').style.display = 'none';
};

function siguiente() {

    pregunta = document.getElementsByClassName('pregunta');

    opciones = document.getElementsByClassName('opciones');


    preguntas.push({ texto: pregunta, opciones: opciones });

}

// Índice para rastrear el número de pregunta actual
let preguntaIndex = 1;

// Número máximo de preguntas permitidas
const maxPreguntas = 4;

// Manejador de eventos para el botón 'Siguiente'
document.querySelector('.continuarModal').addEventListener('click', function() {
    // Obtener la pregunta y opciones del formulario
    const preguntaInput = document.querySelector('.pregunta').value;
    const opcionesInputs = document.querySelectorAll('.opciones');

    // Validar que todos los campos estén llenos
    if (preguntaInput === '' || [...opcionesInputs].some(opcion => opcion.value === '')) {
        alert('Por favor, rellena todos los campos.');
        return;
    }

    // Añadir la pregunta y opciones al arreglo
    preguntas.push({
        texto: preguntaInput,
        opciones: [...opcionesInputs].map(opcion => opcion.value)
    });

    // Vaciar los campos de entrada
    document.querySelector('.pregunta').value = '';
    opcionesInputs.forEach(opcion => opcion.value = '');

    // Actualizar el texto del único <p> con la clase 'preguntasI'
    const campo = document.querySelector('.preguntasI');
    campo.textContent = `Pregunta ${preguntaIndex+1}`;

    // Incrementar el índice para la próxima pregunta
    preguntaIndex++;

    // Verificar si se ha alcanzado el límite de preguntas
    if (preguntaIndex > maxPreguntas) {
        // Ocultar el botón de preguntas y mostrar el botón de iniciar
        document.getElementById('btnPreguntas').style.display = 'none';
        document.getElementById('btnIniciar').style.display = 'block';
        alert('Has añadido todas las preguntas.');
        closeModal();
        console.log(preguntas);
    }
});


const preguntas = [


/*     { texto: "¿Cuál es tu dispositivo tecnológico favorito para el día a día?", opciones: ["Smartphone", "Notebook", "Tablet", "Smartwatch"] },
    { texto: "¿Cuál es tu red social favorita?", opciones: ["Facebook", "Instagram", "Twitter", "TikTok"] },
    { texto: "¿Qué plataforma de streaming prefieres para ver películas y series?", opciones: ["Netflix", "Amazon Prime Video", "Disney+", "HBO Max"] },
    { texto: "¿Cuál es tu género de videojuegos favorito?", opciones: ["Acción/Aventura", "RPG (Role-Playing Game)", "FPS (First-Person Shooter)", "Estrategia"] },
    { texto: "¿Qué prefieres usar para escuchar música o podcasts?", opciones: ["Auriculares inalámbricos", "Auriculares con cable", "Altavoces Bluetooth", "No suelo utilizar dispositivos de audio"] },
    { texto: "¿Qué tipo de contenido prefieres ver en plataformas de video (YouTube, TikTok, etc.)?", opciones: ["Educacional", "Entretenimiento", "Vlogs/personal", "Música"] },
    { texto: "¿Qué tecnología emergente te interesa más?", opciones: ["Inteligencia Artificial", "Realidad Virtual/Aumentada", "Internet de las Cosas (IoT)", "Blockchain"] },
    { texto: "¿Cuál es tu plataforma preferida para trabajar o estudiar de forma remota?", opciones: ["Zoom", "Microsoft Teams", "Google Meet", "Skype"] } */
];

document.getElementById('btnIniciar').addEventListener('click', () => iniciarEncuesta(preguntas));
document.getElementById('btnResultados').addEventListener('click', () => mostrarResultados(preguntas, respuestas));
document.getElementById('btnConteos').addEventListener('click', () => mostrarConteos(preguntas, conteos));
