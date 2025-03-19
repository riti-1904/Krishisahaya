document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and DOM fully loaded."); // Debugging

    // Auto-fetch user location (for signup) with high accuracy
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, accuracy } = position.coords;
                console.log("Location fetched:", latitude, longitude, "Accuracy:", accuracy);
                
                const locationField = document.getElementById("location");
                if (locationField) {
                    locationField.value = `${latitude}, ${longitude}`;
                }
            },
            error => {
                alert("Error fetching location. Please enter manually.");
                console.error(error);
            },
            {
                enableHighAccuracy: true, // Uses GPS if available for better accuracy
                timeout: 10000, // Wait up to 10s before failing
                maximumAge: 0 // Always get fresh location
            }
        );
    } else {
        alert("Geolocation is not supported in your browser.");
    }

    // Handle Signup Form Submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Signup form submitted."); // Debugging

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const location = document.getElementById("location").value;

            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, location })
                });

                const result = await response.json();
                console.log("Signup response:", result); // Debugging

                if (result.success) {
                    alert("Signup successful! Redirecting to login page.");
                    window.location.href = "login.html";
                } else {
                    alert("Signup failed: " + result.message);
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Error connecting to the server.");
            }
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Login form submitted."); // Debugging

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                console.log("Login response:", result); // Debugging

                if (result.success) {
                    alert("Login successful! Redirecting to homepage.");
                    window.location.href = "index.html";
                } else {
                    alert("Login failed: " + result.message);
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Error connecting to the server.");
            }
        });
    }
});





//____________________________previous code ______________________________
//  document.addEventListener("DOMContentLoaded", () => {
//     // Auto-fetch user location (for signup)
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const { latitude, longitude } = position.coords;
//             const locationField = document.getElementById("location");
//             if (locationField) {
//                 locationField.value = `${latitude}, ${longitude}`;
//             }
//         }, () => {
//             alert("Location access denied. Enter manually.");
//         });
//     }

//     // Handle Signup Form Submission
//     document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;
//         const location = document.getElementById("location").value;

//         const response = await fetch("http://localhost:3000/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, password, location })
//         });

//         const result = await response.json();
//         alert(result.message);
//         if (result.success) window.location.href = "login.html";
//     });

//     // Handle Login Form Submission
//     document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         const response = await fetch("http://localhost:3000/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password })
//         });

//         const result = await response.json();
//         alert(result.message);
//         if (result.success) window.location.href = "index.html";
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 const { latitude, longitude, accuracy } = position.coords;
//                 console.log("Location fetched:", latitude, longitude, "Accuracy:", accuracy);
                
//                 const locationField = document.getElementById("location");
//                 if (locationField) {
//                     locationField.value = `${latitude}, ${longitude}`;
//                 }
//             },
//             error => {
//                 alert("Error fetching location. Please enter manually.");
//                 console.error(error);
//             },
//             {
//                 enableHighAccuracy: true, // Enables GPS-based accuracy
//                 timeout: 10000, // Wait 10s before failing
//                 maximumAge: 0 // Force fresh location
//             }
//         );
//     }
// });
