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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70  rounded">${texture.Name}</div>
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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70  rounded">${patterns.Name}</div>
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
                <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-medium border text-sm bg-white bg-opacity-70  rounded">${logos.Name}</div>
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

function logTemplatesData() {
    onValue(templatesRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data); 
    });
}
logTemplatesData();
// Function to fetch template data based on templateId
function populateTemplates() {
  
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
    const templateNameElement = modal.querySelector('.template-name');
    if (templateNameElement) {
        templateNameElement.textContent = templateData.name;
    } else {
        console.error("Modal elements not found.");
    }
}
// Get the close span element
const closeSpan = document.querySelector('.close');

// Add event listener to close span
closeSpan.addEventListener('click', function() {
    // Get the modal element
    const modal = document.getElementById('myModalorder');

    // Hide the modal
    modal.style.display = 'none';
});
