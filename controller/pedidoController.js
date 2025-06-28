const pedidoModel = require("../models/pedidoModel");

class PedidoController{
     async listarView(req, resp) {
    let pedido = new pedidoModel();
    let listaPedidos = await pedido.listar();
    resp.render('pedido/lista.ejs', { lista: listaPedidos, scripts: ["/js/pedido/filtrar.js"] });
  }

  async filtrarPedido(req, res) {
        let pedido = new pedidoModel();
        let listaPedidos = await pedido.filtrar(req.query.termo);
        res.send({lista: listaPedidos});
    }

}

module.exports = PedidoController