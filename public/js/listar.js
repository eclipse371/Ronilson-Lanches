document.addEventListener("DOMContentLoaded", function () {
    
    const btnsExcluir = document.querySelectorAll(".btn-exclusao");
    for (let btn of btnsExcluir) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {
        const id = this.dataset.id;
        const nome = this.dataset.nome;
        if (confirm(`Deseja realmente excluir o lanche ${nome}?`)) {
            const that = this;
            fetch("/lista/excluir/" + id, {
                method: "GET"
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.msg);
                if (dados.ok) {
                    that.parentElement.parentElement.remove();
                }
            }).catch((erro) => {
                console.log(erro);
            });
        }
    }

    const btnsEditar = document.querySelectorAll(".btn-edicao");
    for (let btn of btnsEditar) {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            if (id) {
                window.location.href = `/lista/editar/${id}`;
            } else {
                alert("ID do lanche não encontrado!");
            }
        });
    }

});
