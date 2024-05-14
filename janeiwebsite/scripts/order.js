import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyByGsDfEcXJa2rTW0CG40XRLoa944XtI0I",
    authDomain: "janeilanyarddb-9ba85.firebaseapp.com",
    databaseURL: "https://janeilanyarddb-9ba85-default-rtdb.firebaseio.com",
    projectId: "janeilanyarddb-9ba85",
    storageBucket: "janeilanyarddb-9ba85.appspot.com",
    messagingSenderId: "221726110604",
    appId: "1:221726110604:web:73a171eb5277b900ca5ca9",
    measurementId: "G-4YXSRNE3YW"
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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border  text-center text-sm bg-white bg-opacity-70  rounded">${texture.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(texture) {
                // Add click event listener to each texture box
                textureBox.addEventListener('click', function() {
                    console.log('Selected texture:', texture);
                    var textureUrl = `data:image/png;base64,${texture.ImgUrl}`;
                    // Set background style for the left parallelogram
                    var leftParallelogram = document.querySelector('.parallelogram-left');
                    leftParallelogram.style.backgroundImage = `url('${textureUrl}')`;
                    leftParallelogram.style.backgroundRepeat = 'no-repeat';
                    leftParallelogram.style.backgroundPosition = 'center';
                    leftParallelogram.style.backgroundSize = 'cover';
                    // Set background style for the right parallelogram
                    var rightParallelogram = document.querySelector('.parallelogram-right');
                    rightParallelogram.style.backgroundImage = `url('${textureUrl}')`;
                    rightParallelogram.style.backgroundRepeat = 'no-repeat';
                    rightParallelogram.style.backgroundPosition = 'center';
                    rightParallelogram.style.backgroundSize = 'cover';

                    var trapeziod = document.querySelector('.trapezoid');
                    trapeziod.style.backgroundImage = `url('${textureUrl}')`;
                    trapeziod.style.backgroundRepeat = 'no-repeat';
                    trapeziod.style.backgroundPosition = 'center';
                    trapeziod.style.backgroundSize = 'fit';
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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border text-center text-sm bg-white bg-opacity-70  rounded">${patterns.Name}</div>
            `;
            
            // Add click event listener to each pattern box
            patternsBox.addEventListener('click', createPatternClickListener(patterns));

            container.appendChild(patternsBox);
        }
    }
}
// Function to create a click event listener for a pattern
function createPatternClickListener(pattern) {
    return function() {
        console.log('Selected pattern:', pattern);
        var patternUrl = `data:image/png;base64,${pattern.ImgUrl}`;
        
        // Set background style for the left parallelogram
        var patterngraph = document.querySelector('.rightbox');
        patterngraph.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph.style.backgroundRepeat = 'no-repeat';
        patterngraph.style.backgroundPosition = 'center';
        patterngraph.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph2 = document.querySelector('.leftbox');
        patterngraph2.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph2.style.backgroundRepeat = 'no-repeat';
        patterngraph2.style.backgroundPosition = 'center';
        patterngraph2.style.backgroundSize = 'cover';

        var patterngraph3 = document.querySelector('.rightbox2');
        patterngraph3.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph3.style.backgroundRepeat = 'no-repeat';
        patterngraph3.style.backgroundPosition = 'center';
        patterngraph3.style.backgroundSize = 'cover';

        // Set background style for the right parallelogram
        var patterngraph4 = document.querySelector('.leftbox2');
        patterngraph4.style.backgroundImage = `url('${patternUrl}')`;
        patterngraph4.style.backgroundRepeat = 'no-repeat';
        patterngraph4.style.backgroundPosition = 'center';
        patterngraph4.style.backgroundSize = 'cover';
    };
}
//templates
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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border   text-center text-sm bg-white bg-opacity-70  rounded">${logos.Name}</div>
            `;
            // Add click event listener to each texture box
            (function(logos) {
                // Add click event listener to each texture box
                logosBox.addEventListener('click', function() {
                    console.log('Selected logo:', logos);
                    var logoUrl = `data:image/png;base64,${logos.ImgUrl}`;

                    var logoIMG = document.querySelector('.logohere');
                    logoIMG.style.backgroundImage = `url('${logoUrl}')`;
                    logoIMG.style.backgroundRepeat = 'no-repeat';
                    logoIMG.style.backgroundPosition = 'center';
                    logoIMG.style.backgroundSize = 'cover';
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
onValue(patternsRef, (snapshot2) => {
    const data2 = snapshot2.val();
    displayPatterns(data2);
});
onValue(logosRef, (snapshot3) => {
    const data3 = snapshot3.val();
    displayLogos(data3);
});
