//DATABASE CONNECTION
async function fetchDataFromDatabase(path) {
    const firebaseDatabaseUrl = "https://janeilanyarddb-default-rtdb.firebaseio.com/";
    const response = await fetch(`${firebaseDatabaseUrl}${path}.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch data from database');
    }
    return await response.json();
}

    const doc_iderror = true; 
 

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); 
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        // Fetch data from the database
        fetchDataFromDatabase("customers/")
        .then(data => {     
            let isLoggedIn = false;
            for (let e in data) {
                if (data[e] !== null && data[e].username === username && data[e].password === password) {
                    console.log("Logged in as:", username);
                    console.log("Role:", data[e].role);
                    isLoggedIn = true;
                    break;
                } 
            }
            if (!isLoggedIn) {
                if (username.trim() === "" || password.trim() === "") {
                    console.log("Username or password cannot be empty.");
                    const errorMessage = "Username or password cannot be empty.";
                    const errorContainer = document.getElementById('errorContainer');
                    errorContainer.style.display = 'block';
                    setTimeout(() => {
                        errorContainer.style.display = 'none';
                    }, 3000);
                } else {
                    console.log("Invalid username or password.");
                    const errorContainer = document.getElementById('errorContainer2');
                    errorContainer.style.display = 'block';
                    setTimeout(() => {
                        errorContainer.style.display = 'none';
                    }, 3000);
                }
            } else {
               window.location.href = "/janeiwebsite/src/home.html";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
    });
