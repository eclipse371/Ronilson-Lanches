const bebidaModel = require("../models/bebidaModel");

class bebidaController{
   async listarView(req, resp) {
    let bebida = new bebidaModel();
    let listaBebidas = await bebida.listar();
    resp.render('bebidas/listar', { bebidas: listaBebidas, scripts: ["/js/bebida/excluir.js"] });
  }

  cadastroView(req, resp) {
  resp.render("bebidas/cadastro", {
    title: "Cadastrar Bebida",
    scripts: ["/js/bebida/cadastro.js"]
  });
}


     async cadastro(req, resp) {
        if (req.body.nome  && req.body.preco) {
            let preco = parseFloat(req.body.preco);
            
            // Valida se o preço é um número válido
            if (isNaN(preco) || preco <= 0) {
                return resp.send({
                    ok: false,
                    msg: "O preço deve ser um número válido maior que zero!"  
                });
            }

            // Criação do objeto lanche
            let bebida = new bebidaModel();
            bebida.nome = req.body.nome;
            bebida.preco = preco;

            let ok = await bebida.gravar();

            if (ok) {
                resp.send({
                    ok: true,
                    msg: "Bebida cadastrada com sucesso!"  
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao inserir o bebida no banco de dados!"  
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "As informações da bebida estão incompletas!"  
            });
        }
    }    

    async excluir(req, resp) {
    const id = req.params.id;
    const bebida = new bebidaModel();
    const resultado = await bebida.excluir(id);

    let msg = "";

    if (resultado) {
      msg = "Bebida excluida com sucesso!";
    } else {
      msg = "Não foi possível excluir a bebida!";
    }

    resp.json({
      ok: resultado,
      msg: msg
    });
  }


  async editarView(req, resp) {
    const id = req.params.id;
    const bebida = new bebidaModel();
    const bebidaEditada = await bebida.obter(id);

    if (!bebidaEditada) {
      return resp.status(404).json({ msg: "bebida não encontrada" });
    }

    resp.render('bebidas/editar.ejs', { bebida: bebidaEditada, scripts: ["/js/bebida/editar.js"] });
  }

  async alterar(req, resp) {
    try {
      const id = req.params.id;
      const { nome, preco } = req.body;

      const bebida = new bebidaModel(id, nome, preco);
      const resultado = await bebida.alterar();

      if (resultado) {
        resp.json({ ok: true, msg: "Bebida atualizada com sucesso!" });
      } else {
        resp.status(404).json({ ok: false, msg: "Não foi possível atualizar a bebida." });
      }
    } catch (error) {
      resp.status(500).json({ ok: false, msg: "Erro: " + error.message });
    }
  }

    async filtrarBebida(req, res) {
        let bebida = new bebidaModel();
        let listaBebidas = await bebida.filtrar(req.query.termo);
        res.send({lista: listaBebidas});
    }

}

module.exports = bebidaController