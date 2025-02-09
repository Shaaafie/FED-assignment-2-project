const APIKEY = "67a58bf59c979736731b2a71"; // Your actual API key
const REGISTER_API = "https://mokesell-714e.restdb.io/rest/register?max=2";
const LOGIN_API = "https://mokesell-714e.restdb.io/rest/register";
const PRODUCTS_API = "https://mokesell-714e.restdb.io/rest/products"; // Declare products API

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
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();

      let email = document.getElementById("login-email").value.trim();
      let password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

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

          if (user["Password"] !== password) {
            alert("Incorrect password. Please try again.");
            return;
          }

          localStorage.setItem("loggedInUser", JSON.stringify(user));
          alert("Login successful! Redirecting to homepage...");
          window.location.href = "homepage(loggedin).html";
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("Login failed. Please try again.");
        });
    });
  }

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

// List Product
document.getElementById("product-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("product-name").value.trim();
  let description = document.getElementById("product-description").value.trim();
  let price = document.getElementById("product-price").value.trim();
  let condition = document.getElementById("product-condition").value.trim();
  let category = document.getElementById("product-category").value.trim();
  let listerEmail = document.getElementById("product-lister-email").value.trim();
  let image = document.getElementById("product-image").value.trim();
  let listDate = new Date().toISOString().split("T")[0];

  if (!name || !description || !price || !condition || !category || !listerEmail || !image) {
    alert("Please fill in all fields.");
    return;
  }

  let productData = {
    "Name": name,
    "Description": description,
    "Price": price,
    "Condition": condition,
    "Category": category,
    "List Date": listDate,
    "Lister Email": listerEmail,
    "Image": image,
  };

  fetch(PRODUCTS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to add product.");
      return response.json();
    })
    .then((data) => {
      alert("Product added successfully!");
      document.getElementById("product-form").reset();
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    });
});

// Fetch and Display Products
const productListContainer = document.getElementById("product-list");

fetch(PRODUCTS_API, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": APIKEY,
    "Cache-Control": "no-cache",
  },
})
  .then((response) => response.json())
  .then((products) => {
    productListContainer.innerHTML = "";
    products.forEach((product) => {
      let productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
        <img src="${product.Image}" alt="${product.Name}" class="product-image">
        <h2>${product.Name}</h2>
        <p><strong>Description:</strong> ${product.Description}</p>
        <p><strong>Price:</strong> $${product.Price}</p>
        <p><strong>Condition:</strong> ${product.Condition}</p>
        <p><strong>Category:</strong> ${product.Category}</p>
        <p><strong>Listed on:</strong> ${product["List Date"]}</p>
        <p><strong>Listed by:</strong> ${product["Lister Email"]}</p>
      `;

      productListContainer.appendChild(productDiv);
    });
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
    productListContainer.innerHTML = "Failed to load products.";
  });

  function closeNotification() {
    const bar = document.getElementById("notificationBar");
    bar.classList.add("notification-hidden");
    // Wait for animation to finish, then remove it from the DOM
    setTimeout(() => {
        bar.style.display = "none";
        document.body.style.paddingTop = "0"; // Remove extra spacing
    }, 300);
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
