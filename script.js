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
}, 5000);
