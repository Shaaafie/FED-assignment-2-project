const APIKEY = "67a58bf59c979736731b2a71"; // Use your real API Key
const API_URL = "https://mokesell-714e.restdb.io/rest/register";

document.getElementById("register-btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Get form values
    let firstName = document.getElementById("register-first-name").value.trim();
    let lastName = document.getElementById("register-last-name").value.trim();
    let email = document.getElementById("register-email").value.trim();
    let phone = document.getElementById("register-phone").value.trim();
    let password = document.getElementById("register-password").value.trim();

    // Validate inputs
    if (!firstName || !lastName || !email || !phone || !password) {
        alert("All fields are required!");
        return;
    }

    // Create JSON object
    let jsonData = {
        "First Name": firstName,
        "Last Name": lastName,
        "Email": email,
        "Phone Number": phone,
        "Password": password
    };

    // Fetch settings
    let settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,  // ✅ Ensure API Key is correct
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsonData)
    };

    // Make API call
    fetch(API_URL, settings)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            console.log("User registered:", data);
            alert("Registration successful!");
            document.querySelector(".form-container").reset();
        })
        .catch(error => {
            console.error("Error registering user:", error);
            alert("Registration failed. Check console for details.");
        });
});

// Language Change Function
function changeLanguage() {
  const language = document.getElementById("languageSwitcher").value;
  const greeting = document.getElementById("greeting");

  if (language === "en") {
    greeting.innerHTML = "Hello, welcome to the website!";
  } else if (language === "es") {
    greeting.innerHTML = "¡Hola, bienvenido al sitio web!";
  } else if (language === "fr") {
    greeting.innerHTML = "Bonjour, bienvenue sur le site web!";
  }
}

// Section Switching Function
function switchSection(section, tab) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(t => t.classList.remove('active'));
  section.classList.add('active');
  tab.classList.add('active');
}

// Close Notification
function closeNotification() {
  const bar = document.getElementById("notificationBar");
  bar.classList.add("notification-hidden");

  // Wait for animation to finish, then remove it from the DOM
  setTimeout(() => {
    bar.style.display = "none";
    document.body.style.paddingTop = "0"; // Remove extra spacing
  }, 300);
}

// Handle Login
async function handleLogin() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.success) {
      alert("Login successful!");
      switchSection(mainPage, mainTab);
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
}

// Help Form Toggle
function toggleHelpForm() {
  const formContainer = document.getElementById("helpFormContainer");
  formContainer.style.display = (formContainer.style.display === "none" || formContainer.style.display === "") ? "block" : "none";
}

// Help Form Submit
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  let formIsValid = true;

  if (name.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required.";
    formIsValid = false;
  }
  if (email.trim() === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    formIsValid = false;
  }
  if (description.trim() === "") {
    document.getElementById("descriptionError").textContent = "Description is required.";
    formIsValid = false;
  }

  if (formIsValid) {
    document.getElementById("formSuccess").textContent = "Thank you for your submission. We will get back to you shortly!";
    console.log("Form Submitted", { name, email, category, description });
    document.getElementById("helpForm").reset();
  }
}