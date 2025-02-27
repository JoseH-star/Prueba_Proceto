document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("liked");
        });
    });
});
