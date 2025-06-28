const lancheModel = require("../models/lancheModel");

class LancheController {
    // Exibe a view de cadastro
    cadastroView(req, resp) {
        resp.render("lanche/cadastro.ejs",{scripts:
          ["/js/lanche/cadastro.js"]
        });
    }

    // Função para cadastrar o lanche
    async cadastroLanche(req, resp) {
    // Verifica se os campos obrigatórios estão presentes
    if (req.body.nome && req.body.descricao && req.body.preco) {
        let preco = parseFloat(req.body.preco);
        const foto = req.file ? req.file.filename : null; // Pega o nome do arquivo enviado via multer

        // Valida se o preço é um número válido
        if (isNaN(preco) || preco <= 0) {
            return resp.send({
                ok: false,
                msg: "O preço deve ser um número válido maior que zero!"
            });
        }

        // Cria o objeto lanche e define propriedades
        let lanche = new lancheModel();
        lanche.nome = req.body.nome;
        lanche.descricao = req.body.descricao;
        lanche.preco = preco;
        lanche.foto = foto; // Pode ser null caso não tenha arquivo

        // Tenta gravar o lanche no banco de dados
        let ok = await lanche.gravar();

        if (ok) {
            resp.send({
                ok: true,
                msg: "Lanche cadastrado com sucesso!"
            });
        } else {
            resp.send({
                ok: false,
                msg: "Erro ao inserir o lanche no banco de dados!"
            });
        }
    } else {
        resp.send({
            ok: false,
            msg: "As informações do lanche estão incompletas!"
        });
    }
}

    async listarView(req, resp) {
    let model = new lancheModel();
    let listaLanches = await model.listar();
    resp.render('lanche/lista.ejs', { lanches: listaLanches, scripts: ["/js/lanche/listar.js"] });
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

    resp.render('lanche/editar.ejs', { lanche: lancheEditando, scripts: ["/js/lanche/editar.js"] });
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

    async filtrarLanche(req, res) {
        let lanche = new lancheModel();
        let listaLanches = await lanche.filtrar(req.query.termo);
        res.send({lista: listaLanches});
    }
}

module.exports = LancheController;
