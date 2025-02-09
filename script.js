const APIKEY = "67a58bf59c979736731b2a71";
const REGISTER_API = "https://mokesell-714e.restdb.io/rest/register";
const LOGIN_API = "https://mokesell-714e.restdb.io/rest/register";
const PRODUCTS_API = "https://mokesell-714e.restdb.io/rest/products";

// Register Function
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

            fetch(`${LOGIN_API}?q=` + encodeURIComponent(JSON.stringify({ Email: email })), {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "x-apikey": APIKEY,
                  "Cache-Control": "no-cache"
              },
              mode: "no-cors"
          })
          .then(response => {
              // You won't be able to read the response content, but you can handle basic success/failure
              if (!response.ok) {
                  throw new Error("Login request failed.");
              }
          })
          .catch(error => {
              console.error("Error logging in:", error);
              alert("Login failed. Please try again.");
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

    fetch(`${LOGIN_API}?q=` + encodeURIComponent(JSON.stringify({ Email: email })), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        mode: "no-cors"
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

        if (user["Password"] !== password) {
            alert("Incorrect password. Please try again.");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful! Redirecting to homepage...");
        window.location.href = "homepage(loggedin).html";
    })
    .catch(error => {
        console.error("Error logging in:", error);
        alert("Login failed. Please try again.");
    });
});

// Product Listing
document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("product-form");
  if (productForm) {
      productForm.addEventListener("submit", function (e) {
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
              "Condition": condition,
              "Brand": "Brand", // If needed, replace with form value
              "Category": category,
              "List Date": listDate,
              "Lister Email": listerEmail,
              "Image": image
          };

          // Try to add product
          try {
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
          } catch (error) {
              console.error("Unexpected error:", error);
              alert("An unexpected error occurred while adding the product.");
          }
      });
  }
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

// Close Notification Bar
function closeNotification() {
  const bar = document.getElementById("notificationBar");

  // Add the hidden class to trigger the hiding animation
  bar.classList.add("notification-hidden");

  // Wait for animation to finish (300ms in this case) before hiding it completely
  setTimeout(() => {
      bar.style.display = "none"; // Hide the element completely after animation
      document.body.style.paddingTop = "0"; // Adjust body padding to remove extra space
  }, 300); // Match this value to the CSS transition duration
}


// document.addEventListener("DOMContentLoaded", function () {
//   // Check if the user is logged in
//   const loggedInUser = localStorage.getItem("loggedInUser");
//   const productForm = document.getElementById("product-form");
//   const loginSection = document.getElementById("login-section");
//   const productListContainer = document.getElementById("product-list");

//   if (loginSection) {
//     // If the login section exists, you can modify its style
//     const loggedInUser = localStorage.getItem("loggedInUser");

//     if (loggedInUser) {
//       loginSection.style.display = "none"; // Hide login section
//       productForm.style.display = "block"; // Show product form
//     } else {
//       productForm.style.display = "none"; // Hide product form if not logged in
//     }
//   }

//   // Register function
//   const registerButton = document.getElementById("register-btn");
//   if (registerButton) {
//     registerButton.addEventListener("click", function (e) {
//       e.preventDefault();
//       let firstName = document.getElementById("register-first-name").value.trim();
//       let lastName = document.getElementById("register-last-name").value.trim();
//       let email = document.getElementById("register-email").value.trim();
//       let phone = document.getElementById("register-phone").value.trim();
//       let password = document.getElementById("register-password").value.trim();

//       if (!firstName || !lastName || !email || !phone || !password) {
//         alert("All fields are required!");
//         return;
//       }

//       let jsonData = {
//         "First Name": firstName,
//         "Last Name": lastName,
//         "Email": email,
//         "Phone Number": phone,
//         "Password": password
//       };

//       fetch(REGISTER_API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-apikey": APIKEY,
//           "Cache-Control": "no-cache"
//         },
//         body: JSON.stringify(jsonData)
//       })
//       .then(response => response.json())
//       .then(data => {
//         alert("Registration successful! Redirecting to homepage...");
//         window.location.href = "homepage.html";
//       })
//       .catch(error => {
//         console.error("Error registering user:", error);
//         alert("Registration failed. Please try again.");
//       });
//     });
//   }

