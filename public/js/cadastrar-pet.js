document.getElementById("formCadastrarPet").addEventListener("submit", async (e) => {
    e.preventDefault();

    const pet = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        sexo: document.getElementById("sexo").value,
        descricao: document.getElementById("descricao").value,
        imagem: document.getElementById("imagem").value
    };

    try {
        const resposta = await fetch("/api/pets/pets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pet)
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert("Pet cadastrado com sucesso!");
            window.location.href = "/pets";
        } else {
            alert("Erro no cadastro: " + dados.error);
        }
    } catch (error) {
        console.error("ERRO FETCH:", error);
        alert("Erro inesperado no servidor.");
    }
});
