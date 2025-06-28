const express = require("express");
const LancheController = require("../controller/lancheController");
const upload = require("../middlewares/upload");
const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");

const lancheRouter = express.Router();

let ctrl = new LancheController();
let auth = new autenticacaoMiddleware();

lancheRouter.get("/cadastro", auth.validar, ctrl.cadastroView);
lancheRouter.post("/cadastro", auth.validar, upload.single('foto'), ctrl.cadastroLanche);
lancheRouter.get("/lista", auth.validar, ctrl.listarView);
lancheRouter.get("/excluir/:id", auth.validar, ctrl.excluir);
lancheRouter.get("/editar/:id", auth.validar, ctrl.editarView);
lancheRouter.post("/editar/:id", auth.validar, ctrl.alterar);
lancheRouter.get("/filtrar", auth.validar, ctrl.filtrarLanche);

module.exports = lancheRouter;
