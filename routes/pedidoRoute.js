const express = require("express");
const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");
const PedidoController = require("../controller/pedidoController");

const pedidoRouter = express.Router();

let ctrl = new PedidoController();
let auth = new autenticacaoMiddleware();

pedidoRouter.get("/", auth.validar, ctrl.listarView);
pedidoRouter.get("/filtrar", auth.validar, ctrl.filtrarPedido);


module.exports = pedidoRouter;
