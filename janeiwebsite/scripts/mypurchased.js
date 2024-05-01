import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, update, push, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
//I love you kong nababasa mo man to
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

document.addEventListener('DOMContentLoaded', function() {
    //display orders of the current user
    function getOrdersInfo() {
        const userId = localStorage.getItem('currentid');
        if (userId) {
            var ordersRef = ref(db, "orders");
            get(ordersRef)
                .then((snapshot) => {
                    var ordersData = snapshot.val();
                    if (ordersData) {         
                        var userOrders = Object.values(ordersData).filter(order => order.FK_cusID === userId);
                        if (userOrders.length > 0) {
                            document.getElementById('orders-container').innerHTML = '';

                            userOrders.forEach(order => {
                                var orderDiv = document.createElement('div');
                                orderDiv.className = 'p-4 mb-1 flex justify-between rounded-md shadow-md bg-slate-700';
                                //for the divs of orders 
                                var orderIdDiv = document.createElement('div');
                                orderIdDiv.className = 'text-sm text-white';
                                orderIdDiv.textContent = order.id; 
                                //show order status
                                var statusDiv = document.createElement('div');
                                statusDiv.className = 'text-sm text-white';
                                switch (order.status) {
                                    case 1:
                                        statusDiv.textContent = 'To confirm';
                                        break;
                                    case 2:
                                        statusDiv.textContent = 'Order Processing';
                                        break;
                                    case 3:
                                        statusDiv.textContent = 'To deliver';
                                        break;
                                    default:
                                        statusDiv.textContent = 'Order Cancelled';
                                        break;
                                }
                                //for the detail button
                                var detailsButton = document.createElement('button');
                                detailsButton.type = 'button';
                                detailsButton.className = 'hover:bg-slate-300 rounded-sm px-2 bg-yellow-500 hover:scale-95 duration-200';
                                detailsButton.innerHTML = '<div class="duration-200 hover:text-slate-900 text-sm text-white">DETAILS</div>';
                                //content of the orders show in the modal
                                detailsButton.addEventListener('click', function() {
                                    console.log('Details button clicked for order:', order);
                                    document.getElementById('orderid').textContent = order.id;
                                    document.getElementById('ordername').textContent = order.name; 
                                    document.getElementById('orderquantity').textContent = order.quantity;
                                    document.getElementById('orderamount').textContent = order.price;
                                
                                    if (order.status === 1) {
                                        document.getElementById('orderstatus').textContent = 'To confirm';
                                    } 
                                    else if (order.status === 2){
                                        document.getElementById('orderstatus').textContent = 'Order Processing';
                                    }
                                    else if (order.status === 3){
                                        document.getElementById('orderstatus').textContent = 'To deliver';
                                    }
                                    else {
                                        document.getElementById('orderstatus').textContent = 'Order Cancelled';
                                    }


                                    
                                    function loadChatMessages(selectedOrderId) {
                                    var selectedOrderId = order.id; 
                                    var chatRef = ref(db, "orderChats");
                                    get(chatRef)
                                        .then((snapshot) => {
                                            var chatData = snapshot.val();
                                            if (chatData) {
                                                // Find chat data associated with the selected order
                                                var orderChat = chatData[selectedOrderId];
                                                if (orderChat) {
                                                   
                                
                                                    var chatMessages = orderChat.Messages;
                                                    if (chatMessages) {
                                                        var chatroomDiv = document.getElementById('chatroom-messages');
                                                        chatroomDiv.innerHTML = ''; 
                                
                                                        chatMessages.forEach(message => {
                                                            var messageContent = message.Content;
                                                            var sender = message.Sender.toLowerCase(); 
                                                        
                                                            // Determine the class for the message container based on the sender
                                                            var messageClass = (sender === 'customer') ? 'mx-2 my-2 pl-10 flex  flex-col items-end' : 'mx-2 my-2 pr-10 flex flex-col items-start';
                                                            
                                                            // Determine the ID for the message div based on the sender
                                                            var messageId = (sender === 'customer') ? 'customerchat' : 'adminchat';
                                                        
                                                            // Determine the background color class based on the sender
                                                            var bgClass = (sender === 'customer') ? 'bg-slate-900 rounded-br-lg rounded-bl-lg rounded-tl-lg ' : 'bg-slate-600 rounded-br-lg rounded-bl-lg rounded-tr-lg  ';
                                                        
                                                            // Create the message div
                                                            var messageDiv = document.createElement('div');
                                                            messageDiv.className = messageClass;
                                                            
                                                            var senderNameDiv = document.createElement('div');
                                                            senderNameDiv.className = 'text-xs text-gray-500'; 
                                                            senderNameDiv.textContent = sender === 'customer' ? 'Me' : 'Admin';
                                                            messageDiv.appendChild(senderNameDiv);
                                                        
                                                            // Create the message content div
                                                            var contentDiv = document.createElement('div');
                                                            contentDiv.className = 'relative z-20 text-white py-2 px-4 mb-2  ' + bgClass; // Add bgClass here
                                                            contentDiv.innerHTML = '<p id="' + messageId + '" class="text-sm w-auto h-auto">' + messageContent + '</p>';
                                                        
                                                            // Append contentDiv to messageDiv
                                                            messageDiv.appendChild(contentDiv);
                                                        
                                                            // Append messageDiv to chatroom container
                                                            chatroomDiv.appendChild(messageDiv);
                                                        });
                                                       
                                                        
                                                    } else {
                                                        console.log('No chat messages found for order:', selectedOrderId);
                                                    }
                                                } else {
                                                    console.log('No chat data found for order:', selectedOrderId);
                                                }
                                            } else {
                                                console.log('No chat data found in the database');
                                            }
                                        })
                                        .catch((error) => {
                                            console.log('Error getting chat data:', error.message);
                                        });    
                                    }
                              
                                    document.getElementById('chatroom').addEventListener('click', function() {
                                        var selectedOrderId = document.getElementById('orderid').textContent; 
                                        document.getElementById('orderid').textContent = selectedOrderId;
                                        document.getElementById('myModalinfo6').classList.remove('hidden');
                                        console.log("Chatroom button clicked for order:", selectedOrderId);
                                        loadChatMessages(selectedOrderId);
                                        setInterval(function() {
                                            loadChatMessages(selectedOrderId);
                                        }, 1000);
                                    });
                                    
                                    document.getElementById('myModalinfo5').classList.remove('hidden');
                                    
                                });
                                
                                orderDiv.appendChild(orderIdDiv);
                                orderDiv.appendChild(statusDiv);
                                orderDiv.appendChild(detailsButton);
                                document.getElementById('orders-container').appendChild(orderDiv);
                            });
                        } else {
                            console.log("No orders found for the current user");
                            document.getElementById('noorders').style.display = 'block';
                        }
                    } else {
                        console.log("No orders found in the database");
                    }
                })
                .catch((error) => {
                    console.log("Error getting orders data: " + error.message);
                });
        } else {
            console.log("No user is currently logged in");
        }
    }


    getOrdersInfo();
});

