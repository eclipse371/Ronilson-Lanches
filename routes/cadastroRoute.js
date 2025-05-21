const express = require("express")
const cadastroController = require("../controller/cadastroController")


const cadastroRouter = express.Router()

let ctrl = new cadastroController

cadastroRouter.get("/", ctrl.cadastroView);
cadastroRouter.post('/', ctrl.cadastroLanche);


module.exports = cadastroRouter
