document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

    function changeSlide(index) {
        if (index >= totalSlides) {
            currentSlide = totalSlides - 1; // No pasa de la última imagen
        } else if (index < 0) {
            currentSlide = 0; // No retrocede más allá de la primera imagen
        } else {
            currentSlide = index;
        }
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide(currentSlide - 1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide(currentSlide + 1);
    });

    setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 8000);

    // **Agregar Swipe en Pantallas Táctiles**
    let startX = 0;
    let endX = 0;

    carouselImages.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    carouselImages.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
    });

    carouselImages.addEventListener("touchend", () => {
        let deltaX = endX - startX;
        if (deltaX > 50) {
            changeSlide(currentSlide - 1); // Deslizar a la izquierda (retrocede)
        } else if (deltaX < -50) {
            changeSlide(currentSlide + 1); // Deslizar a la derecha (avanza)
        }
    });
});
