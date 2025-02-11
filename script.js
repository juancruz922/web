document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

    // Clonamos la primera y la última imagen para lograr el efecto de bucle
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    // Insertamos la última imagen clonada al inicio y la primera imagen clonada al final
    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, slides[0]);

    // Ajustamos el número total de slides contando los clones
    let totalSlidesWithClones = totalSlides + 2;

    // Posicionamos el carrusel en la primera imagen real
    let currentIndex = 1;
    carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;

    function updateCarousel() {
        carouselImages.style.transition = "transform 0.5s ease-in-out";
        carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    function changeSlide(direction) {
        if (direction === "next") {
            currentIndex++;
        } else {
            currentIndex--;
        }
        updateCarousel();

        // Cuando llega al final, reseteamos el índice sin transición
        setTimeout(() => {
            if (currentIndex >= totalSlidesWithClones - 1) {
                currentIndex = 1;
                carouselImages.style.transition = "none";
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            } else if (currentIndex <= 0) {
                currentIndex = totalSlides;
                carouselImages.style.transition = "none";
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            }
        }, 500);
    }

    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide("prev");
    });

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide("next");
    });

    setInterval(() => {
        changeSlide("next");
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
            changeSlide("prev"); // Deslizar a la izquierda (retrocede)
        } else if (deltaX < -50) {
            changeSlide("next"); // Deslizar a la derecha (avanza)
        }
    });
});
