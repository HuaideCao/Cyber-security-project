
let registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (event) => {
  
  event.preventDefault();

 
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  
  const res = await fetch("/api/user/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

 
  const response = await res.json();

  
  if (!response.success) {
    alert(response);
    document.getElementById("m").innerText = JSON.stringify(response);
  } else {
    alert("Registration Successful");

    
    window.location.href = "/login.html";
  }
});
