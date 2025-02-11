document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;
    const carouselImages = document.querySelector('.carousel-images');

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
        const offset = -currentSlide * 100;
        carouselImages.style.transform = translateX(${offset}%);
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
});
