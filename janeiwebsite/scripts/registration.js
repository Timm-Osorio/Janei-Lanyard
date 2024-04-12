
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

document.getElementById("submit").addEventListener('click', async function(e) {
    e.preventDefault();

    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;
    let address = document.getElementById("address").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName && lastName && email && username && password && address) {
        if (!emailRegex.test(email)) {
            console.log("Error: Invalid email format");
            const errorContainer4 = document.getElementById('errorContainer4');
            errorContainer4.style.display = 'block';
            setTimeout(() => {
                errorContainer4.style.display = 'none';
            }, 3000);
        } else  if (cpass !== password) {
            console.log("Password and Confirm password don't match");
            const errorContainer1 = document.getElementById('errorContainer1');
            errorContainer1.style.display = 'block';
            setTimeout(() => {
                errorContainer1.style.display = 'none';
            }, 3000);
        }
        else {
            const emailExists = await checkEmailExists(email);
            const usernameExists = await checkUsernameExists(username);
            if (emailExists) {
                console.log("Error: Email already exists");
                const errorContainer2 = document.getElementById('errorContainer2');
                errorContainer2.style.display = 'block';
                setTimeout(() => {
                    errorContainer2.style.display = 'none';
                }, 3000);
            } else if (usernameExists) {
                console.log("Error: Username already exists");
                const errorContainer3 = document.getElementById('errorContainer3');
                errorContainer3.style.display = 'block';
                setTimeout(() => {
                    errorContainer3.style.display = 'none';
                }, 3000);
            }  
            else {
            try {
                const lastUserId = await getLastUserId(); 
                const newUserId = lastUserId + 1;
    
                set(ref(db, 'customers/' + newUserId), {
                    id: newUserId.toString(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    password: password,
                    address: address
                });
                console.log("Success");
                firstName = "";
                lastName = "";
                email = "";
                username = "";
                password = "";
                address = "";
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    } else {
        console.error("Error: All fields are required");
        const errorContainer = document.getElementById('errorContainer');
        errorContainer.style.display = 'block';
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 3000);
    }
});


//userid
async function getLastUserId() {
    try {
        const response = await get(ref(db, 'customers'));
        if (!response.exists()) {
            return 0; 
        }
        const userData = response.val();
        const userIds = Object.keys(userData);
        if (userIds.length === 0) {
            return 0; 
        }
        const lastUserId = Math.max(...userIds.map(id => parseInt(id)));
        return lastUserId;
    } catch (error) {
        console.error('Error fetching last user ID:', error);
        throw error;
    }
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