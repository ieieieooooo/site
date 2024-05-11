const images = document.querySelectorAll('.gallery-img');
const modal = document.getElementById('custom-modal');
const modalImg = document.getElementById('customModalImg');
const closeButton = document.querySelector('.custom-close');

let currentImageIn = 0;
document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.menu__button').forEach(function(menubut){
      menubut.addEventListener('click',function(menuclick){
        document.querySelectorAll('.menu').forEach(function(menuopen){
          menuopen.classList.toggle('menu-open');
          menuopen.classList.toggle('menu-close');
        })
      })
    })
  })
images.forEach((image, index) => {
    image.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = image.src;
        currentImageIn = index;
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft' && currentImageIn > 0) {
            modalImg.src = images[currentImageIn - 1].src;
            currentImageIn--;
        } else if (e.key === 'ArrowRight' && currentImageIn < images.length - 1) {
            modalImg.src = images[currentImageIn + 1].src;
            currentImageIn++;
        }
    }
});
const scrollToTopButton = document.getElementById("scrollToTopButton");

// Плавная прокрутка вверх при нажатии на кнопку
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Отображение кнопки при прокрутке вниз
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});