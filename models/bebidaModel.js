const Database = require("../Database/database");

class bebidaModel {
  #id;
  #nome;
  #preco;

  constructor(id, nome, preco) {
    this.#id = id;
    this.#nome = nome;
    this.#preco = preco;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }

  get preco() { return this.#preco; }
  set preco(value) { this.#preco = value; }

  async gravar() {
    const sql = `INSERT INTO bebidas (nome, preco) VALUES (?, ?)`;
    const valores = [this.#nome, this.#preco];
    const banco = new Database();
    const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async listar() {
    const sql = `SELECT * FROM bebidas`;
    const banco = new Database();
    const lista = [];
    const rows = await banco.ExecutaComando(sql);

    for (let i = 0; i < rows.length; i++) {
      lista.push(new bebidaModel(
        rows[i]["id"],
        rows[i]["nome"],
        rows[i]["preco"]
      ));
    }

    return lista;
  }

  async excluir(id) {
    const sql = `DELETE FROM bebidas WHERE id = ?`;
    const valores = [id];
    const banco = new Database();
    const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async obter(id) {
    const sql = `SELECT * FROM bebidas WHERE id = ?`;
    const valores = [id];
    const banco = new Database();
    const rows = await banco.ExecutaComando(sql, valores);

    if (rows.length > 0) {
      const row = rows[0];
      return new bebidaModel(row["id"], row["nome"], row["preco"]);
    }

    return null;
  }

  async alterar() {
    const sql = `UPDATE bebidas SET nome = ?, preco = ? WHERE id = ?`;
    const valores = [this.#nome, this.#preco, this.#id];
    const banco = new Database();
    const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async filtrar(termo) {
  let whereFiltro = "";
  let valores = [];

  if (termo && termo !== "") {
    if (!isNaN(termo)) {
      // Se for número, busca por ID
      whereFiltro = "WHERE id = ?";
      valores.push(termo);
    } else {
      // Se for texto, busca por nome
      whereFiltro = "WHERE nome LIKE ?";
      valores.push("%" + termo + "%");
    }
  }

  const sql = `SELECT * FROM bebidas ${whereFiltro} ORDER BY nome`;
  const banco = new Database();
  const rows = await banco.ExecutaComando(sql, valores);

  const lista = [];

  for (const row of rows) {
    lista.push(new bebidaModel(
      row["id"],
      row["nome"],
      row["preco"]
    ));
  }

  return lista;
}


toJSON() {
  return {
    id: this.id,
    nome: this.nome,
    preco: this.preco,
  };
}
}

module.exports = bebidaModel;
