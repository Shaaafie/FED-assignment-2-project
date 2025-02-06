// API Base URL
const API_URL = "https://example.com/api";

    const mainTab = document.getElementById('main-tab');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    const mainPage = document.getElementById('main-page');
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');

    mainTab.addEventListener('click', () => switchSection(mainPage, mainTab));
    loginTab.addEventListener('click', () => switchSection(loginPage, loginTab));
    registerTab.addEventListener('click', () => switchSection(registerPage, registerTab));

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

    function switchSection(section, tab) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('nav a').forEach(t => t.classList.remove('active'));
      section.classList.add('active');
      tab.classList.add('active');
    }

    function closeNotification() {
    const bar = document.getElementById("notificationBar");
    bar.classList.add("notification-hidden");

    // Wait for animation to finish, then remove it from the DOM
    setTimeout(() => {
        bar.style.display = "none";
        document.body.style.paddingTop = "0"; // Remove extra spacing
    }, 300);
}

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

    function closeNotification() {
      // Hide the notification bar when the close button is clicked
      document.getElementById("notificationBar").style.display = "none";
  }
  
  function closeNotification() {
    // Hide the notification bar when the close button is clicked
    document.getElementById("notificationBar").style.display = "none";
}

// Registration feature
async function handleRegister() {
    // Get the values from the input fields
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Simple form validation
    if (!name || !email || !username || !password) {
        alert("All fields are required!");
        return;
    }

    // Prepare the data to send to the API
    const registrationData = {
        name: name,
        email: email,
        username: username,
        password: password
    };

    try {
        // Send the data to the API using Fetch API (POST request)
        const response = await fetch('https://yourapi.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        // Parse the response as JSON
        const data = await response.json();

        // Handle the response based on success or failure
        if (response.ok) {
            // If registration was successful
            alert("Registration successful! Welcome, " + name);
            // Optionally, redirect to login or homepage
            window.location.href = 'login.html'; // Change this to where you want to redirect
        } else {
            // If registration failed
            alert("Error: " + data.message || "Something went wrong, please try again.");
        }
    } catch (error) {
        // Handle any errors during the fetch request (e.g., network issues)
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    }
}
     

    function toggleHelpForm() {
      const formContainer = document.getElementById("helpFormContainer");
      // Toggle the form visibility
      formContainer.style.display = (formContainer.style.display === "none" || formContainer.style.display === "") ? "block" : "none";
    }

    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent form submission (default behavior)

      // Clear previous error messages
      document.getElementById("nameError").textContent = '';
      document.getElementById("emailError").textContent = '';
      document.getElementById("descriptionError").textContent = '';
      document.getElementById("formSuccess").textContent = '';

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;

      let formIsValid = true;

      // Basic validation
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

      // If validation passes, show success message
      if (formIsValid) {
        document.getElementById("formSuccess").textContent = "Thank you for your submission. We will get back to you shortly!";
        
        // Optionally, simulate form submission with data logging
        console.log("Form Submitted", { name, email, category, description });
        
        // Optionally reset the form
        document.getElementById("helpForm").reset();
      }
    }