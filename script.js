document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const carouselImages = document.querySelector('.carousel-images');

    // Clonamos la primera y la última imagen para lograr el efecto de bucle
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Añadimos los clones al principio y al final del carrusel
    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, slides[0]);

    // Actualizamos el total de imágenes después de los clones
    const updatedSlides = document.querySelectorAll('.carousel-images img');
    let totalSlides = updatedSlides.length;

    let totalSlidesWithClones = totalSlides;
    let currentIndex = 1;

    // Establecemos la posición inicial del carrusel
    carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;

    function updateCarousel(speed = "0.5s") {
        carouselImages.style.transition = `transform ${speed} ease-in-out`;
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function changeSlide(direction, speed = "0.5s") {
        resetAutoSlide(); // Reinicia el temporizador al tocar una flecha
        if (direction === "next") {
            currentIndex++;
        } else {
            currentIndex--;
        }
        updateCarousel(speed);

        setTimeout(() => {
            // Si llegamos al final de los clones, regresamos al inicio
            if (currentIndex >= totalSlidesWithClones - 1) {
                currentIndex = 1; // Volver al primer índice del carrusel
                carouselImages.style.transition = "none"; // Sin transición para evitar parpadeo
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            } else if (currentIndex <= 0) {
                currentIndex = totalSlides - 2; // Ajustamos al penúltimo índice antes de los clones
                carouselImages.style.transition = "none"; // Sin transición para evitar parpadeo
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            }
        }, parseFloat(speed) * 1000);
    }

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
            changeSlide("prev", "0.3s"); // Swipe rápido hacia atrás
        } else if (deltaX < -50) {
            changeSlide("next", "0.3s"); // Swipe rápido hacia adelante
        }

        resetAutoSlide(); // Reinicia el tiempo después del swipe
    });
});
