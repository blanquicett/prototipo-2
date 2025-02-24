document.addEventListener("DOMContentLoaded", () => {
    const capitales = [
        { nombre: "Pasto", departamento: "Nariño" },
        { nombre: "Bogotá", departamento: "Cundinamarca" },
        { nombre: "Medellín", departamento: "Antioquia" },
        { nombre: "Cali", departamento: "Valle del Cauca" },
        { nombre: "Barranquilla", departamento: "Atlántico" }
    ];

    let intentos = 3;
    let aciertos = 0;
    let capitalActual = {};

    const nombreCapital = document.getElementById("nombre-capital");
    const intentosElemento = document.getElementById("intentos");
    const aciertosElemento = document.getElementById("aciertos");
    const mapaContainer = document.getElementById("mapa-container");

    function seleccionarNuevaCapital() {
        if (capitales.length === 0) {
            alert("¡Felicidades! Has identificado todas las capitales.");
            return;
        }
        
        capitalActual = capitales.splice(Math.floor(Math.random() * capitales.length), 1)[0];
        nombreCapital.textContent = capitalActual.nombre;
    }

    mapaContainer.addEventListener("click", (e) => {
        const departamentoSeleccionado = e.target.dataset.departamento;
        if (!departamentoSeleccionado) return;

        if (departamentoSeleccionado === capitalActual.departamento) {
            aciertos++;
            aciertosElemento.textContent = aciertos;
            alert("¡Correcto! Has identificado la capital.");
            event.target.style.fill = "green";
            seleccionarNuevaCapital();
        } else {
            intentos--;
            intentosElemento.textContent = intentos;
            alert("Incorrecto. Intenta de nuevo.");
            if (intentos === 0) {
                alert("¡Has perdido! Vuelve a intentarlo.");
                location.reload();
            }
        }
    });

    seleccionarNuevaCapital();
});
