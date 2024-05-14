
  
 //USERIMAGE DROPDOWN
 document.addEventListener("DOMContentLoaded", function() {
     const userImage = document.querySelector('.rounded-full');
     const dropdownMenu = document.querySelector('.drop');

     userImage.addEventListener('click', function(event) {
         dropdownMenu.classList.toggle('hidden');
         event.stopPropagation();
     });
     document.addEventListener('click', function(event) {
         if (!dropdownMenu.contains(event.target) && !userImage.contains(event.target)) {
             dropdownMenu.classList.add('hidden');
         }
     });
 });

 //Accordion 
 document.addEventListener('DOMContentLoaded', function () {
    var accordionButtons = document.querySelectorAll('[data-accordion-target]');
    accordionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var targetId = this.getAttribute('data-accordion-target');
        var targetBody = document.querySelector(targetId);
        var icon = this.querySelector('svg[data-accordion-icon]');
        targetBody.classList.toggle('hidden');

        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        targetBody.setAttribute('aria-hidden', isExpanded);
        icon.classList.toggle('rotate-180', !isExpanded);
      });
    });
  });

function changeImages(clickedImage) {
    var images = document.querySelectorAll('.image-container img');
    for (var i = 0; i < images.length; i++) {
      if (images[i] === clickedImage) {
        images[i].style.filter = 'none';
        images[i].style.scale = '1.1';
       
      } else {
        images[i].style.filter = 'grayscale(100%)'; 
        images[i].style.scale = 'none';
      }
    }
  }
   const images = document.querySelectorAll('.imghome');
        let currentImageIndex = 0;

        function showNextImage() {
            images[currentImageIndex].style.display = 'none';

            currentImageIndex = (currentImageIndex + 1) % images.length;

            images[currentImageIndex].style.display = 'block';
        }

        function startAnimation() {
            setInterval(showNextImage, 3000);
        }


        window.onload = startAnimation;
