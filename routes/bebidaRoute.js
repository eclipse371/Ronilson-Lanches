const express = require("express")
const bebidaController = require("../controller/bebidaController");
const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");


const bebidaRouter = express.Router()

let ctrl = new bebidaController
let auth = new autenticacaoMiddleware();


bebidaRouter.get("/lista", auth.validar, ctrl.listarView);
bebidaRouter.get('/cadastro',auth.validar, ctrl.cadastroView);
bebidaRouter.post('/cadastro', auth.validar, ctrl.cadastro);
bebidaRouter.get('/excluir/:id', auth.validar, ctrl.excluir)
bebidaRouter.get("/editar/:id", auth.validar, ctrl.editarView);
bebidaRouter.post("/editar/:id", auth.validar, ctrl.alterar);
bebidaRouter.get("/filtrar", auth.validar, ctrl.filtrarBebida);



module.exports = bebidaRouter
