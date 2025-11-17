async function carregarPet() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const resposta = await fetch("/api/pets/" + id);
    const pet = await resposta.json();

    const container = document.getElementById("petContainer");

    container.innerHTML = `
        <img src="${pet.imagem}">
        <h1>${pet.nome}</h1>
        <p><strong>Idade:</strong> ${pet.idade}</p>
        <p><strong>Sexo:</strong> ${pet.sexo}</p>
        <p>${pet.descricao}</p>

        <button class="btn verde">Quero Adotar</button>
    `;
}

carregarPet();
