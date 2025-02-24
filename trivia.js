document.addEventListener("DOMContentLoaded", function () {
    const preguntaElemento = document.getElementById("pregunta");
    const opcionesElemento = document.getElementById("opciones");
    const temporizadorElemento = document.getElementById("temporizador");
    


    // Preguntas normales
    const preguntasFaciles = [
        {
            pregunta: "¿Cuál es la capital de Colombia?",
            opciones: ["Lima", "Quito", "Bogotá", "Caracas"],
            respuesta: "Bogotá"
        },
        {
            pregunta: "¿Cuál es la capital de Argentina?",
            opciones: ["Montevideo", "Buenos Aires", "Asunción", "Santiago"],
            respuesta: "Buenos Aires"
        },
        {
            pregunta: "¿Cuál es la capital de México?",
            opciones: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
            respuesta: "Ciudad de México"
        }
    ];

    // Preguntas más complejas
    const preguntasDificiles = [
        {
            pregunta: "¿Cuál es la capital de Canadá?",
            opciones: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
            respuesta: "Ottawa"
        },
        {
            pregunta: "¿Cuál es la capital de Australia?",
            opciones: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
            respuesta: "Canberra"
        },
        {
            pregunta: "¿Cuál es la capital de Sudáfrica?",
            opciones: ["Ciudad del Cabo", "Pretoria", "Johannesburgo", "Durban"],
            respuesta: "Pretoria"
        }
    ];

    let tiempoRestante = 10;
    let intervaloTiempo;
    let preguntasFacilesRestantes = [...preguntasFaciles];
    let preguntasDificilesRestantes = [...preguntasDificiles];
    let preguntaAnterior = null;
    let respuestasCorrectas = 0;
    let racha = 0;
    let puntos = 0;
    let powerUpDisponible = false;
    const totalPreguntas = preguntasFaciles.length + preguntasDificiles.length;

    function iniciarTrivia() {
        mostrarPregunta();
    }

    function obtenerPreguntaAleatoria(preguntas) {
        const indice = Math.floor(Math.random() * preguntas.length);
        const pregunta = preguntas[indice];
        preguntas.splice(indice, 1); // Elimina la pregunta usada
        return pregunta;
    }

    function mostrarPregunta() {
        // Verificar si se han respondido todas las preguntas
        if (respuestasCorrectas === totalPreguntas) {
            mostrarModal("¡Felicitaciones! 🎉", 
                `¡Has completado todas las preguntas correctamente!\nPuntos totales: ${puntos}`, true);
            return;
        }

        let preguntaActual;
        if (racha >= 3 && preguntasDificilesRestantes.length > 0) {
            // 50% de probabilidad de obtener una pregunta difícil si hay racha
            if (Math.random() < 0.5) {
                preguntaActual = obtenerPreguntaAleatoria(preguntasDificilesRestantes);
            } else {
                preguntaActual = obtenerPreguntaAleatoria(preguntasFacilesRestantes);
            }
        } else {
            preguntaActual = obtenerPreguntaAleatoria(preguntasFacilesRestantes);
        }

        // Si no hay pregunta disponible, intentar con el otro conjunto
        if (!preguntaActual) {
            if (preguntasDificilesRestantes.length > 0) {
                preguntaActual = obtenerPreguntaAleatoria(preguntasDificilesRestantes);
            } else if (preguntasFacilesRestantes.length > 0) {
                preguntaActual = obtenerPreguntaAleatoria(preguntasFacilesRestantes);
            }
        }

        preguntaElemento.textContent = preguntaActual.pregunta;
        opcionesElemento.innerHTML = "";

        // Mezclar las opciones
        const opcionesMezcladas = [...preguntaActual.opciones].sort(() => Math.random() - 0.5);
        
        opcionesMezcladas.forEach(opcion => {
            const boton = document.createElement("button");
            boton.textContent = opcion;
            boton.onclick = () => verificarRespuesta(boton, opcion, preguntaActual.respuesta);
            opcionesElemento.appendChild(boton);
        });

        iniciarTemporizador();
    }

    function verificarRespuesta(boton, seleccion, respuestaCorrecta) {
        clearInterval(intervaloTiempo);

        if (seleccion === respuestaCorrecta) {
            boton.classList.add("correcto");
            respuestasCorrectas++;
            racha++;
            tiempoRestante += 3;
            
            puntos += racha >= 3 ? 2 : 1;

            if (racha >= 3) {
                mostrarMensajeRacha(racha);
            }
            if (racha === 5) {
                powerUpDisponible = true;
                mostrarPowerUp();
            }
            setTimeout(() => mostrarPregunta(), 1000);
        } else {
            boton.classList.add("incorrecto");
            tiempoRestante -= 5;
            racha = 0;
            if (tiempoRestante < 0) tiempoRestante = 0;
            mostrarModal("¡Oops!", `Incorrecto. La respuesta correcta era: ${respuestaCorrecta}. 😢`, false);
        }
    }

    function iniciarTemporizador() {
        temporizadorElemento.textContent = `⏳ ${tiempoRestante}s`;

        intervaloTiempo = setInterval(() => {
            tiempoRestante--;
            temporizadorElemento.textContent = `⏳ ${tiempoRestante}s`;

            if (tiempoRestante <= 0) {
                clearInterval(intervaloTiempo);
                mostrarModal("¡Se acabó el tiempo!", `No lograste responder a tiempo. ¡Inténtalo de nuevo! ⏳\nPuntos totales: ${puntos}`, false);
            }
        }, 1000);
    }

    function mostrarMensajeRacha(racha) {
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje-racha");
        mensaje.textContent = `¡Racha de ${racha} respuestas correctas! 🚀`;
        document.body.appendChild(mensaje);

        setTimeout(() => {
            document.body.removeChild(mensaje);
        }, 2000);
    }

    function mostrarPowerUp() {
        const powerUp = document.createElement("div");
        powerUp.classList.add("power-up");
        powerUp.textContent = "¡Power-up desbloqueado! 🎁";
        document.body.appendChild(powerUp);

        setTimeout(() => {
            document.body.removeChild(powerUp);
        }, 2000);
    }

    function mostrarModal(titulo, mensaje, esGanador) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const contenidoModal = document.createElement("div");
        contenidoModal.classList.add("modal-contenido");

        const tituloModal = document.createElement("h2");
        tituloModal.textContent = titulo;

        const mensajeModal = document.createElement("p");
        mensajeModal.textContent = mensaje;

        const botonModal = document.createElement("button");
        botonModal.textContent = esGanador ? "¡Jugar de nuevo!" : "Reintentar";
        botonModal.onclick = () => {
            document.body.removeChild(modal);
            reiniciarJuego();
        };

        contenidoModal.appendChild(tituloModal);
        contenidoModal.appendChild(mensajeModal);
        contenidoModal.appendChild(botonModal);
        modal.appendChild(contenidoModal);
        document.body.appendChild(modal);
    }

    function reiniciarJuego() {
        preguntasFacilesRestantes = [...preguntasFaciles];
        preguntasDificilesRestantes = [...preguntasDificiles];
        respuestasCorrectas = 0;
        racha = 0;
        puntos = 0;
        tiempoRestante = 10;
        mostrarPregunta();
    }

    iniciarTrivia();
});