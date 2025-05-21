const lancheModel = require("../models/lancheModel");

class listaController {

  async listarView(req, resp) {
    let model = new lancheModel();
    let listaLanches = await model.listar();
    resp.render('lista.ejs', { lanches: listaLanches });
  }

  async excluir(req, resp) {
    const id = req.params.id;
    const lanche = new lancheModel();
    const resultado = await lanche.excluir(id);

    let msg = "";

    if (resultado) {
      msg = "Lanche excluído com sucesso!";
    } else {
      msg = "Não foi possível excluir o lanche!";
    }

    resp.json({
      ok: resultado,
      msg: msg
    });
  }

  async editarView(req, resp) {
    const id = req.params.id;
    const lanche = new lancheModel();
    const lancheEditando = await lanche.obter(id);

    if (!lancheEditando) {
      return resp.status(404).json({ msg: "Lanche não encontrado" });
    }

    resp.render('editar.ejs', { lanche: lancheEditando });
  }

  async alterar(req, resp) {
    try {
      const id = req.params.id;
      const { nome, descricao, preco } = req.body;

      const lanche = new lancheModel(id, nome, descricao, preco);
      const resultado = await lanche.alterar();

      if (resultado) {
        resp.json({ ok: true, msg: "Lanche atualizado com sucesso!" });
      } else {
        resp.status(404).json({ ok: false, msg: "Não foi possível atualizar o lanche." });
      }
    } catch (error) {
      resp.status(500).json({ ok: false, msg: "Erro: " + error.message });
    }
  }

}

module.exports = listaController;
