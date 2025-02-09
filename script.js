// API Endpoints & Key
const APIKEY = "67a58bf59c979736731b2a71";
const REGISTER_API = "https://mokesell-714e.restdb.io/rest/register?max=2";
const LOGIN_API = "https://mokesell-714e.restdb.io/rest/register";
const PRODUCTS_API = "https://mokesell-714e.restdb.io/rest/products";

document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register-btn");
  if (registerButton) {
    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      let firstName = document.getElementById("register-first-name").value.trim();
      let lastName = document.getElementById("register-last-name").value.trim();
      let email = document.getElementById("register-email").value.trim();
      let phone = document.getElementById("register-phone").value.trim();
      let password = document.getElementById("register-password").value.trim();

      if (!firstName || !lastName || !email || !phone || !password) {
        alert("All fields are required!");
        return;
      }

      let jsonData = {
        "First Name": firstName,
        "Last Name": lastName,
        "Email": email,
        "Phone Number": phone,
        "Password": password,
      };

      fetch(REGISTER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Registration failed.");
          return response.json();
        })
        .then((data) => {
          alert("Registration successful! Redirecting to homepage...");
          window.location.href = "homepage.html";
        })
        .catch((error) => {
          console.error("Error registering user:", error);
          alert("Registration failed. Please try again.");
        });
    });
  }

  // Login Function

  document.getElementById("login-btn").addEventListener("click", function (e) {
    e.preventDefault();
  
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();
  
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    // Correct the fetch URL formatting with template literals
    fetch(`${LOGIN_API}?q=` + encodeURIComponent(JSON.stringify({ Email: email })), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Login request failed.");
        return response.json();
      })
      .then((users) => {
        if (users.length === 0) {
          alert("User not found. Please check your email or register.");
          return;
        }
  
        let user = users[0];
  
        // Compare the entered password with the stored password
        if (user["Password"] !== password) {
          alert("Incorrect password. Please try again.");
          return;
        }
  
        // Save the logged-in user data to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful! Redirecting to homepage...");
        window.location.href = "homepage(loggedin).html"; // Redirect after successful login
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed. Please try again.");
      });
  });

  // Check if User is Logged In
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    document.getElementById("login-tab").style.display = "none";
    document.getElementById("register-tab").style.display = "none";
    document.getElementById("account-tab").style.display = "inline";
    document.getElementById("logout-btn").style.display = "inline";
  } else {
    document.getElementById("account-tab").style.display = "none";
    document.getElementById("logout-btn").style.display = "none";
  }
});

// Logout Function
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "homepage.html";
}

  // ---------------------------
  // UI Toggling Based on Login State
  // ---------------------------
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const loginTab = document.getElementById("login-tab");
    if (loginTab) loginTab.style.display = "none";
    const registerTab = document.getElementById("register-tab");
    if (registerTab) registerTab.style.display = "none";
    const accountTab = document.getElementById("account-tab");
    if (accountTab) accountTab.style.display = "inline";
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    const accountTab = document.getElementById("account-tab");
    if (accountTab) accountTab.style.display = "none";
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // ---------------------------
  // Product Listing Functionality
  // ---------------------------
  const productForm = document.getElementById("product-form");
  if (productForm) {
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("product-name").value.trim();
      const description = document.getElementById("product-description").value.trim();
      const price = document.getElementById("product-price").value.trim();
      const quality = document.getElementById("product-quality").value.trim();
      const status = document.getElementById("product-status").value.trim();
      const condition = document.getElementById("product-condition").value.trim();
      const category = document.getElementById("product-category").value.trim();
      const listerEmail = document.getElementById("product-lister-email").value.trim();
      const image = document.getElementById("product-image").value.trim();
      const listDate = new Date().toISOString().split("T")[0];

      if (!name || !description || !price || !quality || !status || !condition || !category || !listerEmail || !image) {
        alert("Please fill in all fields.");
        return;
      }

      const productData = {
        "Name": name,
        "Description": description,
        "Price": price,
        "Condition": condition,
        "Brand": "Brand",
        "Category": category,
        "List Date": listDate,
        "Lister Email": listerEmail,
        "Image": image
      };

      fetch(PRODUCTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(productData)
      })
        .then(response => {
          if (!response.ok) throw new Error("Failed to add product.");
          return response.json();
        })
        .then(data => {
          alert("Product added successfully!");
          productForm.reset();
        })
        .catch(error => {
          console.error("Error adding product:", error);
          alert("Failed to add product. Please try again.");
        });
    });
  }

  // Language
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", function () {
      changeLanguage();
    });
  }


// Language Change Function
function changeLanguage() {
  const language = document.getElementById("languageSwitcher").value;
  const greeting = document.getElementById("greeting");
  if (greeting) {
    if (language === "en") {
      greeting.innerHTML = "Hello, welcome to the website!";
    } else if (language === "es") {
      greeting.innerHTML = "¡Hola, bienvenido al sitio web!";
    } else if (language === "fr") {
      greeting.innerHTML = "Bonjour, bienvenue sur le site web!";
    }
  }
}

// Help Form Submit Function
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

// Help Form Toggle Function
function toggleHelpForm() {
  const formContainer = document.getElementById("helpFormContainer");
  if (formContainer) {
    formContainer.style.display = (formContainer.style.display === "none" || formContainer.style.display === "") ? "block" : "none";
  }
}

// Close Notification Bar Function
function closeNotification() {
  const bar = document.getElementById("notificationBar");
  if (bar) {
    bar.classList.add("notification-hidden");
    setTimeout(() => {
      bar.style.display = "none";
      document.body.style.paddingTop = "0";
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-btn");
  const messageInput = document.getElementById("message-input");
  const chatBox = document.getElementById("chat-box");

  // Fetch messages from localStorage
  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    chatBox.innerHTML = ''; // Clear existing messages
    messages.forEach(msg => {
      displayMessage(msg.sender, msg.text);
    });
  }

  // Display a message in the chat
  function displayMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
  }

  // Handle sending a message
  sendButton.addEventListener("click", function () {
    const message = messageInput.value.trim();
    if (message) {
      const sender = "Buyer"; // Set this dynamically based on the user type
      const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
      messages.push({ sender, text: message });
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      
      displayMessage(sender, message); // Show message in chat box
      messageInput.value = ""; // Clear input field
    }
  });

  // Load chat messages on page load
  loadMessages();
});