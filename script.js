const APIKEY = "67a58bf59c979736731b2a71"; // Your actual API key
const REGISTER_API = "https://mokesell-714e.restdb.io/rest/register?max=2";
const LOGIN_API = "https://mokesell-714e.restdb.io/rest/register";

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
          "Password": password 
      };

      fetch(REGISTER_API, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsonData)
      })
      .then(response => {
          if (!response.ok) throw new Error("Registration failed.");
          return response.json();
      })
      .then(data => {
          alert("Registration successful! Redirecting to homepage...");
          window.location.href = "homepage.html";
      })
      .catch(error => {
          console.error("Error registering user:", error);
          alert("Registration failed. Please try again.");
      });
      });
  }
});

  // Login Function
  document.getElementById("login-btn").addEventListener("click", function (e) {
      e.preventDefault();

      let email = document.getElementById("login-email").value.trim();
      let password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
          alert("Please enter both email and password.");
          return;
      }

      // API Query Formatting
      fetch(`${LOGIN_API}?q=` + encodeURIComponent(JSON.stringify({ Email: email })), {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          }
      })
      .then(response => {
          if (!response.ok) throw new Error("Login request failed.");
          return response.json();
      })
      .then(users => {
          if (users.length === 0) {
              alert("User not found. Please check your email or register.");
              return;
          }

          let user = users[0];

          if (user["Password"] !== password) { // Ensure Password matches case in DB
              alert("Incorrect password. Please try again.");
              return;
          }

          localStorage.setItem("loggedInUser", JSON.stringify(user));
          alert("Login successful! Redirecting to homepage...");
          window.location.href = "homepage.html";
      })
      .catch(error => {
          console.error("Error logging in:", error);
          alert("Login failed. Please try again.");
      });
  });

  // List product
  document.getElementById("product-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    let name = document.getElementById("product-name").value.trim();
    let description = document.getElementById("product-description").value.trim();
    let price = document.getElementById("product-price").value.trim();
    let quality = document.getElementById("product-quality").value.trim();
    let status = document.getElementById("product-status").value.trim();
    let condition = document.getElementById("product-condition").value.trim();
    let category = document.getElementById("product-category").value.trim();
    let listerEmail = document.getElementById("product-lister-email").value.trim();
    let image = document.getElementById("product-image").value.trim();
    let listDate = new Date().toISOString().split("T")[0]; // Auto-generate today's date

    // Validate input fields
    if (!name || !description || !price || !quality || !status || !condition || !category || !listerEmail || !image) {
        alert("Please fill in all fields.");
        return;
    }

    // Create product object
    let productData = {
        "Name": name,
        "Description": description,
        "Price": price,
        "Condition": Condition,
        "Brand": brand,
        "Category": category,
        "List Date": listDate,
        "Lister Email": listerEmail,
        "Image": image
    };

    // Make the API call to add the product
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
        document.getElementById("product-form").reset(); // Clear form
    })
    .catch(error => {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    });
});

const productListContainer = document.getElementById("product-list");

// Fetch products and display them
fetch(PRODUCTS_API, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    }
})
.then(response => response.json())
.then(products => {
    productListContainer.innerHTML = ""; // Clear existing products
    products.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.Image}" alt="${product.Name}" class="product-image">
            <h2>${product.Name}</h2>
            <p><strong>Description:</strong> ${product.Description}</p>
            <p><strong>Price:</strong> $${product.Price}</p>
            <p><strong>Quality:</strong> ${product.Condition}</p>
            <p><strong>Status:</strong> ${product.Brand}</p>
            <p><strong>Category:</strong> ${product.Category}</p>
            <p><strong>Listed on:</strong> ${product["List Date"]}</p>
            <p><strong>Listed by:</strong> ${product["Lister Email"]}</p>
        `;

        productListContainer.appendChild(productDiv);
    });
})
.catch(error => {
    console.error("Error fetching products:", error);
    productListContainer.innerHTML = "Failed to load products.";
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

/*user.html,listingnewproducts.html*/
document.addEventListener("DOMContentLoaded", function () {
    const conditions = document.querySelectorAll(".condition");
    let selectedCondition = null;

    conditions.forEach(button => {
        button.addEventListener("click", function () {
            conditions.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            selectedCondition = this.dataset.value;
        });
    });

    document.getElementById("product-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        if (!selectedCondition) {
            document.getElementById("condition-error").textContent = "This field is required";
            valid = false;
        }

        document.querySelectorAll("input[required], textarea[required], select[required]").forEach(field => {
            if (!field.value) {
                document.getElementById(field.id + "-error").textContent = "This field is required";
                valid = false;
            }
        });

        if (valid) {
            alert("Product listed successfully!");
        }
    });
});

