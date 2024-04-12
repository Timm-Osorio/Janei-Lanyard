//DATABASE CONNECTION
async function fetchDataFromDatabase(path) {
    const firebaseDatabaseUrl = "https://janeilanyarddb-default-rtdb.firebaseio.com/";
    const response = await fetch(`${firebaseDatabaseUrl}${path}.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch data from database');
    }
    return await response.json();
}


fetchDataFromDatabase("customers/")     
    .then(data => {
        for (let e in data) {
            if (data[e] !== null){
                console.log(data[e].username);
                console.log(data[e].password);
                console.log(data[e].role);
      
            } 
        }
    })
    .catch(error => console.error("Error fetching data:", error));

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); 
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        // Fetch data from the database
        fetchDataFromDatabase("customers/")
            .then(data => {     
                for (let e in data) {
                    if (data[e] !== null && data[e].username === username && data[e].password === password) {
                        console.log("Logged in as:", username);
                        console.log("Role:", data[e].role);
                        window.location.href = "/janeiwebsite/src/home.html";
                        break;
                    } 
                    else if(username.trim() === "" || password.trim() === "") {
                        console.log("Username or password cannot be empty.");
                    }
                    else {
                        console.log("Invalid username or password.");         
                    }
                   
                }  
            })
            .catch(error => console.error("Error fetching data:", error));
    });

    