let progresoReal = 69;
let metaPeso = document.getElementById('metaPeso').value;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("pesoActual").value = localStorage.getItem("pesoActual") || "No disponible";
    document.getElementById("metaSalud").value = localStorage.getItem("metaSalud") || "No disponible";
    document.getElementById("planDieta").value = localStorage.getItem("planDieta") || "No disponible";
});

// Botón de actualizar: muestra una alerta de actualización
document.getElementById("actualizar").addEventListener("click", function() {
    alert("Datos actualizados correctamente");
});

// Botón de guardar: envía los datos al backend
document.getElementById("guardar").addEventListener("click", async function(event) {
    event.preventDefault();

    const descripcion = document.querySelector("textarea").value;
    const fechaObjetivo = document.querySelector("input[type='date']").value;
    const pesoActual = document.getElementById("pesoActual").value;
    const metaPeso = document.getElementById("metaPeso").value;
    const planDieta = document.getElementById("planDieta").value;

    const response = await fetch("http://127.0.0.1:8000/api/objetivo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
            descripcion,
            fecha_objetivo: fechaObjetivo,
            peso_actual: pesoActual,
            meta_peso: metaPeso,
            plan_dieta: planDieta
        })
    });

    const data = await response.json();
    alert(data.mensaje);
});

// Gráfica de progreso
const ctxProgress = document.getElementById('progressChart').getContext('2d');
new Chart(ctxProgress, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3'],
        datasets: [{
            label: 'Peso (kg)',
            data: [50, 79.5, 39],
            borderColor: '#6d0eb1e4',
            borderWidth: 3,
            fill: false,
            pointBackgroundColor: '#6d0eb1e4',
            tension: 0.4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

// Gráfica de comparación con la meta
const ctxGoal = document.getElementById('goalChart').getContext('2d');
let goalChart = new Chart(ctxGoal, {
    type: 'doughnut',
    data: {
        labels: ['Progreso Actual', 'Meta Restante'],
        datasets: [{
            data: [progresoReal - metaPeso, metaPeso],
            backgroundColor: ['#6d0eb1e4', '#fed6e3']
        }]
    },
    options: { responsive: true, maintainAspectRatio: false }
});

function actualizarGraficaMeta() {
    metaPeso = document.getElementById('metaPeso').value;
    goalChart.data.datasets[0].data = [progresoReal - metaPeso, metaPeso];
    goalChart.update();
}

function descargarCSV() {
    let csvContent = "Semana,Peso (kg)\n";
    const historial = document.getElementById("historial").innerText.split("\n");
    historial.forEach((linea) => {
        const datos = linea.replace("Peso ", "").replace(" kg", "").split(": ");
        csvContent += `${datos[0]},${datos[1]}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    saveAs(blob, "reporte_progreso.csv");
}

function cambiarTema() {
    document.body.classList.toggle("dark-mode");
}

function volverInicio() {
    window.location.href = "index.html"; // Cambia esto si el inicio está en otra URL
}
