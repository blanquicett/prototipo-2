document.addEventListener("DOMContentLoaded", () => {
    const capitales = [
        { capital: "LETICIA", departamento: "Amazonas" },
        { capital: "MEDELLÍN", departamento: "Antioquia" },
        { capital: "ARAUCA", departamento: "Arauca" },
        { capital: "BARRANQUILLA", departamento: "Atlántico" },
        { capital: "Cartagena de Indias", departamento: "Bolívar" },
        { capital: "Tunja", departamento: "Boyacá" },
        { capital: "Manizales", departamento: "Caldas" },
        { capital: "Florencia", departamento: "Caquetá" },
        { capital: "Yopal", departamento: "Casanare" },
        { capital: "Popayán", departamento: "Cauca" },
        { capital: "Valledupar", departamento: "Cesar" },
        { capital: "Quibdó", departamento: "Chocó" },
        { capital: "Montería", departamento: "Córdoba" },
        { capital: "Bogotá", departamento: "Cundinamarca" },
        { capital: "Inírida", departamento: "Guainía" },
        { capital: "San José del Guaviare", departamento: "Guaviare" },
        { capital: "Neiva", departamento: "Huila" },
        { capital: "Riohacha", departamento: "La Guajira" },
        { capital: "Santa Marta", departamento: "Magdalena" },
        { capital: "Villavicencio", departamento: "Meta" },
        { capital: "Pasto", departamento: "Nariño" },
        { capital: "Cúcuta", departamento: "Norte de Santander" },
        { capital: "Mocoa", departamento: "Putumayo" },
        { capital: "Armenia", departamento: "Quindío" },
        { capital: "Pereira", departamento: "Risaralda" },
        { capital: "Bucaramanga", departamento: "Santander" },
        { capital: "Sincelejo", departamento: "Sucre" },
        { capital: "Ibagué", departamento: "Tolima" },
        { capital: "Cali", departamento: "Valle del Cauca" },
        { capital: "Mitú", departamento: "Vaupés" },
        { capital: "Puerto Carreño", departamento: "Vichada" }
    ];

    let capitalesDisponibles = [...capitales]; 
    let seleccionadas = [];
    let capitalSeleccionada = null;
    const colores = ["#229954", "#d4ac0d", "#d68910", "purple", "#884ea0", "#7d3c98", "#ba4a00", "#273746"]; // Colores para los departamentos acertados
    let colorIndex = 0;

    function obtenerCapitalesAleatorias() {
        seleccionadas = [];
        while (seleccionadas.length < 4 && capitalesDisponibles.length > 0) {
            let index = Math.floor(Math.random() * capitalesDisponibles.length);
            seleccionadas.push(capitalesDisponibles.splice(index, 1)[0]); // Extrae y elimina
        }
    }

    function mostrarCapitales() {
        const lista = document.getElementById("capitales-lista");
        lista.innerHTML = "";
        seleccionadas.forEach(cap => {
            let li = document.createElement("li");
            li.textContent = cap.capital;
            li.dataset.departamento = cap.departamento;
            li.classList.add("capital-item");
            li.addEventListener("click", seleccionarCapital);
            lista.appendChild(li);
        });
    }

    function seleccionarCapital(event) {
        document.querySelectorAll(".capital-item").forEach(item => item.classList.remove("seleccionado"));
        event.target.classList.add("seleccionado");
        capitalSeleccionada = event.target.dataset.departamento;
    }

    function seleccionarDepartamento(event) {
        if (!capitalSeleccionada) {
            alert("Selecciona una capital primero.");
            return;
        }

        let departamentoClickeado = event.target.dataset.departamento;
        let capitalCorrecta = seleccionadas.find(cap => cap.departamento === departamentoClickeado);

        if (capitalCorrecta) {
            alert("¡Correcto!");
            event.target.style.fill = colores[colorIndex % colores.length]; // Cambia el color del departamento
            colorIndex++;

            // Eliminar la capital acertada de la lista
            seleccionadas = seleccionadas.filter(cap => cap.capital !== capitalCorrecta.capital);
            
            // Quitar el elemento de la lista visual
            document.querySelectorAll(".capital-item").forEach(item => {
                if (item.dataset.departamento === departamentoClickeado) {
                    item.remove();
                }
            });

            // Agregar una nueva capital si quedan disponibles
            if (capitalesDisponibles.length > 0) {
                let index = Math.floor(Math.random() * capitalesDisponibles.length);
                seleccionadas.push(capitalesDisponibles.splice(index, 1)[0]); // Extrae y elimina
                mostrarCapitales();
            }

            capitalSeleccionada = null;
        } else {
            alert(`Incorrecto, intenta de nuevo. Ese departamento es: ${departamentoClickeado}`);
        }
    }

    document.querySelectorAll("#features path").forEach(departamento => {
        departamento.addEventListener("click", seleccionarDepartamento);
    });

    obtenerCapitalesAleatorias();
    mostrarCapitales();
});