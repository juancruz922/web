document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

    // Clonamos la primera y la última imagen para lograr el efecto de bucle
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, slides[0]);

    let totalSlidesWithClones = totalSlides + 2;
    let currentIndex = 1;
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
            if (currentIndex >= totalSlidesWithClones - 1) {
                currentIndex = 1;
                carouselImages.style.transition = "none";
                carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
            } else if (currentIndex <= 0) {
                currentIndex = totalSlides;
                carouselImages.style.transition = "none";
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
