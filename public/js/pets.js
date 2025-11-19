async function carregarPets() {
    const container = document.querySelector(".pets-container");

    container.innerHTML = "<p>Carregando pets...</p>";

    const resposta = await fetch("/api/pets");
    const pets = await resposta.json();

    if (pets.length === 0) {
        container.innerHTML = "<h2>Nenhum pet cadastrado ainda 😿</h2>";
        return;
    }

    container.innerHTML = "";

    pets.forEach(pet => {
        const card = `
        <div class="card-pet" onclick="location.href='/pet?id=${pet.id}'">
            <img src="${pet.imagem}" class="pet-img">
            <div class="pet-info">
                <h3>${pet.nome}</h3>
                <p>💚 ${pet.idade} • ${pet.sexo}</p>
                <p class="desc">${pet.descricao}</p>
                <button class="btn-ver">Quero Adotar</button>
            </div>
        </div>`;

        container.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", carregarPets);

