 // Simulación de carga y mostrar menú
 window.onload = function() {
    setTimeout(() => {
        document.getElementById('pantalla-carga').style.display = 'none';
        document.getElementById('menu').classList.remove('oculto');
    }, 1000); // Simulación de 2 segundos
};
document.addEventListener("DOMContentLoaded", () => {
    const facilBtn = document.getElementById("facil");
    const intermedioBtn = document.getElementById("intermedio");
    
    facilBtn.addEventListener("click", () => {
        window.location.href = "facil.html";
    });
    
    intermedioBtn.addEventListener("click", () => {
        window.location.href = "intermedio.html";
    });
});
