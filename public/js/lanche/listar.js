document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btn-filtrar").addEventListener("click", filtrar);
    
    const btnsExcluir = document.querySelectorAll(".btn-exclusao");
    for (let btn of btnsExcluir) {
        btn.addEventListener("click", excluir);
    }

    function excluir() {
        const id = this.dataset.id;
        const nome = this.dataset.nome;
        if (confirm(`Deseja realmente excluir o lanche ${nome}?`)) {
            const that = this;
            fetch("/lanche/excluir/" + id, {
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

     function filtrar() {
  let termo = document.getElementById("inputBusca");

  fetch("/lanche/filtrar?termo=" + encodeURIComponent(termo.value))
    .then(resposta => resposta.json())
    .then(corpoResposta => {
      console.log(corpoResposta);

      const corpoTabela = document.getElementById("CorpoTabelaLanches");

      if (!corpoResposta.lista || corpoResposta.lista.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6">Nenhum lanche encontrado</td></tr>`;
        return;
      }

      let html = "";
      for (let lanche of corpoResposta.lista) {
        html += `
          <tr>
            <td>${lanche.id}</td>
            <td>
              ${lanche.foto 
                ? `<img src="/uploads/${lanche.foto}" alt="Foto do lanche" width="100">` 
                : `<span>Sem foto</span>`}
            </td>
            <td>${lanche.nome}</td>
            <td>${lanche.descricao}</td>
            <td>R$ ${parseFloat(lanche.preco).toFixed(2)}</td>
            <td>
              <button class="btn-exclusao" data-id="${lanche.id}" data-nome="${lanche.nome}">Excluir</button>
              <button class="btn-edicao" data-id="${lanche.id}">Editar</button>
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
            window.location.href = `/lanche/editar/${id}`;
          } else {
            alert("ID do lanche não encontrado!");
          }
        });
      });
    })
    .catch(erro => {
      console.error("Erro ao buscar lanches:", erro);
    });
}


});
