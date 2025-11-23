document.addEventListener("DOMContentLoaded", () => {
    const userArea = document.getElementById("userArea");
    const userName = document.getElementById("user-name");

    const loginBtn = document.getElementById("loginBtn");
    const cadastroBtn = document.getElementById("cadastroBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        
        userArea.style.display = "flex";
        userName.textContent = user.nome || user.email;

        loginBtn.style.display = "none";
        cadastroBtn.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
    
        userArea.style.display = "none";

        loginBtn.style.display = "block";
        cadastroBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }


    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.reload(); 
    });
});
