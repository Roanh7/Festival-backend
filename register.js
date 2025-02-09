document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const registerResult = document.getElementById("registerResult");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    // PAS HIER ONDERSTAANDE URL AAN NAAR JE EIGEN BACKEND-URL
    // (lokaal: http://localhost:4000/api/register
    //  of online: https://jouw-backend-naam.onrender.com/api/register)
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          registerResult.textContent = data.message;
          registerResult.style.color = "green";
        } else {
          registerResult.textContent = "Onbekende response";
          registerResult.style.color = "red";
        }
      })
      .catch((err) => {
        console.error(err);
        registerResult.textContent = "Er ging iets mis bij registreren.";
        registerResult.style.color = "red";
      });
  });
});