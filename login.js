document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const resultDiv = document.getElementById("result");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Inloggen succesvol!") {
          // Succesvol
          resultDiv.textContent = "Je bent ingelogd!";
          resultDiv.style.color = "green";
          // Eventueel sla je username op in localStorage of sessionStorage
          // localStorage.setItem("username", data.username);
        } else {
          resultDiv.textContent = data.message || "Inloggen mislukt.";
          resultDiv.style.color = "red";
        }
      })
      .catch((err) => {
        console.error(err);
        resultDiv.textContent = "Er ging iets mis bij inloggen.";
        resultDiv.style.color = "red";
      });
  });
});