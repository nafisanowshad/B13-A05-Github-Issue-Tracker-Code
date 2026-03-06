const handleLogin = () => {
  const userInput = document.getElementById("user").value;
  const passInput = document.getElementById("pass").value;

  if (userInput === "admin" && passInput === "admin123") {
    // alert("Login Successful.");
    window.location.href = "all.html";
  }
   else {
    alert("Invalid username or password!");
    return;
  }
};
