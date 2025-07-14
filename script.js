document.addEventListener("DOMContentLoaded", function () {
    // Texto desplegable
    const titulo = document.getElementById('toggle-titulo');
    const texto = document.getElementById('texto-desplegable');
    const flecha = document.getElementById('flecha');

    titulo.addEventListener('click', function () {
        texto.classList.toggle('visible');
        flecha.classList.toggle('girada');
    });

    // Carrusel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');
    const carouselImages = document.querySelector('.carousel-images');

    // Clonar imágenes
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add('first-clone');
    lastClone.classList.add('last-clone');

    carouselImages.appendChild(firstClone);
    carouselImages.insertBefore(lastClone, slides[0]);

    let updatedSlides = document.querySelectorAll('.carousel-images img');
    currentSlide = 1;
    carouselImages.style.transform = `translateX(-${100 * currentSlide}%)`;

    function moveToSlide(index) {
        carouselImages.style.transition = "transform 0.5s ease";
        carouselImages.style.transform = `translateX(-${100 * index}%)`;
        currentSlide = index;
    }

    document.querySelector('.next').addEventListener('click', () => {
        if (currentSlide >= updatedSlides.length - 1) return;
        moveToSlide(currentSlide + 1);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentSlide <= 0) return;
        moveToSlide(currentSlide - 1);
    });

    carouselImages.addEventListener('transitionend', () => {
        updatedSlides = document.querySelectorAll('.carousel-images img');

        if (updatedSlides[currentSlide].classList.contains('first-clone')) {
            carouselImages.style.transition = "none";
            currentSlide = 1;
            carouselImages.style.transform = `translateX(-${100 * currentSlide}%)`;
        }

        if (updatedSlides[currentSlide].classList.contains('last-clone')) {
            carouselImages.style.transition = "none";
            currentSlide = updatedSlides.length - 2;
            carouselImages.style.transform = `translateX(-${100 * currentSlide}%)`;
        }
    });
});
