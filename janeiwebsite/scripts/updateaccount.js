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
                    console.log("User ID: " + userData.id)
                    console.log("Email: " + userData.email);
                    console.log("Username: " + userData.username);
                    uname.textContent = userData.username;
                    fullname.textContent = `${userData.firstName} ${userData.lastName}`;
                    email.textContent = userData.email;
                    address.textContent = userData.address;
                    document.getElementById('firstnameup').value = userData.firstName || '';
                    document.getElementById('lastnameup').value = userData.lastName || '';
                    document.getElementById('addressup').value = userData.address || '';
                    document.getElementById('usernameup').value = userData.username || '';
                    document.getElementById('emailup').value = userData.email || '';
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
            sessionStorage.setItem('success', 'true');
            location.reload();   
            return;       
        })
        .catch((error) => {
            console.error("Error updating user data:", error.message);
        });
}
//Reload when update and show the modal I mean div
window.onload = function() {
    const successParam = sessionStorage.getItem('success');
    if (successParam === 'true') {
        const success = document.getElementById('success');
        success.style.display = 'block';
        setTimeout(() => {
            success.style.display = 'none';
            sessionStorage.removeItem('success');
        }, 3000);
    }
};

//User information update
document.getElementById('updatebtn1').addEventListener('click', updateUser);
function updateUser() {
    const userId = localStorage.getItem('currentid');
    const firstName = document.getElementById('firstnameup').value;
    const lastName = document.getElementById('lastnameup').value;
    const address = document.getElementById('addressup').value;

    if (!firstName || !lastName || !address) {
        console.log("Please fill in all fields.");
        const errorinfo123 = document.getElementById('errorinfo123');
        errorinfo123.style.display = 'block';
        setTimeout(() => {
            errorinfo123.style.display = 'none';
        }, 3000);
        return;
    }

    checkuserdata().then(userData => {
        if (userData) {
            if (firstName === userData.firstName &&
                lastName === userData.lastName &&
                address === userData.address) {
                console.log("Nothing to change.");
                const errorinfo124 = document.getElementById('errorinfo124');
                errorinfo124.style.display = 'block';
                setTimeout(() => {
                    errorinfo124.style.display = 'none';
                }, 3000);
                return;
            }
            const newData = {
                firstName: firstName,
                lastName: lastName,
                address: address
            };
            updateUserData(userId, newData);
        }
    });
}
//Username update
document.getElementById('updatebtn2').addEventListener('click', updateUser2);
async function updateUser2() {
    const userId = localStorage.getItem('currentid');
    const userName = document.getElementById('usernameup').value;

    if (!userName) {
        console.log("Please provide a username.");
        const errorinfo = document.getElementById('errorinfo');
        errorinfo.style.display = 'block';
        setTimeout(() => {
            errorinfo.style.display = 'none';
        }, 3000);
        return;
    } 
    if (userName.length < 6) {
        console.log("Error: Username should be 6 letters or more");
        const errorinfo3 = document.getElementById('errorinfo3');
        errorinfo3.style.display = 'block';
        setTimeout(() => {
            errorinfo3.style.display = 'none';
        }, 3000);
        return;
    }
    
    checkuserdata().then(userData => {
        if (userData) {
            if (userName === userData.username) {
                console.log("Nothing to change.");
                const errorinfo4 = document.getElementById('errorinfo4');
                errorinfo4.style.display = 'block';
                setTimeout(() => {
                    errorinfo4.style.display = 'none';
                }, 3000);
                return;
            } 
            checkUsernameExists(userName).then(usernameExists => {
                if (usernameExists) {
                    console.log("Error: Username already exists");
                    const errorinfo2 = document.getElementById('errorinfo2');
                    errorinfo2.style.display = 'block';
                    setTimeout(() => {
                        errorinfo2.style.display = 'none';
                    }, 3000);
                    return;
                }
                const newData = {
                    username: userName 
                };
                updateUserData(userId, newData);
            });
        }
    });
}
//User email update
document.getElementById('updatebtn3').addEventListener('click', updateUser3);
async function updateUser3() {
    const userId = localStorage.getItem('currentid');
    const email = document.getElementById('emailup').value;

    if (!email) {
        console.log("Please provide a email address.");
        const errorinfo222 = document.getElementById('errorinfo222');
        errorinfo222.style.display = 'block';
        setTimeout(() => {
            errorinfo222.style.display = 'none';
        }, 3000);
        return;
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("Error: Invalid email format");
        const errorinfo2222 = document.getElementById('errorinfo2222');
        errorinfo2222.style.display = 'block';
        setTimeout(() => {
            errorinfo2222.style.display = 'none';
        }, 3000);
        return;
    } 
    
    checkuserdata().then(userData => {
        if (userData) {
            if (email === userData.email) {
                console.log("Nothing to change.");
                const errorinfo21 = document.getElementById('errorinfo21');
                errorinfo21.style.display = 'block';
                setTimeout(() => {
                    errorinfo21.style.display = 'none';
                }, 3000);
                return;
            } 
            checkEmailExists(email).then(emailExists => {
                if (emailExists) {
                    console.log("Error: Email is already exists");
                    const errorinfo22 = document.getElementById('errorinfo22');
                    errorinfo22.style.display = 'block';
                    setTimeout(() => {
                        errorinfo22.style.display = 'none';
                    }, 3000);
                    return;
                }
                const newData = {
                    email: email
                };
                updateUserData(userId, newData);
            });
        }
    });
}
//User password update
document.getElementById('updatebtn4').addEventListener('click', updateUser4);
async function updateUser4() {
    const userId = localStorage.getItem('currentid');
    const oldPassword = document.getElementById('oldPass').value;
    const newPassword = document.getElementById('newPass').value;

    if (!newPassword) {
        console.log("Please provide a new password.");
        const errorinfo11 = document.getElementById('errorinfo11');
        errorinfo11.style.display = 'block';
        setTimeout(() => {
            errorinfo11.style.display = 'none';
        }, 3000);
        return;
    } 

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
        console.log("Error: Password must contain at least one letter, one number, and be at least 6 characters long.");
        const errorinfo12 = document.getElementById('errorinfo12');
        errorinfo12.style.display = 'block';
        setTimeout(() => {
            errorinfo12.style.display = 'none';
        }, 3000);   
        return;
    } 

    const confirmpass = await checkOldPassword(oldPassword);
    if (!confirmpass) {
        console.log("Error: Old password is incorrect");
        const errorinfo13 = document.getElementById('errorinfo13');
        errorinfo13.style.display = 'block';
        setTimeout(() => {
            errorinfo13.style.display = 'none';
        }, 3000);
        return;
    }
    const newData = {
        password: newPassword 
    };
    updateUserData(userId, newData);   
}

