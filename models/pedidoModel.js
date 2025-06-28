const Database = require("../Database/database");

class pedidoModel {
  #id;
  #nome;
  #endereco;
  #preco;

  constructor(id, nome, endereco, preco) {
    this.#id = id;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#preco = preco;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }

  get endereco() { return this.#endereco; }
  set endereco(value) { this.#endereco = value; }

  get preco() { return this.#preco; }
  set preco(value) { this.#preco = value; }

  // Gravar pedido na tabela pedidos
 async gravar() {
  const sql = `INSERT INTO pedidos (nome, endereco, preco) VALUES (?, ?, ?)`;
  const valores = [this.#nome, this.#endereco, this.#preco];
  const banco = new Database();

  await banco.ExecutaComandoNonQuery(sql, valores); // só insere

  const resultadoUltimoId = await banco.ExecutaComando("SELECT LAST_INSERT_ID() as id");
  this.#id = resultadoUltimoId[0].id;
  return this.#id;
}


  // Listar pedidos
  async listar() {
    const sql = `SELECT id, nome, endereco, preco FROM pedidos`;
    const banco = new Database();
    const rows = await banco.ExecutaComando(sql);
    return rows;
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

  const sql = `SELECT * FROM pedidos ${whereFiltro} ORDER BY nome`;
  const banco = new Database();
  const rows = await banco.ExecutaComando(sql, valores);

  const lista = [];

  for (const row of rows) {
    lista.push(new pedidoModel(
      row["id"],
      row["nome"],
      row["endereco"],
      row["preco"],
    ));
  }

  return lista;
}


toJSON() {
  return {
    id: this.id,
    nome: this.nome,
    endereco: this.endereco,
    preco: this.preco
  };
}
}

module.exports = pedidoModel;
