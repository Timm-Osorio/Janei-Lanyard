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

const uname = document.getElementById('username');
const fullname = document.getElementById('name');
const address = document.getElementById('address');
const email = document.getElementById('email');

//fetch currently login user
function getCurrentUserData() {
    const userId = localStorage.getItem('currentid');

    if (userId) {
        var userRef = ref(db, "customers/" + userId);

        

        get(userRef)
            .then((snapshot) => {
                var userData = snapshot.val();
                if (userData) {
                    console.log("Email: " + userData.email);
                    console.log("Username: " + userData.username);
                    uname.textContent = userData.username;
                    fullname.textContent = `${userData.firstName} ${userData.lastName}`;
                    email.textContent = userData.email;
                    address.textContent = userData.address;
                    document.getElementById('usernameup').value = userData.username;
                    document.getElementById('firstname').value = userData.firstName;
                    document.getElementById('lastname').value = userData.lastName;
                    document.getElementById('emailup').value = userData.email;  
                } else {
                    console.log("No data found for the current user");
                }
            })
            .catch((error) => {
                console.log("Error getting user data: " + error.message);
            });
    } else {
        console.log("No user is currently logged in");
    }
}
getCurrentUserData();

//update account information function
function updateUserData(userId, newData) {
    if (!userId || !newData) {
        console.error("User ID and new data must be provided");
        return;
    }
    var userRef = ref(db, "customers/" + userId);
    update(userRef, newData)
        .then(() => {
            console.log("User data updated successfully!");
            closeModal();
            location.reload();
        })
        .catch((error) => {
            console.error("Error updating user data:", error.message);
        });
}


document.getElementById('updatebtn').addEventListener('click', updateUser);

function updateUser() {
    const userId = localStorage.getItem('currentid');
    const username = document.getElementById('usernameup').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('emailup').value;

    const newData = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email
    };
    updateUserData(userId, newData);
}



//close modal after update
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}