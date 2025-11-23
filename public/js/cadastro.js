console.log("Frontend JS carregado!");

const form = document.getElementById("user-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    cadastrarUsuario(nome, email, senha);
  });
}

function cadastrarUsuario(nome, email, senha) {
  fetch("/api/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Resposta da API:", data);

      alert("Usuário cadastrado com sucesso!");

      window.location.href = "/login";

      form.reset();
    })
    .catch((err) => console.error("Erro:", err));
}
