// auth.js – localStorage based auth for FocusPilot

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("fpUsers")) || [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("fpUsers", JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem("fpCurrentUser", JSON.stringify({ name: user.name, email: user.email }));
}

function logout() {
  localStorage.removeItem("fpCurrentUser");
  window.location.href = "index.html";
}
window.logout = logout;
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const errorEl = document.getElementById("registerError");

      errorEl.textContent = "";

      if (!name || !email || !password) {
        errorEl.textContent = "Please fill in all fields.";
        return;
      }

      if (password.length < 6) {
        errorEl.textContent = "Password should be at least 6 characters.";
        return;
      }

      const users = getUsers();
      const existing = users.find((u) => u.email === email);
      if (existing) {
        errorEl.textContent = "An account with this email already exists. Try logging in instead.";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser);
      window.location.href = "dashboard.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const errorEl = document.getElementById("loginError");

      errorEl.textContent = "";

      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        errorEl.textContent = "Invalid email or password.";
        return;
      }

      setCurrentUser(user);
      window.location.href = "dashboard.html";
    });
  }
});
