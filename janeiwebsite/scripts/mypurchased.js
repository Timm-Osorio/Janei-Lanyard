import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, update, push, set, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
//I love you kong nababasa mo man to
const firebaseConfig = {
  apiKey: "AIzaSyB7ZxE8vJo0r5QWKqJ9jfFWpySnHaRWsiQ",
  authDomain: "janeilanyarddb.firebaseapp.com",
  databaseURL: "https://janeilanyarddb-9ba85-default-rtdb.firebaseio.com/",
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

            //orders table
            var ordersRef = ref(db, "newOrders");
            get(ordersRef )
                .then((snapshot) => {
                    var ordersData = snapshot.val();
                    if (ordersData) {         
                        var userOrders = Object.values(ordersData).filter(order => order.Fk_cusID === userId);
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
                                    case 'CONFIRMING':
                                        statusDiv.textContent = 'To confirm';
                                        break;
                                    case 'DESIGNING':
                                        statusDiv.textContent = 'Order Processing';
                                        break;
                                    case 'PRINTING':
                                        statusDiv.textContent = 'Order Printing';
                                        break;
                                    case 'DELIVERING':
                                        statusDiv.textContent = 'To deliver';
                                        break;
                                    case 'COMPLETE':
                                        statusDiv.textContent = 'Order Completed';
                                        statusDiv.className = 'text-green-400';
                                        break;
                                    default:
                                        statusDiv.textContent = 'Order Cancelled';
                                        statusDiv.className = 'text-red-400';
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
                                
                                    if (order.status === 'CONFIRMING') {
                                        document.getElementById('orderstatus').textContent = 'To confirm';
                                    } 
                                    else if (order.status === 'DESIGNING'){
                                        document.getElementById('orderstatus').textContent = 'Order Designing';
                                    }
                                    else if (order.status === 'PRINTING'){
                                        document.getElementById('orderstatus').textContent = 'Order Printing';
                                        document.getElementById('cancelorder').style.display = 'none';
                                    }
                                    else if (order.status === 'DELIVERING'){
                                        document.getElementById('orderstatus').textContent = 'To deliver';
                                        document.getElementById('cancelorder').style.display = 'none';
                                    }
                                    else if (order.status === 'COMPLETE'){
                                        document.getElementById('orderstatus').textContent = 'Order Completed';
                                        document.getElementById('cancelorder').style.display = 'none';
                                    }
                                    else {
                                        document.getElementById('orderstatus').textContent = 'Order Cancelled';
                                        document.getElementById('cancelorder').style.display = 'none';
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

                //completed orders table
                var ordersRef2 = ref(db, "completeOrders");
                get(ordersRef2 )
                .then((snapshot2) => {
                    var ordersData2 = snapshot2.val();
                    if (ordersData2) {         
                        var userOrders2 = Object.values(ordersData2).filter(order => order.Fk_cusID === userId);
                        if (userOrders2.length > 0) {
                            document.getElementById('orders-container2').innerHTML = '';

                            userOrders2.forEach(order2 => {
                                var orderDiv2 = document.createElement('div');
                                orderDiv2.className = 'p-4 mb-1 flex justify-between rounded-md shadow-md bg-slate-700';
                                //for the divs of orders 
                                var orderIdDiv2 = document.createElement('div');
                                orderIdDiv2.className = 'text-sm text-white';
                                orderIdDiv2.textContent = order2.id; 
                                //show order status
                                var statusDiv2 = document.createElement('div');
                                statusDiv2.className = 'text-sm text-white';
                                switch (order2.status) {
                                    case 'COMPLETE':
                                        statusDiv2.textContent = 'Order Completed';
                                        statusDiv2.className = 'text-green-400 text-sm';
                                        break;
                                    default:
                                        statusDiv2.textContent = 'Cancelled by the Seller';
                                        statusDiv2.className = 'text-red-400 text-sm';
                                        break;
                                }
                                //for the detail button
                                var detailsButton2 = document.createElement('button');
                                detailsButton2.type = 'button';
                                detailsButton2.className = 'hover:bg-slate-300 rounded-sm px-2 bg-yellow-500 hover:scale-95 duration-200';
                                detailsButton2.innerHTML = '<div class="duration-200 hover:text-slate-900 text-sm text-white">DETAILS</div>';
                                //content of the orders show in the modal
                                detailsButton2.addEventListener('click', function() {
                                    console.log('Details button clicked for order:', order2);
                                    document.getElementById('orderid').textContent = order2.id;
                                    document.getElementById('ordername').textContent = order2.name; 
                                    document.getElementById('orderquantity').textContent = order2.quantity;
                                    document.getElementById('orderamount').textContent = order2.price;
                                   
                                    if (order2.status === 'COMPLETE'){
                                        document.getElementById('orderstatus').textContent = 'Order Completed';
                                        document.getElementById('cancelorder').style.display = 'none';
                                    }
                                    else {
                                        document.getElementById('orderstatus').textContent = 'Order Cancelled by the seller';
                                        document.getElementById('cancelorder').style.display = 'none';
                                    }


                                    
                                    function loadChatMessages2(selectedOrderId2) {
                                    var selectedOrderId2 = order2.id; 
                                    var chatRef2 = ref(db, "orderChats");
                                    get(chatRef2)
                                        .then((snapshot2) => {
                                            var chatData2 = snapshot2.val();
                                            if (chatData2) {
                                                // Find chat data associated with the selected order
                                                var orderChat2 = chatData2[selectedOrderId2];
                                                if (orderChat2) {
                                                   
                                
                                                    var chatMessages2 = orderChat2.Messages;
                                                    if (chatMessages2) {
                                                        var chatroomDiv2 = document.getElementById('chatroom-messages');
                                                        chatroomDiv2.innerHTML = ''; 
                                
                                                        chatMessages2.forEach(message => {
                                                            var messageContent2 = message.Content;
                                                            var sender2 = message.Sender.toLowerCase(); 
                                                        
                                                            // Determine the class for the message container based on the sender
                                                            var messageClass2 = (sender2 === 'customer') ? 'mx-2 my-2 pl-10 flex  flex-col items-end' : 'mx-2 my-2 pr-10 flex flex-col items-start';
                                                            
                                                            // Determine the ID for the message div based on the sender
                                                            var messageId2 = (sender2 === 'customer') ? 'customerchat' : 'adminchat';
                                                        
                                                            // Determine the background color class based on the sender
                                                            var bgClass2 = (sender2 === 'customer') ? 'bg-slate-900 rounded-br-lg rounded-bl-lg rounded-tl-lg ' : 'bg-slate-600 rounded-br-lg rounded-bl-lg rounded-tr-lg  ';
                                                        
                                                            // Create the message div
                                                            var messageDiv2 = document.createElement('div');
                                                            messageDiv2.className = messageClass2;
                                                            
                                                            var senderNameDiv2 = document.createElement('div');
                                                            senderNameDiv2.className = 'text-xs text-gray-500'; 
                                                            senderNameDiv2.textContent = sender2=== 'customer' ? 'Me' : 'Admin';
                                                            messageDiv2.appendChild(senderNameDiv2);
                                                        
                                                            // Create the message content div
                                                            var contentDiv2 = document.createElement('div');
                                                            contentDiv2.className = 'relative z-20 text-white py-2 px-4 mb-2  ' + bgClass2; // Add bgClass here
                                                            contentDiv2.innerHTML = '<p id="' + messageId2 + '" class="text-sm w-auto h-auto">' + messageContent2 + '</p>';
                                                        
                                                            // Append contentDiv to messageDiv
                                                            messageDiv2.appendChild(contentDiv2);
                                                        
                                                            // Append messageDiv to chatroom container
                                                            chatroomDiv2.appendChild(messageDiv2);
                                                        });
                                                       
                                                        
                                                    } else {
                                                        console.log('No chat messages found for order:', selectedOrderId2);
                                                    }
                                                } else {
                                                    console.log('No chat data found for order:', selectedOrderId2);
                                                }
                                            } else {
                                                console.log('No chat data found in the database');
                                            }
                                        })
                                        .catch((error2) => {
                                            console.log('Error getting chat data:', error2.message);
                                        });    
                                    }
                              
                                    document.getElementById('chatroom').addEventListener('click', function() {
                                  
                                        var selectedOrderId2 = document.getElementById('orderid').textContent; 
                                        document.getElementById('orderid').textContent = selectedOrderId2;
                                        document.getElementById('myModalinfo6').classList.remove('hidden');
                                      
                                      
                                        loadChatMessages2(selectedOrderId2);
                                   
                                        setInterval(function() {
                                            loadChatMessages2(selectedOrderId2);
                                        }, 1000);
                                    });
                                    
                                    document.getElementById('myModalinfo5').classList.remove('hidden');
                                    
                                });
                                
                                orderDiv2.appendChild(orderIdDiv2);
                                orderDiv2.appendChild(statusDiv2);
                                orderDiv2.appendChild(detailsButton2);
                                document.getElementById('orders-container').appendChild(orderDiv2);
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


                var ordersRef3 = ref(db, "cancelOrder");
                get(ordersRef3 )
                .then((snapshot3) => {
                    var ordersData3 = snapshot3.val();
                    if (ordersData3) {         
                        var userOrders3 = Object.values(ordersData3).filter(order => order.Fk_cusID === userId);
                        if (userOrders3.length > 0) {
                            document.getElementById('orders-container3').innerHTML = '';

                            userOrders3.forEach(order3 => {
                                var orderDiv3 = document.createElement('div');
                                orderDiv3.className = 'p-4 mb-1 flex justify-between rounded-md shadow-md bg-slate-700';
                                //for the divs of orders 
                                var orderIdDiv3 = document.createElement('div');
                                orderIdDiv3.className = 'text-sm text-white';
                                orderIdDiv3.textContent = order3.id; 
                                //show order status
                                var statusDiv3 = document.createElement('div');
                                statusDiv3.className = 'text-sm text-white';
                                switch (order3.status) {
                                    default:
                                        statusDiv3.textContent = 'Order Cancelled';
                                        statusDiv3.className = 'text-red-400 text-sm';
                                        break;
                                }
                                //for the detail button
                                var detailsButton3 = document.createElement('button');
                                detailsButton3.type = 'button';
                                detailsButton3.className = 'hover:bg-slate-300 rounded-sm px-2 bg-yellow-500 hover:scale-95 duration-200';
                                detailsButton3.innerHTML = '<div class="duration-200 hover:text-slate-900 text-sm text-white">DETAILS</div>';
                                //content of the orders show in the modal
                                detailsButton3.addEventListener('click', function() {
                                    console.log('Details button clicked for order:', order3);
                                    document.getElementById('orderid').textContent = order3.id;
                                    document.getElementById('ordername').textContent = order3.name; 
                                    document.getElementById('orderquantity').textContent = order3.quantity;
                                    document.getElementById('orderamount').textContent = order3.price; 
                                    document.getElementById('orderstatus').textContent = 'Order Cancelled';
                                    document.getElementById('chatroom').style.display = 'none';
                                    document.getElementById('cancelorder').style.display = 'none';
                                    document.getElementById('myModalinfo5').classList.remove('hidden');
                                    
                                });
                                
                                orderDiv3.appendChild(orderIdDiv3);
                                orderDiv3.appendChild(statusDiv3);
                                orderDiv3.appendChild(detailsButton3);
                                document.getElementById('orders-container3').appendChild(orderDiv3);
                            });
                        } else {
                            console.log("No orders found for the current user");
                          
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
// send message
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
// remove and cancel order
document.addEventListener('DOMContentLoaded', function() {
    async function cancelOrder(orderId) {
        var orderRef = ref(db, "newOrders/" + orderId);
        var snapshot = await get(orderRef);
        var orderData = snapshot.val();

        if (orderData) {
            var newOrderRef = ref(db, "cancelOrder/" + orderId);
            orderData.status = "CANCELLED";
            await set(newOrderRef, orderData);
            await remove(orderRef);
            location.reload();
            console.log('Order successfully cancelled and moved to cancelledOrders table:', orderId);
            
        } else {
            console.log('Order not found:', orderId);
        }
    }

    document.getElementById('cancelorder').addEventListener('click', function() {
        var orderId = document.getElementById('orderid').textContent;
        cancelOrder(orderId);
    });
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
