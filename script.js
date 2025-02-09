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