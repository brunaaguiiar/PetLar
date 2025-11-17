const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("user-name").innerText = user.nome;
}