document.addEventListener('DOMContentLoaded', function() {
        async function sendMessage() {
        var orderId = document.getElementById('orderid').textContent;
        var lastMessageId = await getLastMessageId(orderId);

        // Calculate the new message ID
        var newMessageId = lastMessageId + 1;
        var currentTime = new Date();
        var formattedDateTime = currentTime.toLocaleString();
        const firstName = document.getElementById('firstnameup').value;
        const lastName = document.getElementById('lastnameup').value;

        // Get the content of the message from the textarea
        var content = document.getElementById('content').value.trim(); 
        if (content) {
            var orderChatsRef = ref(db, "orderChats/" + orderId + "/Messages/" + newMessageId );
            set(orderChatsRef, {
                Sender: "Customer", 
                SenderName: firstName + " " + lastName,
                Content: content,
                TimeSent: formattedDateTime
            }, newMessageId)
            .then(() => {
                console.log('Message sent successfully:', content, 'for order:', orderId );
                document.getElementById('content').value = '';
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
        } else {
            const errorContainer2 = document.getElementById('inputmsg');
            errorContainer2.style.display = 'block';
            setTimeout(() => {
                errorContainer2.style.display = 'none';
            }, 3000);
        }
    }
    document.getElementById('sendamessage').addEventListener('click', sendMessage);
});

//Get the last message id from the order chat
async function getLastMessageId(orderId) {
    try {
        const response = await get(ref(db, "orderChats/" + orderId + "/Messages"));
        if (!response.exists()) {
            return 0; 
        }
        const userData = response.val();
        const messageIds = Object.keys(userData);
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