//   // Login Function
//   document.getElementById("login-btn").addEventListener("click", function (e) {
//     e.preventDefault();

//     let email = document.getElementById("login-email").value.trim();
//     let password = document.getElementById("login-password").value.trim();

//     if (!email || !password) {
//       alert("Please enter both email and password.");
//       return;
//     }

//     fetch(`${LOGIN_API}?q=${encodeURIComponent(JSON.stringify({ "Email": email }))}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-apikey": APIKEY,
//         "Cache-Control": "no-cache"
//       }
//     })
//     .then(response => response.json())
//     .then(users => {
//       if (users.length === 0) {
//         alert("User not found. Please check your email or register.");
//         return;
//       }

//       let user = users[0];

//       if (user["Password"] !== password) {
//         alert("Incorrect password. Please try again.");
//         return;
//       }

//       localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user in localStorage
//       alert("Login successful! Redirecting to homepage...");
//       window.location.href = "homepage(loggedin).html"; // Redirect to homepage with logged in state
//     })
//     .catch(error => {
//       console.error("Error logging in:", error);
//       alert("Login failed. Please try again.");
//     });
//   });

//   // Product Listing Form
//   document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("product-form");
//     if (form) {
//       form.addEventListener("submit", function(e) {
//         e.preventDefault(); // Prevent form submission

//         let name = document.getElementById("product-name").value.trim();
//         let description = document.getElementById("product-description").value.trim();
//         let price = document.getElementById("product-price").value.trim();
//         let condition = document.getElementById("product-condition").value.trim();
//         let brand = document.getElementById("product-brand").value.trim();
//         let category = document.getElementById("product-category").value.trim();
//         let listerEmail = document.getElementById("product-lister-email").value.trim();
//         let image = document.getElementById("product-image").value.trim();
//         let listDate = new Date().toISOString().split("T")[0];

//         if (!name || !description || !price || !condition || !brand || !category || !listerEmail || !image) {
//           alert("Please fill in all fields.");
//           return;
//         }

//         let productData = {
//           "Name": name,
//           "Description": description,
//           "Price": price,
//           "Condition": condition,
//           "Brand": brand,
//           "Category": category,
//           "List Date": listDate,
//           "Lister Email": listerEmail,
//           "Image": image
//         };

//         fetch(PRODUCTS_API, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache"
//           },
//           body: JSON.stringify(productData)
//         })
//         .then(response => response.json())
//         .then(data => {
//           alert("Product added successfully!");
//           document.getElementById("product-form").reset();
//           fetchProducts(); // Refresh the listings
//         })
//         .catch(error => {
//           console.error("Error adding product:", error);
//           alert("Failed to add product. Please try again.");
//         });
//       });
//     }
// });


//   // Fetch products
//   function fetchProducts() {
//     fetch(PRODUCTS_API, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-apikey": APIKEY,
//         "Cache-Control": "no-cache"
//       }
//     })
//     .then(response => response.json())
//     .then(products => {
//       const listingGrid = document.querySelector(".listing-grid");
//       listingGrid.innerHTML = ""; // Clear existing listings

//       if (products.length === 0) {
//         listingGrid.innerHTML = "<p>No products listed yet.</p>";
//       } else {
//         products.forEach(product => {
//           let productLink = document.createElement("a");
//           productLink.href = "#";
//           productLink.classList.add("listing");

//           productLink.innerHTML = `
//             <img src="${product.Image}" alt="${product.Name}" class="listing-img">
//             <div class="listing-user">
//               <img src="Images/default-profile.jpg" alt="User Profile" class="user-img">
//               <span class="user-id">${product["Lister Email"]}</span>
//               <span class="heart">❤️</span>
//             </div>
//             <p class="listing-name">${product.Name}</p>
//             <p class="listing-price">SGD ${product.Price} <span class="condition">${product.Condition}</span></p>
//           `;

//           listingGrid.appendChild(productLink);
//         });
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching products:", error);
//       productListContainer.innerHTML = "Failed to load products.";
//     });
//   }

//   // Fetch and display products when the page loads
//   if (loggedInUser) {
//     fetchProducts();
//   }
// });