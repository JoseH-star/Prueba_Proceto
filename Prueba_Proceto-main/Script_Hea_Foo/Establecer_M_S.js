function generarMeta() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let edad = document.getElementById("edad").value;
    let objetivo = document.getElementById("objetivo").value;
    
    if (!peso || !altura || !edad || !objetivo) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    let meta = "Tu meta personalizada es: ";
    
    if (objetivo === "perder_peso") {
        meta += "Reducir el consumo de alimentos procesados y aumentar la actividad física.";
    } else if (objetivo === "ganar_peso") {
        meta += "Aumentar la ingesta calórica con alimentos saludables y entrenamientos de fuerza.";
    } else {
        meta += "Mantener hábitos saludables y mejorar la calidad de tu alimentación y actividad física.";
    }
    
    let metaElement = document.getElementById("meta");
    metaElement.textContent = meta;
    document.getElementById("metaBox").style.display = "block";
    document.querySelector('.overlay').style.display = 'block';

}

// Enlazar formulario con el backend de Laravel
async function guardarMeta() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;
    let edad = document.getElementById("edad").value;
    let objetivo = document.getElementById("objetivo").value;

    if (!peso || !altura || !edad || !objetivo) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let data = {
        peso: peso,
        altura: altura,
        edad: edad,
        objetivo: objetivo
    };

    try {
        let response = await fetch("http://127.0.0.1:8000/api-v1/personal-goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        let result = await response.json();
        alert("Meta guardada con éxito: " + JSON.stringify(result));
    } catch (error) {
        console.error("Error al guardar la meta:", error);
    }
}

document.getElementById("guardar").addEventListener("click", function() {
    const pesoActual = document.getElementById("pesoActual").value;
    const metaSalud = document.getElementById("metaSalud").value;
    const planDieta = document.getElementById("planDieta").value;

    // Guardar en localStorage
    localStorage.setItem("pesoActual", pesoActual);
    localStorage.setItem("metaSalud", metaSalud);
    localStorage.setItem("planDieta", planDieta);
});

