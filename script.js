// API Base URL
const API_URL = "";

// Navigation Tabs
const mainTab = document.getElementById("main-tab");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");

const mainPage = document.getElementById("main-page");
const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");

mainTab.addEventListener("click", () => switchSection(mainPage, mainTab));
loginTab.addEventListener("click", () => switchSection(loginPage, loginTab));
registerTab.addEventListener("click", () => switchSection(registerPage, registerTab));

function switchSection(section, tab) {
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  document.querySelectorAll("nav a").forEach((t) => t.classList.remove("active"));
  section.classList.add("active");
  tab.classList.add("active");
}

// Fetch and display main page content
async function fetchMainPageContent() {
  try {
    const response = await fetch(`${API_URL}/main`);
    const data = await response.json();
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = data.items
      .map((item) => `<p>${item.name} - ${item.price}</p>`)
      .join("");
  } catch (error) {
    console.error("Failed to fetch main page content:", error);
  }
}

fetchMainPageContent();

// Handle Login
async function handleLogin() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data.success) {
      alert("Login successful!");
      switchSection(mainPage, mainTab); // Go to main page
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
}

// Handle Register
async function handleRegister() {
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    });
    const data = await response.json();

    if (data.success) {
      alert("Registration successful!");
      switchSection(loginPage, loginTab); // Go to login page
    } else {
      alert("Registration failed: " + data.message);
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred while registering.");
  }
}