document.getElementById('cancelbtn').addEventListener('click', closeModal);
document.getElementById('orderButton').addEventListener('click', openModal);
//close modal after update
function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
   
}
//open modal after update
function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "flex";
}
//checkemail
async function checkEmailExists(email) {
    const snapshot = await get(ref(db, 'customers'));
    if (snapshot.exists()) {
        const customers = snapshot.val();
        const emails = Object.values(customers).map(customer => customer.email);
        return emails.includes(email);
    } else {
        return false;
    }
}
//checkusername
async function checkUsernameExists(username) {
    const snapshot = await get(ref(db, 'customers'));
    if (snapshot.exists()) {
        const customers = snapshot.val();
        const usernames = Object.values(customers).map(customer => customer.username);
        return usernames.includes(username);
    } else {
        return false;
    }
}
//checkuserdata
async function checkuserdata() {
    const userId = localStorage.getItem('currentid');
    if (userId) {
        try {
            const userRef = ref(db, "customers/" + userId);
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            return userData; 
        } catch (error) {
            console.error("Error getting user data:", error.message);
            return null;
        }
    } else {
        console.log("No user is currently logged in");
        return null;
    }
}
//checkpasswordifmatch
async function checkOldPassword(oldPassword) {
    const userId = localStorage.getItem('currentid');
    if (!userId) {
        console.log("No user is currently logged in");
        return false;
    } 
    try {
        const userRef = ref(db, "customers/" + userId);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        return userData && userData.password === oldPassword;
    } catch (error) {
        console.error("Error checking old password:", error.message);
        return false;
    }
}
//toggleeyetoseepasswordhihi
document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordInput = document.getElementById("oldPass");
    const eyeIcon = this.querySelector('ion-icon');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute('name', 'eye-off-outline');
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute('name', 'eye-outline');
    }
});
document.getElementById("togglePassword2").addEventListener("click", function() {
    const passwordInput = document.getElementById("newPass");
    const eyeIcon = this.querySelector('ion-icon');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute('name', 'eye-off-outline');
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute('name', 'eye-outline');
    }
});