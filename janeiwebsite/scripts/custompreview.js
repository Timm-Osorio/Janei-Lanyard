import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

//call the tables in db hihi
const texturesRef = ref(db, 'textures/');
const patternsRef = ref(db, 'patterns/');
const logosRef = ref(db, 'logos/');
// Function to display data in the divs 
function displayTextures(data) {
    var container = document.getElementById("textureContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keytexture in data) {
        if (data.hasOwnProperty(keytexture)) {
            var texture = data[keytexture];
            var textureBox = document.createElement('div');
            textureBox.classList.add('texture-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            textureBox.innerHTML = `
                <img src="data:image/png;base64,${texture.ImgUrl}" alt="${texture.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70 p-2 rounded">${texture.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(texture) {
                // Add click event listener to each texture box
                textureBox.addEventListener('click', function() {
                    console.log('Selected texture:', texture);
                });
            })(texture);
            
            container.appendChild(textureBox);
        }
    }
}
function displayPatterns(data2) {
    var container = document.getElementById("patternContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keypatterns in data2) {
        if (data2.hasOwnProperty(keypatterns)) {
            var patterns = data2[keypatterns];
            var patternsBox = document.createElement('div');
            patternsBox.classList.add('pattern-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            patternsBox.innerHTML = `
                <img src="data:image/png;base64,${patterns.ImgUrl}" alt="${patterns.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70 p-2 rounded">${patterns.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(pattern) {
                // Add click event listener to each texture box
                patternsBox.addEventListener('click', function() {
                    console.log('Selected pattern:', pattern);
                });
            })(patterns);
            
            container.appendChild(patternsBox);
        }
    }
}
function displayLogos(data3) {
    var container = document.getElementById("logoContainer");
    if (!container) return; 
    container.innerHTML = ""; 

    for (var keylogos in data3) {
        if (data3.hasOwnProperty(keylogos)) {
            var logos = data3[keylogos];
            var logosBox = document.createElement('div');
            logosBox.classList.add('logo-box', 'relative', 'overflow-hidden', 'rounded', 'bg-gray-100', 'shadow-md');
      
            logosBox.innerHTML = `
                <img src="data:image/png;base64,${logos.ImgUrl}" alt="${logos.Name}" class="w-full h-full object-cover"> 
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70 p-2 rounded">${logos.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(logos) {
                // Add click event listener to each texture box
                logosBox.addEventListener('click', function() {
                    console.log('Selected logo:', logos);
                });
            })(logos);
            
            container.appendChild(logosBox);
        }
    }
}
// Listen for changes to the 'textures' node
onValue(texturesRef, (snapshot) => {
    const data = snapshot.val();
    displayTextures(data);
});
onValue(patternsRef, (snapshot) => {
    const data2 = snapshot.val();
    displayPatterns(data2);
});
onValue(logosRef, (snapshot) => {
    const data3 = snapshot.val();
    displayLogos(data3);
});

