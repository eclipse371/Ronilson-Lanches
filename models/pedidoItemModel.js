const Database = require("../Database/database");

class pedidoItemModel {
  #id;
  #pedidoId;
  #produtoId;
  #tipo;
  #quantidade;
  #preco;

  constructor(pedidoId, produtoId, tipo, quantidade, preco) {
    this.#pedidoId = pedidoId;
    this.#produtoId = produtoId;
    this.#tipo = tipo;
    this.#quantidade = quantidade;
    this.#preco = preco;
  }

 async gravar() {
  const sql = `INSERT INTO pedido_itens (pedido_id, produto_id, tipo, quantidade, preco) VALUES (?, ?, ?, ?, ?)`;
  const valores = [this.#pedidoId, this.#produtoId, this.#tipo, this.#quantidade, this.#preco];
  const banco = new Database();
  return await banco.ExecutaComandoNonQuery(sql, valores);
}

  static async listarPorPedido(pedidoId) {
    const sql = `SELECT * FROM pedido_itens WHERE pedido_id = ?`;
    const banco = new Database();
    const rows = await banco.ExecutaComando(sql, [pedidoId]);
    return rows;
  }
}

module.exports = pedidoItemModel;
