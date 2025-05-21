const lancheModel = require("../models/lancheModel");

class cadastroController {
    // Exibe a view de cadastro
    cadastroView(req, resp) {
        resp.render("cadastro.ejs");
    }

    // Função para cadastrar o lanche
    async cadastroLanche(req, resp) {
        // Verifica se os campos nome, descricao e preco estão preenchidos
        if (req.body.nome && req.body.descricao && req.body.preco) {
            let preco = parseFloat(req.body.preco);
            
            // Valida se o preço é um número válido
            if (isNaN(preco) || preco <= 0) {
                return resp.send({
                    ok: false,
                    msg: "O preço deve ser um número válido maior que zero!"  
                });
            }

            // Criação do objeto lanche
            let lanche = new lancheModel();
            lanche.nome = req.body.nome;
            lanche.descricao = req.body.descricao;
            lanche.preco = preco;

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
}

module.exports = cadastroController;
