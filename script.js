document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

    function changeSlide(index) {
        // Si el índice supera el número de imágenes, volvemos al principio sin "retroceder"
        if (index >= totalSlides) {
            currentSlide = 0; // Volver a la primera imagen sin animación retrocediendo
        } else if (index < 0) {
            currentSlide = totalSlides - 1; // Si está en la primera, va a la última
        } else {
            currentSlide = index;
        }
        updateCarousel();
    }

    function updateCarousel() {
        // Aplicar la animación suave
        const offset = -currentSlide * 100;
        carouselImages.style.transition = "transform 0.5s ease-in-out"; // Aseguramos que la transición sea suave
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    // Evento para la flecha "prev"
    document.querySelector('.prev').addEventListener('click', () => {
        // Al presionar la flecha "prev", se avanza a la imagen anterior
        changeSlide(currentSlide - 1);
    });

    // Evento para la flecha "next"
    document.querySelector('.next').addEventListener('click', () => {
        // Al presionar la flecha "next", se avanza a la imagen siguiente
        changeSlide(currentSlide + 1);
    });

    // Movimiento automático del carrusel cada 8 segundos
    setInterval(() => {
        changeSlide(currentSlide + 1); // Al pasar los 8 segundos, se mueve hacia la siguiente imagen
    }, 8000);
});
