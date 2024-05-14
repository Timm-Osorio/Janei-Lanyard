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
const templatesRef = ref(db, 'templates/');
/* THIS IS THE PREMADE TEMPLATE FUNCTIONALITIES */

function logTemplatesData() {
    onValue(templatesRef, (snapshot) => {
        const data = snapshot.val();
        
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
                //if (id !== 0) {
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

// Add input field
var inputCount = 1;
var totalPrice = 0;
var totalpay = 0;
var selectedTemplateName = null; 
var imageStrings = [];
// Default input clicked cancel laman
document.getElementById('inputContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('border-red-500')) {
        var fileInput = event.target.parentNode.querySelector('input[type=file]');
        fileInput.value = '';
    }
});

// Only 5 images are accepted
document.getElementById('addInput').addEventListener('click', function() {
    if (inputCount < 5) { 
        var inputContainer = document.getElementById('inputContainer');

        var inputField = document.createElement('div');
        inputField.className = 'flex items-center';

        var newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.className = 'w-full bg-slate-300 shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        inputField.appendChild(newInput);

        // Add event listener to handle file selection
        newInput.addEventListener('change', function(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageData = event.target.result;
                imageStrings.push(imageData); // Store the base64 string of the image
            };
            reader.readAsDataURL(file); 
        });

        // Cancel the inputted field
        var cancelButton = document.createElement('button');
        cancelButton.className = 'ml-2 md:px-2 md:py-2 p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function(event) {
            var inputField = this.parentNode;
            inputField.parentNode.removeChild(inputField);
            inputCount--;
        });
        inputField.appendChild(cancelButton);

        inputContainer.appendChild(inputField);
        inputCount++;
     
    } else {
        const errorContainer5 = document.getElementById('errorContainer5');
        errorContainer5.style.display = 'block';
        setTimeout(() => {
            errorContainer5.style.display = 'none';
        }, 3000);
    }
});

async function sendImagesToDatabase(orderId) {
    const assetsRef = ref(db, 'newOrders/' + orderId + '/cusAssets');

    // Map each image string to a promise of setting it in the database
    const promises = imageStrings.map(async (imageData, index) => {
        const base64Index = imageData.indexOf(',');
        if (base64Index !== -1) {
            imageData = imageData.slice(base64Index + 1); 
        }
        const assetIndex = index + 1;
        const newAssetRef = child(assetsRef, assetIndex.toString());
        await set(newAssetRef, { img: imageData });
    });
    await Promise.all(promises);
    imageStrings = [];
    clearInputContainer();
}
function clearInputContainer() {
    var inputContainer = document.getElementById('inputContainer');
    while (inputContainer.firstChild) {
        inputContainer.removeChild(inputContainer.firstChild);
    }

    // Iterate over each input field inside the inputContainer
    var inputFields = document.querySelectorAll('#inputContainer input[type="file"]');
    inputFields.forEach(function(inputField) {
        // Get the value of the file input
        var imageDataToRemove = inputField.value;
        // Check if the value is present in the imageStrings array
        var indexToRemove = imageStrings.indexOf(imageDataToRemove);
        // If found, remove it from the array
        if (indexToRemove !== -1) {
            imageStrings.splice(indexToRemove, 1);
        }
    });

    // Reset inputCount to 0
  
}
// Counter
document.addEventListener("DOMContentLoaded", function() {
    const countElement = document.getElementById("count");
    const incrementBtn = document.getElementById("incrementBtn");
    const decrementBtn = document.getElementById("decrementBtn");
    let count = 1;

    function updateCount() {
        countElement.value = count;
        updateTotalPrice();
    }
    updateCount();

    function updateCount2() {
        countElement.value = count;
        updateTotalPrice2();
    }
    updateCount2();

    incrementBtn.addEventListener("click", function() {
        count++;
        updateCount();
    });

    decrementBtn.addEventListener("click", function() {
        if (count > 1) {
            count--;
            updateCount2();
        }
     
    });
});
// Update total price function
//Incremenet
function updateTotalPrice() {
    const templatePriceText = document.querySelector('.totalpay').textContent;
    const templatePriceText2 = document.querySelector('.totalpay2').textContent;
    const templatePrice = parseFloat(templatePriceText);
    const templatePrice2 = parseFloat(templatePriceText2);
    let totalCount = parseInt(document.getElementById("count").value);

    totalPrice = templatePrice  + templatePrice2;
    document.querySelector(".totalpay").textContent = totalPrice.toFixed(2);

}
//Decrement
function updateTotalPrice2() {
    const templatePriceText = document.querySelector('.totalpay').textContent;
    const templatePriceText2 = document.querySelector('.totalpay2').textContent;
    const templatePrice = parseFloat(templatePriceText);
    const templatePrice2 = parseFloat(templatePriceText2);
    let totalCount = parseInt(document.getElementById("count").value);

    totalPrice = templatePrice - templatePrice2;
    document.querySelector(".totalpay").textContent = totalPrice.toFixed(2);
    
}
// Modal order
const orderButton = document.getElementById('orderButton');
const modal = document.getElementById('myModal');

