// Funciones para el carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-images img');
const totalSlides = slides.length;

function changeSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentSlide * 100; // Para mover el carrusel al índice correspondiente
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

document.querySelector('.carousel-controls .prev').addEventListener('click', () => {
    changeSlide(currentSlide - 1);
});

document.querySelector('.carousel-controls .next').addEventListener('click', () => {
    changeSlide(currentSlide + 1);
});

// Cambia la imagen automáticamente cada 5 segundos
setInterval(() => {
    changeSlide(currentSlide + 1);
}, 8000);

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-images");
    let index = 0;
    const totalImages = carousel.children.length;
    let startX = 0;
    let endX = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(${-index * 100}%)`;
    }

    // Detectar inicio del toque
    carousel.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    // Detectar fin del toque y calcular dirección
    carousel.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        let difference = startX - endX;

        if (difference > 50) {
            // Deslizar a la izquierda (siguiente imagen)
            index = (index + 1) % totalImages;
        } else if (difference < -50) {
            // Deslizar a la derecha (imagen anterior)
            index = (index - 1 + totalImages) % totalImages;
        }

        updateCarousel();
    });

    updateCarousel();
});

