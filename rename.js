const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let index = 0;

function showSlide(i) {
    if (i >= slides.length) {
        index = 0;
    } else if (i < 0) {
        index = slides.length - 1;
    } else {
        index = i;
    }

    document.querySelector('.slider-content').style.transform = `translateX(-${index * 100}%)`;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

rightArrow.addEventListener('click', () => showSlide(index + 1));
leftArrow.addEventListener('click', () => showSlide(index - 1));

// Initialize
showSlide(index);
