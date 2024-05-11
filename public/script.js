
let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
const prevButton = document.querySelector('.slider .prev');
const nextButton = document.querySelector('.slider .next');
const counter = document.querySelector('.counter');
const menuIcon = document.getElementById("menuIcon");
const menuModal = document.getElementById("menuModal");
let currentImageIndex = 0;
const thumbnails = document.querySelectorAll('.thumbnails img');
const fullImage = document.getElementById('full-image');

document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slides img');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const counter = document.querySelector('.counter');
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  scrollToTopButton.addEventListener('click', smoothScrollToTop);
  function showSlide(index) {
    slides.forEach((slide) => {
      slide.style.display = 'none';
    });
    slides[index].style.display = 'block';
    counter.textContent = `${index + 1} / ${slides.length}`;
  }

  function changeSlide(step) {
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  prevButton.addEventListener('click', () => changeSlide(-1));
  nextButton.addEventListener('click', () => changeSlide(1));
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 3000);
  showSlide(slideIndex);
});

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}, 3000);


// Загрузка контента при загрузке страницы
window.onload = function() {
  const contentElement = document.getElementById("content");
  const request = new XMLHttpRequest();
  request.open("GET", location.pathname.substring(1) + ".html", true);
  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          contentElement.innerHTML = this.responseText;
      }
  };
  request.send();
  
  const thumbnails = document.querySelectorAll('.thumbnails img');
  thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function(event) {
      fullImage.src = event.target.dataset.largeImage;
      fullImage.style.display = 'block';
    });
  });

  fullImage.addEventListener('click', function(event) {
    fullImage.style.display = 'none';
  });
};
document.addEventListener('DOMContentLoaded', function() {
 
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  var body = document.body;

 
  btn.onclick = function() {
    modal.style.display = "block";
    body.classList.add("body-modal-open");
  }

  
  span.onclick = function() {
    modal.style.display = "none";
    body.classList.remove("body-modal-open");
  }

 
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      body.classList.remove("body-modal-open");
    }
  }
});
window.addEventListener('scroll', function() {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  if (window.pageYOffset > 100) { // Кнопка появится, когда вы прокрутите вниз на 100 пикселей
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
});

// Плавная прокрутка вверх
function smoothScrollToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
}
document.addEventListener('DOMContentLoaded', function() {
  let modal = document.getElementById('custom-modal');
  let modalImg = document.getElementById("customModalImg");
  let images = document.querySelectorAll('.gallery .gallery-img');
  let span = document.getElementsByClassName("custom-close")[0];
  let currentSlideIndex = 0;

  // Функция для открытия модального окна с изображением
  function openModal(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
    currentSlideIndex = index;
  }

  
  images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

 
  span.onclick = function() {
    modal.style.display = "none";
  }

  
  function showSlides(n) {
    let slideIndex = (n + images.length) % images.length;
    modalImg.src = images[slideIndex].src;
    currentSlideIndex = slideIndex;
  }

  modalImg.insertAdjacentHTML('afterend',
    `<span class="custom-prev" onclick="showSlides(currentSlideIndex - 1)">&#10094;</span>
     <span class="custom-next" onclick="showSlides(currentSlideIndex + 1)">&#10095;</span>`);

 
  document.addEventListener('keydown', function(event) {
    if (modal.style.display == "block") {
      if (event.key === 'ArrowLeft') {
        showSlides(currentSlideIndex - 1);
      } else if (event.key === 'ArrowRight') {
        showSlides(currentSlideIndex + 1);
      } else if (event.key === 'Escape') {
        modal.style.display = "none";
      }
    }
  });
});

