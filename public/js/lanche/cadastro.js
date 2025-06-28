document.addEventListener("DOMContentLoaded", function() {
    const btnCadastrar = document.getElementById("btn-cadastrar");
    btnCadastrar.addEventListener("click", cadastrar);

    function cadastrar() {
        const inputNome = document.getElementById("nome");
        const inputDescricao = document.getElementById("descricao");
        const inputPreco = document.getElementById("preco");
        const inputFoto = document.getElementById("foto");

        if (!inputFoto) {
  console.error("Input 'foto' não encontrado no DOM");
  return;
}

        // Cria o FormData e adiciona os campos
        const formData = new FormData();
        formData.append("nome", inputNome.value);
        formData.append("descricao", inputDescricao.value);
        formData.append("preco", inputPreco.value);

        // Adiciona a imagem, se houver
        if (inputFoto.files.length > 0) {
            formData.append("foto", inputFoto.files[0]);
        }

        fetch('/lanche/cadastro', {
            method: "POST",
            body: formData // sem headers aqui
        })
        .then(res => res.json())
        .then(res => {
            if (res.ok) {
                alert(res.msg);
                location.reload();
            } else {
                alert(res.msg);
            }
        })
        .catch(err => {
            console.error("Erro na requisição:", err);
            alert("Erro na requisição!");
        });
    }
});
