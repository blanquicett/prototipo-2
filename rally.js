document.addEventListener("DOMContentLoaded", () => {
    const mapaContainer = document.getElementById("mapa-container");
    const pistaElemento = document.getElementById("pista");
    const intentosElemento = document.getElementById("intentos");
    const botonReiniciar = document.getElementById("reiniciar");

    const departamentos = [
        { nombre: "Cundinamarca", capital: "Bogotá", clima: "Frío" },
        { nombre: "Antioquia", capital: "Medellín", clima: "Templado" },
        { nombre: "Valle del Cauca", capital: "Cali", clima: "Cálido" },
        { nombre: "Santander", capital: "Bucaramanga", clima: "Cálido" },
        { nombre: "Nariño", capital: "Pasto", clima: "Frío" },
        { nombre: "Quindío", capital: "Armenia", clima: "Templado" },
        { nombre: "Risaralda", capital: "Pereira", clima: "Templado" },
        { nombre: "Huila", capital: "Neiva", clima: "Cálido" },
        { nombre: "Tolima", capital: "Ibagué", clima: "Cálido" },
        { nombre: "Cauca", capital: "Popayán", clima: "Cálido" },
        { nombre: "Vichada", capital: "Puerto Carreño", clima: "Cálido" },
        { nombre: "Venezuela", capital: "Caracas", clima: "Frío" },
        { nombre: "Arauca", capital: "Arauca", clima: "Cálido" },
        { nombre: "Bolívar", capital: "Cartagena de Indias", clima: "Templado" },
        { nombre: "Cesar", capital: "Valledupar", clima: "Cálido" },
        { nombre: "Caquetá", capital: "Florencia", clima: "Templado" },
        { nombre: "Cañar", capital: "Yopal", clima: "Cálido" },
        { nombre: "Guaviare", capital: "San José del Guaviare", clima: "Cálido" },
        { nombre: "Guainía", capital: "Inírida", clima: "Cálido" },
        { nombre: "Huila", capital: "Neiva", clima: "Cálido" },
        { nombre: "La Guajira", capital: "Riohacha", clima: "Cálido" },
        { nombre: "Magdalena", capital: "Santa Marta", clima: "Templado" },
        { nombre: "Meta", capital: "Villavicencio", clima: "Cálido" },
        { nombre: "Norte de Santander", capital: "San José de Cuba", clima: "Cálido" },
        { nombre: "Putumayo", capital: "Mocoa", clima: "Cálido" },
        { nombre: "Quindío", capital: "Armenia", clima: "Templado" },
        { nombre: "Risaralda", capital: "Pereira", clima: "Templado" },
        { nombre: "Sucre", capital: "Sincelejo", clima: "Cálido" },
        { nombre: "Santander", capital: "Bucaramanga", clima: "Cálido" },
        { nombre: "Sucre", capital: "Sincelejo", clima: "Cálido" },
        { nombre: "Tolima", capital: "Ibagué", clima: "Cálido" },
    ];

    let intentosRestantes = 10;
    let tesoroDepartamento = null;
    let pistasPrincipales = [];
    let pistasTesoro = [
        "El tesoro se encuentra en un departamento cuyo clima es frío.",
        "El tesoro está en un departamento con una bandera verde y amarilla.",
        "El tesoro está en un departamento conocido por sus paisajes montañosos."
    ];
    let pistaActual = 0;

    function iniciarJuego() {
        // Seleccionar un departamento aleatorio para el tesoro
        tesoroDepartamento = departamentos[Math.floor(Math.random() * departamentos.length)];
        intentosRestantes = 10;
        pistaActual = 0;

        // Generar pistas principales
        pistasPrincipales = generarPistasPrincipales();
        pistaElemento.textContent = pistasPrincipales[pistaActual];
        intentosElemento.textContent = intentosRestantes;
    }

    function generarPistasPrincipales() {
        const pistas = [];
        const departamentosAleatorios = [...departamentos].sort(() => Math.random() - 0.5).slice(0, 5);

        departamentosAleatorios.forEach((departamento, index) => {
            pistas.push(`La siguiente pista está en el departamento cuya capital es ${departamento.capital}.`);
        });

        return pistas;
    }

    function manejarClick(event) {
        const departamentoSeleccionado = event.target.getAttribute("data-departamento");
        if (!departamentoSeleccionado || intentosRestantes <= 0) return;

        const departamento = departamentos.find(d => d.nombre === departamentoSeleccionado);
        if (!departamento) return;

        if (departamento.nombre === tesoroDepartamento.nombre) {
            alert("¡Felicidades! Has encontrado el tesoro.");
            iniciarJuego();
        } else if (pistaActual < pistasPrincipales.length) {
            // Verificar si el departamento seleccionado es el de la pista actual
            const pistaCapital = pistasPrincipales[pistaActual].split("cuya capital es ")[1].replace(".", "");
            if (departamento.capital === pistaCapital) {
                pistaActual++;
                if (pistaActual < pistasPrincipales.length) {
                    pistaElemento.textContent = pistasPrincipales[pistaActual];
                } else {
                    pistaElemento.textContent = pistasTesoro[Math.floor(Math.random() * pistasTesoro.length)];
                }
            } else {
                alert("Este no es el departamento de la pista.");
                intentosRestantes--;
                intentosElemento.textContent = intentosRestantes;
            }
        } else {
            alert("Aquí no hay nada, sigue buscando.");
            intentosRestantes--;
            intentosElemento.textContent = intentosRestantes;
        }

        if (intentosRestantes === 0) {
            alert(`¡Se acabaron los intentos! El tesoro estaba en ${tesoroDepartamento.nombre}`);
            iniciarJuego();
        }
    }

    mapaContainer.addEventListener("click", manejarClick);
    botonReiniciar.addEventListener("click", iniciarJuego);

    // Iniciar juego al cargar la página
    iniciarJuego();
});