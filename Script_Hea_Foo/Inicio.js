document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:8000/api/inicio") // Llamamos a la API de Laravel
        .then(response => response.json()) // Convertimos la respuesta en JSON
        .then(data => {
            const container = document.getElementById("inicio-container");
            container.innerHTML = data.map(tarjeta => `
                <a href="${tarjeta.url}">
                    <section class="card">
                        <img src="${tarjeta.image}" class="imagen-redondeada" alt="${tarjeta.title}">
                        <h2>${tarjeta.title}</h2>
                        <p>${tarjeta.description}</p>
                    </section>
                </a>
            `).join('');
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});