orderButton.addEventListener('click', function() {
    modal.classList.remove('hidden');
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});

// Function to show the modal
function showModal(templateId) {
    getTemplateData(templateId)
        .then(templateData => {
            selectedTemplateName = templateData.name; 
            displayModal(templateData);
        })
        .catch(error => {
            console.error("Error fetching template data:", error);
        });
}

// Call modal
function displayModal(templateData) {
    const modal = document.getElementById('myModalorder');
    modal.style.display = 'block';
    const templateNameElement2 = modal.querySelector('.templatename2');
    const templatetotal = modal.querySelector('.totalpay');
    const templatetotal2 = modal.querySelector('.totalpay2');
    const templateImgDiv = modal.querySelector('.templatesImg');
    const selectedTemplateIdElement = modal.querySelector('.seletedTemplateId');
  

    if (templateNameElement2 && templateImgDiv ) {
        selectedTemplateIdElement.textContent = templateData.id;
        templatetotal.textContent = templateData.price;
        templatetotal2.textContent = templateData.price;
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
//order part
document.getElementById("orderButtonSubmit").addEventListener("click", async function() {
    try {
        const userId = localStorage.getItem('currentid');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }
        
        const userSnapshot = await get(ref(db, `customers/${userId}`));
        if (!userSnapshot.exists()) {
            console.error('User data not found for user ID:', userId);
            return;
        }     
        const userData = userSnapshot.val();
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const notes = document.getElementById("notes").value;
        const paymentScreenshot = document.getElementById("paymentScreenshot").files[0];
        if (!notes) {
            console.error('Notes field is empty');
            const errorContainer6 = document.getElementById('errorContainer6');
            errorContainer6.style.display = 'block';
            setTimeout(() => {
            errorContainer6.style.display = 'none';
        }, 3000);
            return;
        }

        if (!paymentScreenshot) {
            console.error('No file selected');
            const errorContainer7 = document.getElementById('errorContainer7');
            errorContainer7.style.display = 'block';
            setTimeout(() => {
            errorContainer7.style.display = 'none';
        }, 3000);
            return;
        }
        const paymentScreenshotReader = new FileReader();

        paymentScreenshotReader.onload = async function(event) {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const binaryString = uint8Array.reduce((data, byte) => {
                return data + String.fromCharCode(byte);
            }, '');

            const byteStringImg = btoa(binaryString); 
            
            try {
                const lastOrderId = await getLastOrderId();
                const lastMessageId = await getLastMessageId();
                const lastOrderChats = await getLastChatId();
                const newOrderId = lastOrderId + 1;
                const newMessageId = lastMessageId + 1;
                const newchats = lastOrderChats + 1;
                const currentTime = new Date();
                const formattedDateTime = currentTime.toLocaleDateString();
                const currentDate = new Date();
                const formattedTime = currentDate.toLocaleString();
                let selectedTemplateId = document.querySelector('.seletedTemplateId').textContent;
                let totalPay = parseInt(document.querySelector('.totalpay2').textContent);
                let totalPay2 = parseInt(document.querySelector('.totalpay').textContent);
                let totalCount = parseInt(document.getElementById("count").value);
               
                set(ref(db, 'newOrders/' + newOrderId), {
                    notes: notes,
                    Fk_cusID: userId,
                    id: newOrderId.toString(),
                    price: totalPay,
                    price_ammount: totalPay2,
                    templateId: selectedTemplateId,
                    status: "CONFIRMING",
                    quantity: totalCount,
                    name: selectedTemplateName,
                    date: formattedDateTime,
                    paymentScreenshot: byteStringImg
                });
                set(ref(db, 'orderChats/' + newchats), {
                    id: newchats,
                    OrderNo: newOrderId.toString(),
                    customerName: firstName + " " + lastName,
                    isRead: "false",  
                    
                });
                set(ref(db,  "orderChats/" + newOrderId + "/Messages/" + newMessageId ), {
                    id: newMessageId,
                    Sender: "Customer", 
                    SenderName: firstName + " " + lastName,
                    Content: "Order Placed." + " " + selectedTemplateName,
                    TimeSent: formattedTime,    
                 
                });

                console.log("SUCCESS");
                sendImagesToDatabase(newOrderId);
               //clear fields after 
                imageStrings = [];
                totalPay = "",
                totalPay2 = "",
                selectedTemplateId = "",
                document.getElementById("count").value = "";
                document.getElementById("notes").value = "";
                document.getElementById("paymentScreenshot").value = "";
                clearInputContainer();
                const closeOrderModal = document.getElementById("myModalorder");
                closeOrderModal.style.display = 'none';
                document.getElementById("OrderSuccess").classList.remove("hidden");
                setTimeout(function() {
                    document.getElementById("OrderSuccess").classList.add("hidden");
                }, 3000); 
           
            } catch (error) {
                console.error('Error:', error);
                
            }
        };

        // Read file as binary string
        paymentScreenshotReader.readAsArrayBuffer(paymentScreenshot);


    } catch (error) {
        console.error('Error in orderButton click event listener:', error);
    }
});

async function getLastOrderId() {
    try {
        const response = await get(ref(db, 'newOrders'));
        if (!response.exists()) {
            return 0; 
        }
        const orderData = response.val();
        const orderIds = Object.keys(orderData);
        if (orderIds.length === 0) {
            return 0; 
        }
        const lastorderId = Math.max(...orderIds.map(id => parseInt(id)));
        return lastorderId;
    } catch (error) {
        console.error('Error fetching last order ID:', error);
        throw error;
    }
}

async function getLastMessageId(orderId) {
    try {
        const response = await get(ref(db, `orderChats/${orderId}/Messages/`));
        if (!response.exists()) {
            return 0; 
        }
        const messageData = response.val();
        const messageIds = Object.keys(messageData);
        if (messageIds.length === 0) {
            return 0; 
        }
        const lastMessageId = Math.max(...messageIds.map(id => parseInt(id)));
        return lastMessageId;
    } catch (error) {
        console.error('Error fetching last message ID:', error);
        throw error;
    }   
}

async function getLastChatId() {
    try {
        const response = await get(ref(db, 'orderChats'));
        if (!response.exists()) {
            return 0; 
        }
        const chatData = response.val();
        const chatIds = Object.keys(chatData);
        if (chatIds.length === 0) {
            return 0; 
        }
        const lastChatId = Math.max(...chatIds.map(id => parseInt(id)));
        return lastChatId;
    } catch (error) {
        console.error('Error fetching last chat ID:', error);
        throw error;
    }   
}

document.getElementById("cancelOrderBtn").addEventListener("click", function() {

    document.getElementById("count").value = 1;
    document.getElementById("incrementBtn").value = "";
    document.getElementById("decrementBtn").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("paymentScreenshot").value = "";
    console.log("SUCCESS cancel");
    const closeOrderModal = document.getElementById("myModalorder");
    closeOrderModal.style.display = 'none';
    clearInputContainer();
    
   
});