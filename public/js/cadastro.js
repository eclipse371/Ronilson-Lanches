document.addEventListener("DOMContentLoaded", function() {
    const btnCadastrar = document.getElementById("btn-cadastrar");
    btnCadastrar.addEventListener("click", cadastrar);

    function cadastrar() {
        let inputNome = document.getElementById("nome");
        let inputDescricao = document.getElementById("descricao");
        let inputPreco = document.getElementById("preco");

        let obj = {
            nome: inputNome.value,
            descricao: inputDescricao.value,
            preco: inputPreco.value
        };

        fetch('/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(corpoResposta) {
            if (corpoResposta.ok) {
                alert(corpoResposta.msg);
                location.reload();
            } else {
                alert(corpoResposta.msg);
            }
        })
        .catch(function(erro) {
            console.error("Erro na requisição:", erro);
            alert("Erro na requisição!");
        });
    }
});
