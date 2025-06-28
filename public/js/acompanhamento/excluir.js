document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-filtrar").addEventListener("click", filtrar);

    const btnsExcluir = document.querySelectorAll(".btn-exclusao");
    for (let btn of btnsExcluir) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {
        const id = this.dataset.id;
        const nome = this.dataset.nome;
        if (confirm(`Deseja realmente excluir o acompanhamento ${nome}?`)) {
            const that = this;
            fetch("/acompanhamento/excluir/" + id, {
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
                window.location.href = `/acompanhamento/editar/${id}`;
            } else {
                alert("ID do acompanhamento não encontrado!");
            }
        });
    }

     function filtrar() {
  let termo = document.getElementById("inputBusca");

  fetch("/acompanhamento/filtrar?termo=" + encodeURIComponent(termo.value))
    .then(resposta => resposta.json())
    .then(corpoResposta => {
      console.log(corpoResposta);

      const corpoTabela = document.getElementById("CorpoTabelaAcompanha");

      if (!corpoResposta.lista || corpoResposta.lista.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6">Nenhum acompanhamento encontrado</td></tr>`;
        return;
      }

      let html = "";
      for (let acompanha of corpoResposta.lista) {
        html += `
          <tr>
            <td>${acompanha.id}</td>
            <td>${acompanha.nome}</td>
            <td>R$ ${parseFloat(acompanha.preco).toFixed(2)}</td>
            <td>
              <button class="btn-exclusao" data-id="${acompanha.id}" data-nome="${acompanha.nome}">Excluir</button>
              <button class="btn-edicao" data-id="${acompanha.id}">Editar</button>
            </td>
          </tr>
        `;
      }

      corpoTabela.innerHTML = html;

      // Reaplica eventos aos novos botões
      document.querySelectorAll(".btn-exclusao").forEach(btn => {
        btn.addEventListener("click", excluir);
      });

      document.querySelectorAll(".btn-edicao").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (id) {
            window.location.href = `/acompanhamento/editar/${id}`;
          } else {
            alert("ID do acompanhamento não encontrado!");
          }
        });
      });
    })
    .catch(erro => {
      console.error("Erro ao buscar acompanhamentos:", erro);
    });
}

});
