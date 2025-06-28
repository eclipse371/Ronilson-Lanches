document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btn-filtrar").addEventListener("click", filtrar);
    

     function filtrar() {
  let termo = document.getElementById("inputBusca");

  fetch("/pedido/filtrar?termo=" + encodeURIComponent(termo.value))
    .then(resposta => resposta.json())
    .then(corpoResposta => {
      console.log(corpoResposta);

      const corpoTabela = document.getElementById("CorpoTabelaPedido");

      if (!corpoResposta.lista || corpoResposta.lista.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="6">Nenhum pedido encontrado</td></tr>`;
        return;
      }

      let html = "";
      for (let pedido of corpoResposta.lista) {
        html += `
          <tr>
            <td>${pedido.id}</td>
            <td>${pedido.nome}</td>
            <td>${pedido.endereco}</td>
            <td>R$ ${parseFloat(pedido.preco).toFixed(2)}</td>
          </tr>
        `;
      }

      corpoTabela.innerHTML = html;
    })
    .catch(erro => {
      console.error("Erro ao buscar pedidos:", erro);
    });
}


});
