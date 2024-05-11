import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7ZxE8vJo0r5QWKqJ9jfFWpySnHaRWsiQ",
  authDomain: "janeilanyarddb.firebaseapp.com",
  databaseURL: "https://janeidb-default-rtdb.firebaseio.com",
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
const templatesRef = ref(db, 'templates/');
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

function logTemplatesData() {
    onValue(templatesRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data); 
    });
}
logTemplatesData();
// Function to fetch template data based on templateId
function populateTemplates() {
   const container = document.getElementById('templateContainer');
    container.innerHTML = '<div class="loader text-xl p-10 ">Loading...</div>';
    onValue(templatesRef, (snapshot) => {
        const templatesData = snapshot.val(); 
        const container = document.getElementById('templateContainer');
        container.innerHTML = '';
      

        // Loop through each template in the data
        for (const templateId in templatesData) {
            if (Object.hasOwnProperty.call(templatesData, templateId)) {
              
                const id = parseInt(templateId);
                if (id !== 0) {
                    const template = templatesData[templateId];
                // Create the template HTML structure
                const templateHtml = `
                    <div class="box bg-[#1f1f1fe6] p-2 md:w-56  h-auto w-40 md:mb-4 mb-2" style="position: relative;">
                        <div onclick="toggleHover(this)" class="box1 md:w-52 md:h-64 mx-auto h-44 w-36 z-50 duration-500 cursor-pointer">
                            <img src="data:image/png;base64,${template.preview}" class="pic w-full h-full object-cover" alt="${template.name}" >
                        </div>
                        <div class="flex md:pt-2 pt-1 z-0">
                            <a class="relative cart-image-container" data-template-id="${templateId}">
                                <img src="/janeiwebsite/assets/business-3d-red-shopping-cart.png" class="md:h-16 h-14 cursor-pointer cart-image hover:" alt="Order Now">
                                <span class="w-28 order-message absolute top-0 left-1/2 hidden">Order Now</span>
                            </a>
                            <div class="productname text-center text-[10px] md:text-[14px] font-medium bg-slate-200 duration-300 border w-36 h-auto">
                                ${template.name}<br>
                                <span class="text-yellow-600"> PHP ${template.price} </span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Append the template HTML to the container
                container.insertAdjacentHTML('beforeend', templateHtml);
                }
                
            }
        }

        // Add event listeners to cart images
        const cartImageContainers = document.querySelectorAll('.cart-image-container');
        cartImageContainers.forEach(container => {
            container.addEventListener('click', function() {
                const templateId = this.getAttribute('data-template-id');
                showModal(templateId);
            });
        });
    });
}

populateTemplates();

// Function to show the modal
function showModal(templateId) {

    getTemplateData(templateId)
        .then(templateData => {
           
            displayModal(templateData);
        })
        .catch(error => {
            console.error("Error fetching template data:", error);
        });
}

// Function to fetch template data based on templateId
function getTemplateData(templateId) {
    const templateRef = ref(db, `templates/${templateId}`);
    return get(templateRef).then((snapshot) => {
        if (snapshot.exists()) {
            const templateData = snapshot.val();
            console.log("Fetched template data:", templateData);
            return templateData;
        } else {
            console.log("Template data doesn't exist for templateId:", templateId);
            return null;
        }
    }).catch((error) => {
        console.error("Error fetching template data:", error);
        return null;
    });
}
//call modal
function displayModal(templateData) {
    const modal = document.getElementById('myModalorder');
    modal.style.display = 'block';
    const templateNameElement2 = modal.querySelector('.templatename2');

    const templateImgDiv = modal.querySelector('.templatesImg');
  
    if ( templateNameElement2 && templateImgDiv) {
  
        templateNameElement2.textContent = templateData.name;
        const imgElement = document.createElement('img');
        imgElement.src = `data:image/png;base64,${templateData.preview}`;
        imgElement.classList.add('w-full', 'h-full', 'object-cover', 'mx-auto', 'rounded-xl');
        templateImgDiv.innerHTML = '';
        templateImgDiv.appendChild(imgElement);

    } else {
        console.error("Modal elements not found.");
    }
}
// Define the showDiv function
// Define the showDiv function




// Get the close span element
const closeSpan = document.querySelector('.close');

// Add event listener to close span
closeSpan.addEventListener('click', function() {
    // Get the modal element
    const modal = document.getElementById('myModalorder');

    // Hide the modal
    modal.style.display = 'none';
});
