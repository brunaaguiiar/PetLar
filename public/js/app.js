console.log("Frontend JS carregado!");

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Cadastro realizado com sucesso!");
        window.location.href = "/login";
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar ao servidor.");
    }
  });
}
