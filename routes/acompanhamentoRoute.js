const express = require("express");
const acompanhamentoController = require("../controller/acompanhaController");
const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");


const AcompanhaRouter = express.Router();


let ctrl = new acompanhamentoController
let auth = new autenticacaoMiddleware();


AcompanhaRouter.get('/lista', auth.validar, ctrl.listarView);
AcompanhaRouter.get('/cadastro', auth.validar, ctrl.cadastroView);
AcompanhaRouter.post('/cadastro', auth.validar, ctrl.cadastro);
AcompanhaRouter.get("/excluir/:id", auth.validar, ctrl.excluir);
AcompanhaRouter.get("/editar/:id", auth.validar, ctrl.editarView);
AcompanhaRouter.post("/editar/:id", auth.validar,ctrl.alterar);
AcompanhaRouter.get("/filtrar", auth.validar, ctrl.filtrarAcompanhamento)

module.exports = AcompanhaRouter;