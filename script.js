// API Endpoints & Key
const APIKEY = "67a58bf59c979736731b2a71";
const REGISTER_API = "https://mokesell-714e.restdb.io/rest/register?max=2";
const LOGIN_API = "https://mokesell-714e.restdb.io/rest/register";
const PRODUCTS_API = "https://mokesell-714e.restdb.io/rest/products";
const UPLOAD_API = "https://mokesell-714e.restdb.io/rest/photos";

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


// Sample messages to initialize the chat
const initialMessages = [
  {
      text: "Hi, may I know if you still have stock?",
      time: "Yesterday, 6:15pm",
      sent: true
  }, 
  {
      text: "Hi, yes we still have this item in stock and a few colours are still available",
      time: "Yesterday, 6:30pm",
      sent: false
  },
  {
      text: "Ooh okay great, may I know if blue or yellow colour are still available?",
      time: "Yesterday, 7:45pm",
      sent: true
  },
  {
      text: "Yes, blue and yellow colour are still available for the same price.",
      time: "Yesterday, 8:10pm",
      sent: false
  },
  {
      text: "Great, may I know when the item will be delivered? Thanks!",
      time: "Today, 11:00pm",
      sent: true
  }
];

// Function to create a message element
function createMessageElement(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${message.sent ? 'sent' : ''}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  
  const text = document.createElement('div');
  text.textContent = message.text;
  
  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = message.time;
  
  content.appendChild(text);
  content.appendChild(time);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  
  return messageDiv;
}

// Function to display messages
function displayMessages() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = ''; // Clear existing messages
  initialMessages.forEach(message => {
      chatMessages.appendChild(createMessageElement(message));
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send a new message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  
  if (text) {
      const message = {
          text: text,
          time: new Date().toLocaleTimeString(),
          sent: true
      };
      
      const chatMessages = document.getElementById('chatMessages');
      chatMessages.appendChild(createMessageElement(message));
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Update the preview message in sidebar
      const activePreview = document.querySelector('.chat-preview.active .preview-message');
      if (activePreview) {
          activePreview.textContent = `You: ${text}`;
      }
      
      input.value = '';
  }
}

// Initialize the chat
displayMessages();

// Allow sending message with Enter key
document.getElementById('messageInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      sendMessage();
  }
});

// Add click handlers for chat previews
document.querySelectorAll('.chat-preview').forEach(preview => {
  preview.addEventListener('click', function() {
      // Remove active class from all previews
      document.querySelectorAll('.chat-preview').forEach(p => p.classList.remove('active'));
      // Add active class to clicked preview
      this.classList.add('active');
  });
});



//make sure js not hiding username of listing
// Example function to create a listing dynamically
function createListing(item) {
  let container = document.createElement("div");
  container.classList.add("listing");

  container.innerHTML = `
      <img src="${item.image}" class="listing-img">
      <div class="user-info">
          <img src="${item.userPfp}" class="user-pfp">
          <p class="username">${item.username || "Unknown"}</p>
          <button class="like-btn">❤️</button>
      </div>
      <p class="item-name">${item.name}</p>
      <p class="item-price">$${item.price} <span class="item-condition">${item.condition}</span></p>
  `;

  document.querySelector(".listings-container").appendChild(container);
}

document.getElementById("photo-upload-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const photoInput = document.getElementById("photo");
  const formData = new FormData();

  if (photoInput.files.length === 0) {
      alert("Please select a photo.");
      return;
  }

  formData.append("photo", photoInput.files[0]);

  // Display loading message
  document.getElementById("upload-message").innerHTML = "Uploading... Please wait.";

  // Perform the fetch request to upload the image
  fetch(UPLOAD_API, {
      method: "POST",
      headers: {
          "x-apikey": APIKEY
      },
      body: formData
  })
  .then((response) => {
      if (!response.ok) throw new Error("Failed to upload photo.");
      return response.json();
  })
  .then((data) => {
      console.log("Photo uploaded successfully:", data);
      document.getElementById("upload-message").innerHTML = "Upload successful!"; // Show success message
  })
  .catch((error) => {
      console.error("Error uploading photo:", error);
      document.getElementById("upload-message").innerHTML = "Failed to upload photo. Please try again.";
  });
});

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

document.getElementById("photo-upload-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const photoInput = document.getElementById("photo");
    const file = photoInput.files[0];

    if (!file) {
        alert("Please select a photo.");
        return;
    }

    // Create a storage reference
    const fileRef = storageRef.child(`photos/${file.name}`);

    // Upload the file to Firebase Storage
    fileRef.put(file).then((snapshot) => {
        console.log("Uploaded a file to Firebase Storage", snapshot);
        document.getElementById("upload-message").innerHTML = "Upload successful!";
    }).catch((error) => {
        console.error("Error uploading photo:", error);
        document.getElementById("upload-message").innerHTML = "Failed to upload photo.";
    });
});