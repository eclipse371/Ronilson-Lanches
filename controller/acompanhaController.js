const acompanhamentoModel = require("../models/acompanhamentoModel");


class acompanhamentoController{
     
   async listarView(req, resp) {
  let model = new acompanhamentoModel();
  let listaAcompanha = await model.listar();
  resp.render('acompanhamento/lista.ejs', { 
    acompanhamentos: listaAcompanha,
    scripts: ["/js/acompanhamento/excluir.js"] // se precisar de algum script específico
  });
}


   cadastroView(req, resp) {
  resp.render("acompanhamento/cadastro", {
    title: "Cadastrar Acompanhamento",
    scripts: ["/js/acompanhamento/cadastro.js"]
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
            let acompanhamento = new acompanhamentoModel();
            acompanhamento.nome = req.body.nome;
            acompanhamento.preco = preco;

            let ok = await acompanhamento.gravar();

            if (ok) {
                resp.send({
                    ok: true,
                    msg: "Acompanhamento cadastrado com sucesso!"  
                });
            } else {
                resp.send({
                    ok: false,
                    msg: "Erro ao inserir o acompanhamento no banco de dados!"  
                });
            }
        } else {
            resp.send({
                ok: false,
                msg: "As informações do acompanamento estão incompletas!"  
            });
        }
    }    

    async excluir(req, resp) {
    const id = req.params.id;
    const acompanhamento = new acompanhamentoModel();
    const resultado = await acompanhamento.excluir(id);

    let msg = "";

    if (resultado) {
      msg = "Acompanhamento excluído com sucesso!";
    } else {
      msg = "Não foi possível excluir o acompanhamento!";
    }

    resp.json({
      ok: resultado,
      msg: msg
    });
  }

  async editarView(req, resp) {
    const id = req.params.id;
    const acompanhamento = new acompanhamentoModel();
    const acompanhamentoEditado = await acompanhamento.obter(id);

    if (!acompanhamentoEditado) {
      return resp.status(404).json({ msg: "Acompanhamento não encontrado" });
    }

    resp.render('acompanhamento/editar.ejs', { acompanhamento: acompanhamentoEditado, scripts: ["/js/acompanhamento/editar.js"] });
  }

  async alterar(req, resp) {
    try {
      const id = req.params.id;
      const { nome, preco } = req.body;

      const acompanhamento = new acompanhamentoModel(id, nome, preco);
      const resultado = await acompanhamento.alterar();

      if (resultado) {
        resp.json({ ok: true, msg: "Acompanhamento atualizado com sucesso!" });
      } else {
        resp.status(404).json({ ok: false, msg: "Não foi possível atualizar o acompanhamento." });
      }
    } catch (error) {
      resp.status(500).json({ ok: false, msg: "Erro: " + error.message });
    }
  }

  async filtrarAcompanhamento(req, res) {
        let acompanha = new acompanhamentoModel();
        let listaAcompanha = await acompanha.filtrar(req.query.termo);
        res.send({lista: listaAcompanha});
    }
}

module.exports = acompanhamentoController