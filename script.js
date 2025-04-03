document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.querySelector(".like-button");
    const heartIcon = likeButton.querySelector(".heart-icon");

    likeButton.addEventListener("click", function () {
        heartIcon.classList.toggle("liked");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.querySelector(".save-button");
    const heartIcon = likeButton.querySelector(".save-icon");

    likeButton.addEventListener("click", function () {
        heartIcon.classList.toggle("save");
    });
});
