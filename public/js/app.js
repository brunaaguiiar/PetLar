console.log("Frontend JS carregado!");

const form = document.querySelector("form");

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    cadastrarUsuario(nome, email, senha);
  });
}

//função para cadastrar
function cadastrarUsuario(nome, email, senha) {
  fetch('/api/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha})
  })
  .then(() => {
    if (form) form.reset();
    carregarUsuarios();
  });
}
