import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
//I love you kong nababasa mo man to tangina mo!
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

//display orders of the current user
function getOrdersInfo() {
    const userId = localStorage.getItem('currentid');
    if (userId) {
        var ordersRef = ref(db, "orders");
        
        get(ordersRef)
            .then((snapshot) => {
                var ordersData = snapshot.val();
                if (ordersData) {         
                    var userOrders = Object.values(ordersData).filter(order => order.FK_cusId === userId);
                    if (userOrders.length > 0) {
                        document.getElementById('orders-container').innerHTML = '';

                        userOrders.forEach(order => {
                            var orderDiv = document.createElement('div');
                            orderDiv.className = 'p-4 mb-1 flex justify-between rounded-md shadow-md bg-slate-700';
                            //for the divs of orders 
                            var orderIdDiv = document.createElement('div');
                            orderIdDiv.className = 'text-sm text-white';
                            orderIdDiv.textContent = order.name; 
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