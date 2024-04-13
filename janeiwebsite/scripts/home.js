import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB7ZxE8vJo0r5QWKqJ9jfFWpySnHaRWsiQ",
  authDomain: "janeilanyarddb.firebaseapp.com",
  databaseURL: "https://janeilanyarddb-default-rtdb.firebaseio.com",
  projectId: "janeilanyarddb",
  storageBucket: "janeilanyarddb.appspot.com",
  messagingSenderId: "548579996655",
  appId: "1:548579996655:web:de6b2dd2a4ee0a75627c1a",
  measurementId: "G-JYFDCP813Q"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {

    const userId = user.uid;
    

    const userRef = ref(db, `/customers/${userId}`);
   
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        console.log("Username:", userData.username);
        console.log("Email:", user.email);
      } else {
        console.log("User data not found");
      }
    });
  } else {
   
    console.log("No user signed in");
  }
});






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

//Gallery images
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
  