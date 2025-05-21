const Database = require("../Database/database");

class lancheModel {
  #id;
  #nome;
  #descricao;
  #preco;

  constructor(id, nome, descricao, preco) {
    this.#id = id;
    this.#nome = nome;
    this.#descricao = descricao;
    this.#preco = preco;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }

  get descricao() { return this.#descricao; }
  set descricao(value) { this.#descricao = value; }

  get preco() { return this.#preco; }
  set preco(value) { this.#preco = value; }

  async gravar() {
    const sql = `INSERT INTO lanches (nome, descricao, preco) VALUES (?, ?, ?)`;
    const valores = [this.#nome, this.#descricao, this.#preco];
    const banco = new Database();
    const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async listar() {
    const sql = `SELECT * FROM lanches`;
    const banco = new Database();
    const lista = [];
    const rows = await banco.ExecutaComando(sql);

    for (let i = 0; i < rows.length; i++) {
      lista.push(new lancheModel(
        rows[i]["id"],
        rows[i]["nome"],
        rows[i]["descricao"],
        rows[i]["preco"]
      ));
    }

    return lista;
  }

  async excluir(id){
    let sql = `DELETE FROM lanches WHERE id = ?`;
    let banco = new Database();
    const valores = [id];
    const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async obter(id) {
    let sql = `SELECT * FROM lanches WHERE id = ?`;
    let valores = [id];
    let banco = new Database();
    let rows = await banco.ExecutaComando(sql, valores);
    if(rows.length > 0) {
      let row = rows[0];
      return new lancheModel(row["id"], row["nome"], row["descricao"], row["preco"]);
    }
    return null;
  }

  async alterar() {
    let sql = `UPDATE lanches SET nome = ?, descricao = ?, preco = ? WHERE id = ?`;
    let valores = [this.#nome, this.#descricao, this.#preco, this.#id];
    let banco = new Database();
    let resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }
}

module.exports = lancheModel;
