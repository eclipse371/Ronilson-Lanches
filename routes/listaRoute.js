const express = require("express");
const listaController = require("../controller/listaController");

const listaRouter = express.Router();

let ctrl = new listaController

listaRouter.get("/", ctrl.listarView)
listaRouter.get("/excluir/:id", ctrl.excluir);
listaRouter.get("/editar/:id", ctrl.editarView);
listaRouter.post("/editar/:id", ctrl.alterar);


module.exports = listaRouter

