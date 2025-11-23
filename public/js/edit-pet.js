// pegar ID pela URL
const params = new URLSearchParams(window.location.search);
const petId = params.get("id");

if (!petId) {
    alert("ID do pet não informado!");
    window.location.href = "/pets";
}

async function carregarPet() {
    const res = await fetch(`/api/pets/${petId}`);
    const pet = await res.json();

    document.getElementById("nome").value = pet.nome;
    document.getElementById("idade").value = pet.idade;
    document.getElementById("sexo").value = pet.sexo;
    document.getElementById("descricao").value = pet.descricao;
    document.getElementById("imagem").value = pet.imagem;
}

document.addEventListener("DOMContentLoaded", carregarPet);


document.getElementById("form-editar-pet").addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        sexo: document.getElementById("sexo").value,
        descricao: document.getElementById("descricao").value,
        imagem: document.getElementById("imagem").value
    };

    const res = await fetch(`/api/pets/${petId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (res.ok) {
        alert("Pet atualizado com sucesso!");
        window.location.href = `/pet?id=${petId}`;
    } else {
        alert("Erro ao atualizar pet!");
    }
});


document.getElementById("btn-excluir").addEventListener("click", async () => {

    if (!confirm("Tem certeza que deseja excluir este pet?")) return;

    const res = await fetch(`/api/pets/${petId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Pet excluído!");
        window.location.href = "/pets";
    } else {
        alert("Erro ao excluir o pet!");
    }
});
