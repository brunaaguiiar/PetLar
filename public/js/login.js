document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch("/api/users/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
    } else {
        alert(data.error);
    }
});

