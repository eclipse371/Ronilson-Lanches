document.addEventListener("DOMContentLoaded", function () {

  
  // Recupera carrinho salvo ou cria vazio
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Atualiza contador no botão
  function atualizarContador() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const contador = document.getElementById("contadorItens");
    if (contador) contador.textContent = totalItens;
  }

  // Salva carrinho no localStorage
  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  // Adiciona item ao carrinho
  function adicionarAoCarrinho(produto) {
    const existente = carrinho.find((item) => item.id === produto.id);
    if (existente) {
      existente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
    salvarCarrinho();
    atualizarContador();
    alert(`"${produto.nome}" adicionado ao pedido.`);
  }

  // Atualiza quantidade de um item do carrinho
  window.atualizarQuantidade = function (id, novaQuantidade) {
    const item = carrinho.find((i) => i.id === id);
    if (!item) return;
    item.quantidade = novaQuantidade;
    if (item.quantidade <= 0) {
      const index = carrinho.findIndex((i) => i.id === id);
      carrinho.splice(index, 1);
    }
    salvarCarrinho();
    atualizarContador();
    preencherModal();
  };

  function cadastrarPedido() {
  let inputNome = document.getElementById("nome");
  let inputEndereco = document.getElementById("endereco");
  let totalSpan = document.getElementById("TotalPedido"); // corrigido aqui

  if (!inputNome || !inputEndereco) {
    alert("Campos de nome e endereço são obrigatórios.");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu pedido está vazio.");
    return;
  }

  let precoTotal = 0;
  if (totalSpan) {
    precoTotal = parseFloat(totalSpan.textContent.replace(",", "."));
    if (isNaN(precoTotal)) precoTotal = 0;
  } else {
    console.warn("Elemento #totalPedido não encontrado.");
    return;
  }

  const pedido = {
    nome: inputNome.value.trim(),
    endereco: inputEndereco.value.trim(),
    preco: precoTotal,
   itens: carrinho.map(item => ({
  produtoId: item.id,       // ajuste para o backend reconhecer
  tipo: item.tipo || "lanche", // você pode definir um valor padrão, caso não tenha
  quantidade: item.quantidade,
  preco: parseFloat(item.preco)
}))

  };

  fetch('/pedido', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pedido)
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      alert(data.msg || "Pedido cadastrado com sucesso!");
      localStorage.removeItem("carrinho");
      atualizarContador();
      preencherModal();
      inputNome.value = "";
      inputEndereco.value = "";
      modalPedido.hide();
    } else {
      alert(data.msg || "Erro ao cadastrar pedido.");
    }
  })
  .catch(err => {
    console.error("Erro ao enviar pedido:", err);
    alert("Erro na requisição.");
  });
}


  // Preenche o modal com itens do carrinho
  function preencherModal() {
    const lista = document.getElementById("listaPedidos");
    if (!lista) return;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
      lista.innerHTML = "<p>Seu pedido está vazio.</p>";
      document.getElementById("totalPedido").textContent = "0.00";
      return;
    }

    let total = 0;

    carrinho.forEach((item) => {
      total += item.quantidade * parseFloat(item.preco);
      const itemDiv = document.createElement("div");
      itemDiv.className = "d-flex justify-content-between align-items-center mb-2";

      itemDiv.innerHTML = `
        <div><strong>${item.nome}</strong></div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="atualizarQuantidade('${item.id}', ${item.quantidade - 1})">-</button>
          <input type="text" class="form-control form-control-sm text-center" style="width: 50px;" readonly value="${item.quantidade}" />
          <button class="btn btn-outline-secondary btn-sm" onclick="atualizarQuantidade('${item.id}', ${item.quantidade + 1})">+</button>
        </div>
        <div>R$ ${(item.quantidade * parseFloat(item.preco)).toFixed(2)}</div>
      `;
      lista.appendChild(itemDiv);
    });

    document.getElementById("TotalPedido").textContent = total.toFixed(2);
  }

  // Evento para abrir modal e preencher pedido
  const modalPedido = new bootstrap.Modal(document.getElementById("modalPedido"));
  const btnAbrirPedido = document.getElementById("btnAbrirPedido");
  if (btnAbrirPedido) {
    btnAbrirPedido.addEventListener("click", () => {
      preencherModal();
      modalPedido.show();
    });
  }

  // Evento para adicionar itens
  document.querySelectorAll(".btn-adicionar").forEach((botao) => {
    botao.addEventListener("click", () => {
      const produto = {
        id: botao.getAttribute("data-id"),
        nome: botao.getAttribute("data-nome"),
        preco: botao.getAttribute("data-preco"),
        tipo: botao.getAttribute('data-tipo')
      };
      adicionarAoCarrinho(produto);
    });
  });

  // Submissão do pedido
  const form = document.getElementById("formPedido");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Chama a função que envia o pedido para o backend
    cadastrarPedido();
  });
}

  // Atualiza contador inicial
  atualizarContador();
});
