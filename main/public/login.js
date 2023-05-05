// Get the form element by its id
let loginForm = document.getElementById("loginForm");

// Add an event listener for the submit event on the loginForm
loginForm.addEventListener("submit", async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the email and password input values
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Send a POST request to the /api/user/login endpoint with the email and password
  const pro = await fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  // Get the response JSON
  const promise = await pro.json();

  // Log the response to the console
  console.log(promise);

  // If the response indicates unsuccessful authentication
  if (!promise.success) {
    console.log(promise);
    alert("Please enter correct username password")
    // Set the innerText of the element with id "m" to "Invalid credentials"
    document.getElementById("m").innerText = "Invalid credentials";
    return;
  }

  // If the authentication is successful, store the auth_token in local storage
  localStorage.setItem("auth_token", promise.token);
  // Show an alert indicating successful authentication
  alert("You are authenticated, Welcome " + email);

  // Redirect the user to the homepage
  window.location.href = "/";
});
