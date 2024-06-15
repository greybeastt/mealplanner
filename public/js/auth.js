document.getElementById("login-form").addEventListener("submit", login);

const login = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const response = await fetch("/admin/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error);
      // Handle error response
      alert("Login failed!");
      return;
    }

    const responseObject = await response.json();
    if (!responseObject.token) {
      alert("TOKEN error");
      return;
    }

    localStorage.setItem("token", responseObject.token);
    window.location.replace("/meals.html");
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error occurred.");
  }
};
