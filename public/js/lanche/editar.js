document.addEventListener("DOMContentLoaded", function() {
    const btnEditar = document.getElementById("btn-editar");

    btnEditar.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o submit tradicional do form

        const inputNome = document.getElementById("nome");
        const inputDescricao = document.getElementById("descricao");
        const inputPreco = document.getElementById("preco");
        const inputFoto = document.getElementById("foto"); // Novo input de imagem

        const id = btnEditar.dataset.id;
        if (!id) {
            alert("ID do lanche não encontrado!");
            return;
        }

        // Usa FormData para permitir envio da imagem + dados
        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("preco", inputPreco.value);

        if (inputFoto.files.length > 0) {
            formData.append("foto", inputFoto.files[0]);
        }

        fetch(`/lanche/editar/${id}`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(corpoResposta => {
            if (corpoResposta.ok) {
                alert(corpoResposta.msg);
                location.href = "/lanche/lista";
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
