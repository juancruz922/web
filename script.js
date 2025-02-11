document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length / 2; // Solo contamos las imágenes originales
    const carouselImages = document.querySelector('.carousel-images');

    let startX = 0;
    let endX = 0;

    function changeSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
            carouselImages.style.transition = "none";
            carouselImages.style.transform = `translateX(0%)`;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        setTimeout(() => {
            carouselImages.style.transition = "transform 0.5s ease-in-out";
            updateCarousel();
        }, 50);
    }

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    // Flechas de navegación
    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide(currentSlide - 1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide(currentSlide + 1);
    });

    // Movimiento automático del carrusel
    setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 8000);

    // **Eventos táctiles**
    carouselImages.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselImages.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carouselImages.addEventListener('touchend', () => {
        let deltaX = endX - startX;
        if (deltaX > 50) {
            // Deslizar a la derecha
            changeSlide(currentSlide - 1);
        } else if (deltaX < -50) {
            // Deslizar a la izquierda
            changeSlide(currentSlide + 1);
        }
    });
});
