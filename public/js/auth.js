document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const formjson = JSON.stringify(data);
    try {
      const response = await fetch("/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formjson,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        // Handle successful response
        alert("Login successful!");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        // Handle error response
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred.");
    }
  });
