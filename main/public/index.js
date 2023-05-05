// Login HTML template
const login =
  '<button id="logout">Logout</button><input type="text" id="add-item" /> <p id="email"> ';
// Logout HTML template
const logout =
  '<a href="/register.html">Register</a> <a href="/login.html">Login</a>';

// Get the div element from the HTML
const div = document.getElementById("div");

// Get the auth_token from local storage
const token = localStorage.getItem("auth_token");
if (!token) {
  // If there's no token, do nothing
} else {
  // If there's a token, set the innerHTML of the div to the login template
  div.innerHTML = login;

  // An Immediately Invoked Function Expression (IIFE) to fetch user details
  (async () => {
    const aaa = await fetch('/api/private', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        token: token
      })
    })

    // Get the response JSON
    const res = await aaa.json()
    console.log(res)
    // Set the innerText of the email paragraph to the email from the response
    document.getElementById('email').innerText = res.email

    // Logout button click event handler
    document.getElementById('logout').onclick = () => {
      // Remove auth_token from local storage
      localStorage.removeItem('auth_token')
      // Redirect to the homepage
      let a = document.createElement("a");
      a.setAttribute("href", "/");
      a.click();
    }

    // Add an event listener for the keyup event on the add-item input
    document.getElementById('add-item').addEventListener("keyup", async (event) => {
      // If the key pressed is Enter
      if (event.key === "Enter") {
        // Send a POST request to the /api/todos endpoint with the new item
        const pro = await fetch("/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            items: document.getElementById("add-item").value,
          }),
        });

        // Get the response JSON
        const res = await pro.json();
        // Clear the items list
        document.getElementById('items').innerHTML = ''
        // Create a new list item and set its innerText to the item from the response
        let todo = document.createElement('li')
        todo.innerText = res.items
        // Append the new item to the items list
        document.getElementById('items').appendChild(todo)
      }
    });
  })()
}
