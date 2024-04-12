
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

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;

    if (firstName && lastName && email && username && password && address) {
        try {
            const lastUserId = await getLastUserId(); // Fetch the last user ID
            const newUserId = lastUserId + 1; // Increment the last user ID

            // All fields are filled, proceed with registration
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
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        // At least one field is empty, show error message
        console.error("Error: All fields are required");
        // You can also display an error message to the user
    }
});

async function getLastUserId() {
    try {
        const response = await get(ref(db, 'customers'));
        if (!response.exists()) {
            return 0; // If no users exist, start from 0
        }
        const userData = response.val();
        const userIds = Object.keys(userData);
        if (userIds.length === 0) {
            return 0; // If no users exist, start from 0
        }
        const lastUserId = Math.max(...userIds.map(id => parseInt(id))); // Find the maximum user ID
        return lastUserId;
    } catch (error) {
        console.error('Error fetching last user ID:', error);
        throw error;
    }
}