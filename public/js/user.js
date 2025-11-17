const userArea = document.getElementById("userArea");
const userName = document.getElementById("user-name");
const userNameSpan = document.getElementById("user-name");
const loginBtn = document.getElementById("loginBtn");
const cadastroBtn = document.getElementById("cadastroBtn");
const logoutBtn = document.getElementById("logoutBtn");

const user = JSON.parse(localStorage.getItem("user"));
// Verifica se tem usuário logado no localStorage
const usuarioLogado = localStorage.getItem("usuarioNome");

if (user) {
    userArea.style.display = "flex"; // exibe o ícone
    userName.textContent = user.nome; // mostra o nome
} else {
    userArea.style.display = "none"; // oculta quando não logado
}


if (usuarioLogado) {
    // Mostrar área do usuário
    userArea.style.display = "flex";
    userNameSpan.textContent = usuarioLogado;

    // Mostrar logout
    logoutBtn.style.display = "block";

    // Esconder login e cadastro
    loginBtn.style.display = "none";
    cadastroBtn.style.display = "none";
} else {
    // Não logado → esconder userArea e logout
    userArea.style.display = "none";
    logoutBtn.style.display = "none";

    // Mostrar login e cadastro
    loginBtn.style.display = "block";
    cadastroBtn.style.display = "block";
}

// Função do botão Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioNome");
    window.location.reload(); // recarrega a página
});