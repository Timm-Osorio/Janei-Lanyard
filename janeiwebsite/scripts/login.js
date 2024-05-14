//DATABASE CONNECTION
async function fetchDataFromDatabase(path) {
    const firebaseDatabaseUrl = "https://janeilanyarddb-9ba85-default-rtdb.firebaseio.com/";
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
                if (data[e] !== null && data[e].email === username && data[e].password === password) {
                    console.log("Logged in as:", username);
                    console.log("Role:", data[e].role);
                    isLoggedIn = true;
                    localStorage.setItem('currentid', data[e].id);
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
              
               console.log("success");
               window.location.href = "/janeiwebsite/src/home.html";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
    });
    
    const setTokens = (data) => {
        if (data) {
            // user login
            localStorage.setItem("tokens", JSON.stringify(data));
        } else {
            // user logout
            localStorage.removeItem("tokens");
        }
        setAuthTokens(data);
    };

    document.getElementById("togglePassword").addEventListener("click", function() {
        const passwordInput = document.getElementById("password");
        const eyeIcon = this.querySelector('ion-icon');
    
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.setAttribute('name', 'eye-off-outline');
        } else {
            passwordInput.type = "password";
            eyeIcon.setAttribute('name', 'eye-outline');
        }
    });