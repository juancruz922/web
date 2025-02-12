document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

    // Función para actualizar el carrusel
    function updateCarousel() {
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // Función para cambiar la imagen
    function changeSlide(direction) {
        if (direction === "next") {
            currentIndex++;
        } else if (direction === "prev") {
            currentIndex--;
        }

        // Si llegamos al final, regresamos al principio
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        // Si estamos al principio, volvemos al final
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }

        updateCarousel();
    }

    // Funciones para los botones de navegación
    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide("prev");
    });

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide("next");
    });

    // **Transición automática cada 5 segundos**
    let autoSlide = setInterval(() => {
        changeSlide("next");
    }, 5000);

    // Reinicia el temporizador cuando el usuario interactúa con el carrusel
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            changeSlide("next");
        }, 5000);
    }

    // **Swipe en pantallas táctiles con animación más rápida**
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
            changeSlide("prev"); // Swipe rápido hacia atrás
        } else if (deltaX < -50) {
            changeSlide("next"); // Swipe rápido hacia adelante
        }

        resetAutoSlide(); // Reinicia el tiempo después del swipe
    });
});
