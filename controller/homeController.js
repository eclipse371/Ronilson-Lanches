const acompanhamentoModel = require("../models/acompanhamentoModel");
const bebidaModel = require("../models/bebidaModel");
const lancheModel = require("../models/lancheModel");
const pedidoItemModel = require("../models/pedidoItemModel");
const pedidoModel = require("../models/pedidoModel");

class HomeController{
  async loginView(req, resp){
    resp.render('login.ejs', {layout: false, retorno: null})
  }

  async login(req, res) {
  const { usuario, password } = req.body;

  // Aqui você faria a validação do usuário (sem banco, por exemplo)
  if (usuario === "admin" && password === "1234") {
    res.cookie("usuarioLogado", "admin", {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });
    return res.redirect("/lanche/lista");  // redireciona para rota protegida
  } else {
    const msg = "Usuário ou senha incorretos.";
    return res.render("login", { layout: false, retorno: msg });
  }
}

  async LancheView(req, res) {
    const lanche = new lancheModel
    const listaLanches = await lanche.listar();

    res.render("home/lanche.ejs", { lanches: listaLanches});
  }

  async BebidaView(req, res) {
    const bebida = new bebidaModel
    const listaBebidas = await bebida.listar();

    res.render("home/bebida.ejs", { bebidas: listaBebidas });
  }

  async AcompanhamentoView(req, res) {
    const acompanhamento = new acompanhamentoModel
    const listaAcompanha = await acompanhamento.listar();

    res.render("home/acompanhamento.ejs", { acompanhamentos: listaAcompanha });
  }

async criarPedido(req, res) {
  const { nome, endereco, itens, preco } = req.body;

  try {
    const pedido = new pedidoModel(null, nome, endereco, preco);
    await pedido.gravar();

    const pedidoId = pedido.id; // pega o id gerado após o insert
    console.log('Pedido ID gerado:', pedidoId); // coloque um log para verificar


    for (const item of itens) {
      const pedidoItem = new pedidoItemModel(pedidoId, item.produtoId, item.tipo, item.quantidade, item.preco);
      await pedidoItem.gravar();
    }

    res.status(201).json({ ok: true, msg: "Pedido criado com sucesso!", pedidoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Erro ao criar pedido" });
  }
}


}

module.exports = HomeController