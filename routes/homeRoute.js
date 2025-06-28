const express = require("express");
const HomeController = require("../controller/homeController");


const HomeRouter = express.Router()


let ctrl = new HomeController

HomeRouter.post('/', ctrl.login);
HomeRouter.get('/', ctrl.loginView);
HomeRouter.get('/lanche', ctrl.LancheView);
HomeRouter.get('/bebida', ctrl.BebidaView);
HomeRouter.get('/acompanhamento', ctrl.AcompanhamentoView);
HomeRouter.post('/pedido', ctrl.criarPedido);

HomeRouter.get('/logout', (req, res) => {
  res.clearCookie('usuarioLogado'); // Remove o cookie do navegador
  res.redirect('/'); // Redireciona para a página de login ou inicial
});


module.exports = HomeRouter;