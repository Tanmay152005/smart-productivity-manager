// auth-guard.js – protect inner pages if user is not logged in
(function () {
  const publicPages = ["", "index.html", "login.html", "register.html"];
  const path = window.location.pathname;
  const current = path.substring(path.lastIndexOf("/") + 1);

  if (!publicPages.includes(current)) {
    const currentUser = localStorage.getItem("fpCurrentUser");
    if (!currentUser) {
      window.location.href = "login.html";
    }
  }
})();
