document.addEventListener("DOMContentLoaded", function () {
    // Función para alternar "Me gusta"
    document.querySelectorAll(".like-button").forEach(button => {
        button.addEventListener("click", function () {
            let likeCount = this.querySelector(".like-count");
            let isLiked = this.classList.toggle("liked");
            likeCount.textContent = isLiked ? parseInt(likeCount.textContent) + 1 : parseInt(likeCount.textContent) - 1;
        });
    });

    // Función para editar una publicación
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".card");
            let textElement = card.querySelector("p:not(.time)");
            let newText = prompt("Edita tu publicación:", textElement.textContent);
            if (newText !== null) textElement.textContent = newText;
        });
    });

    // Función para eliminar una publicación con animación
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".card");
            if (confirm("¿Estás seguro de eliminar esta publicación?")) {
                card.style.transition = "opacity 0.5s";
                card.style.opacity = "0";
                setTimeout(() => card.remove(), 500);
            }
        });
    });

    // Función para abrir el modal
    document.getElementById("createPostBtn").addEventListener("click", function () {
        document.getElementById("postModal").style.display = "block";
    });

    // Función para cerrar el modal
    document.querySelector(".close-modal").addEventListener("click", function () {
        document.getElementById("postModal").style.display = "none";
    });

    // Crear una nueva publicación desde el modal
    document.getElementById("publishPostBtn").addEventListener("click", function () {
        let postText = document.getElementById("newPostContent").value.trim();
        if (postText === "") {
            alert("No puedes publicar un mensaje vacío.");
            return;
        }

        let container = document.querySelector(".container");
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerHTML = `
            <div class="profile">
                <img src="https://i.pravatar.cc/50" alt="Nuevo usuario">
                <div>
                    <p class="name">Nuevo Usuario</p>
                    <p class="time">Hace un momento</p>
                </div>
            </div>
            <p>${postText}</p>
            <button class="like-button">
                <span class="heart">❤️</span>
                <span class="like-count">0</span>
            </button>
            <button class="edit-button">✏️</button>
            <button class="delete-button">🚮</button>
            <div class="comment-container">
                <button class="addCardBtn">Agregar comentario</button>
                <div class="commentContainer"></div>
            </div>
        `;

        container.prepend(newCard);
        document.getElementById("postModal").style.display = "none";
        document.getElementById("newPostContent").value = "";

        // Agregar eventos a los botones de la nueva tarjeta
        addEventListenersToPost(newCard);
    });

    // Agregar funcionalidad a los botones de comentarios
    document.querySelectorAll(".addCardBtn").forEach(button => {
        button.addEventListener("click", function () {
            agregarComentario(this.closest(".card").querySelector(".commentContainer"));
        });
    });

    function addEventListenersToPost(postElement) {
        postElement.querySelector(".like-button").addEventListener("click", function () {
            let likeCount = this.querySelector(".like-count");
            let isLiked = this.classList.toggle("liked");
            likeCount.textContent = isLiked ? parseInt(likeCount.textContent) + 1 : parseInt(likeCount.textContent) - 1;
        });

        postElement.querySelector(".edit-button").addEventListener("click", function () {
            let textElement = postElement.querySelector("p:not(.time)");
            let newText = prompt("Edita tu publicación:", textElement.textContent);
            if (newText !== null) textElement.textContent = newText;
        });

        postElement.querySelector(".delete-button").addEventListener("click", function () {
            if (confirm("¿Seguro que deseas eliminar la publicación?")) {
                postElement.style.transition = "opacity 0.5s";
                postElement.style.opacity = "0";
                setTimeout(() => postElement.remove(), 500);
            }
        });

        postElement.querySelector(".addCardBtn").addEventListener("click", function () {
            agregarComentario(postElement.querySelector(".commentContainer"));
        });
    }

    function agregarComentario(container) {
        let comentarioTexto = prompt("Escribe tu comentario:");
        if (!comentarioTexto) return;

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
            <div class="comment-content">
                <p>${comentarioTexto}</p>
                <button class="edit-comment">✏️</button>
                <button class="delete-comment">🚮</button>
            </div>
        `;

        container.appendChild(commentDiv);

        commentDiv.querySelector(".edit-comment").addEventListener("click", function () {
            let nuevoTexto = prompt("Edita tu comentario:", commentDiv.querySelector("p").textContent);
            if (nuevoTexto !== null) commentDiv.querySelector("p").textContent = nuevoTexto;
        });

        commentDiv.querySelector(".delete-comment").addEventListener("click", function () {
            commentDiv.remove();
        });
    }
});
