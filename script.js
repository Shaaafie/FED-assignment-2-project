document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "fbd56aaf5bf9edab375e6965cfc3bdc50fc21"; 
  const API_URL = "https://mokesell-bfee.restdb.io/rest/users"; 

  document.getElementById("register-btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Retrieve form values
    let firstName = document.getElementById("register-first-name").value.trim();
    let lastName = document.getElementById("register-last-name").value.trim();
    let email = document.getElementById("register-email").value.trim();
    let phone = document.getElementById("register-phone").value.trim();
    let address = document.getElementById("register-address").value.trim();
    let password = document.getElementById("register-password").value.trim();

    // Validate input fields
    if (!firstName || !lastName || !email || !phone || !address || !password) {
      alert("All fields are required!");
      return;
    }

    // Create user data object
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      address: address,
      password: password
    };

    // AJAX settings for RestDB POST request
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(userData)
    };

    // Send request to RestDB
    fetch(API_URL, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);

        // Show success message
        alert("Registration successful! Redirecting to login page.");

        // Redirect to login page after successful registration
        window.location.href = "login.html";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again.");
      });
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

// Fetch Main Page Content
async function fetchMainPageContent() {
  try {
    const response = await fetch(`${API_URL}/main`);
    const data = await response.json();
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = data.items.map(item => `<p>${item.name} - ${item.price}</p>`).join('');
  } catch (error) {
    console.error("Failed to fetch main page content:", error);
  }
}

fetchMainPageContent();

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

// Registration Feature
async function handleRegister() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (!name || !email || !username || !password) {
    alert("All fields are required!");
    return;
  }

  const registrationData = {
    name: name,
    email: email,
    username: username,
    password: password,
  };

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Welcome, " + name);
      window.location.href = 'login.html'; // Redirect after success
    } else {
      alert("Error: " + data.message || "Something went wrong, please try again.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please try again later.");
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
