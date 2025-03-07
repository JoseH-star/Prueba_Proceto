function toggleProfileMenu() {
    const menu = document.getElementById("profile-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
  
  function toggleModules() {
    const overlay = document.getElementById("modules-overlay");
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
  }
  
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".profile-container")) {
      document.getElementById("profile-menu").style.display = "none";
    }
    if (!e.target.closest(".modules-item")) {
      document.getElementById("modules-overlay").style.display = "none";
    }
  });
  function toggleHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburgerMenu.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar
}
function toggleModulues() {
    const modulesContent = document.getElementById("modules-content");
    modulesContent.style.display = modulesContent.style.display === "block" ? "none" : "block";
}


// Carrusel de texto motivacional
let textIndex = 0;
function showTextSlide() {
    let texts = document.querySelectorAll(".motivational-text p");
    texts.forEach(text => text.style.display = "none"); // Oculta todos los textos
    texts[textIndex].style.display = "block"; // Muestra solo el actual
    textIndex = (textIndex + 1) % texts.length;
}
setInterval(showTextSlide, 3000); // Cambio automático cada 3 segundos
showTextSlide(); // Mostrar el primer texto al cargar la página



fetch('http://127.0.0.1:8000/api/test-inicial')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
