document.addEventListener("DOMContentLoaded", function() {
    const btnEditar = document.getElementById("btn-editar");

    btnEditar.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o submit tradicional do form

        // Pega os valores dos inputs
        let inputNome = document.getElementById("nome");
        let inputPreco = document.getElementById("preco");

        // Monta o objeto com os dados a enviar
        let obj = {
            nome: inputNome.value,
            preco: inputPreco.value
        };

        // Pegue o ID do lanche - pode estar como atributo data no botão, ou em algum lugar do HTML
        // Exemplo: <button id="btn-editar" data-id="123">Salvar Alterações</button>
        const id = btnEditar.dataset.id; 

        if (!id) {
            alert("ID da bebida não encontrado!");
            return;
        }

        fetch(`/bebida/editar/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())  // transforma a resposta em JSON
        .then(corpoResposta => {
            if (corpoResposta.ok) {
                alert(corpoResposta.msg); 
            } else {
                alert(corpoResposta.msg);
            }
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
            alert("Erro na requisição!");
        });
    });
});
