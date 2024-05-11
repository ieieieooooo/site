document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    var body = document.body;
  
    // Когда пользователь нажимает на кнопку, откройте модальное окно 
    btn.onclick = function() {
      modal.style.display = "block";
      body.classList.add("body-modal-open");
    }
  
    // Когда пользователь нажимает на <span> (x), закройте модальное окно
    span.onclick = function() {
      modal.style.display = "none";
      body.classList.remove("body-modal-open");
    }
  
    // Когда пользователь нажимает в любое место за пределами модального окна, закройте его
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        body.classList.remove("body-modal-open");
      }
    }
  });