async function carregarPet() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const resposta = await fetch(`/api/pets/${id}`);
    const pet = await resposta.json();

    const div = document.getElementById("petInfo");

    div.innerHTML = `
        <div class="pet-detalhes">
            <img src="${pet.imagem}" class="pet-img-grande">

            <div class="infos">
                <h1>${pet.nome}</h1>

                <p><b>Idade:</b> ${pet.idade}</p>
                <p><b>Sexo:</b> ${pet.sexo}</p>
                <p><b>Descrição:</b> ${pet.descricao}</p>

                <br>

                <button onclick="editar(${pet.id})" class="btn verde">Editar</button>
                <button onclick="excluir(${pet.id})" class="btn vermelho">Excluir</button>
            </div>
        </div>
    `;
}

function editar(id) {
    window.location.href = `/edit-pet?id=${id}`;
}

async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir este pet?")) return;

    const resposta = await fetch(`/api/pets/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        alert("Pet removido com sucesso!");
        window.location.href = "/pets";
    } else {
        alert("Erro ao remover pet.");
    }
}

document.addEventListener("DOMContentLoaded", carregarPet);
