const Database = require("../Database/database");

class lancheModel {
  #id;
  #nome;
  #descricao;
  #preco;
  #foto;

  constructor(id, nome, descricao, preco, foto) {
    this.#id = id;
    this.#nome = nome;
    this.#descricao = descricao;
    this.#preco = preco;
    this.#foto = foto;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get nome() { return this.#nome; }
  set nome(value) { this.#nome = value; }

  get descricao() { return this.#descricao; }
  set descricao(value) { this.#descricao = value; }

  get preco() { return this.#preco; }
  set preco(value) { this.#preco = value; }

  get foto() { return this.#foto; }
  set foto(value) { this.#foto = value; }

  async gravar() {
    const sql = `INSERT INTO lanches (nome, descricao, preco, foto) VALUES (?, ?, ?, ?)`;
    const valores = [this.#nome, this.#descricao, this.#preco, this.#foto];
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
        rows[i]["preco"],
        rows[i]["foto"]        
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
      return new lancheModel(row["id"], row["nome"], row["descricao"], row["preco"], row["foto"]);
    }
    return null;
  }

  async alterar() {
    // ordem dos valores deve seguir a ordem dos "?" no SQL
    const sql = `UPDATE lanches SET nome = ?, descricao = ?, preco = ?, foto = ? WHERE id = ?`;
    const valores = [
        this.#nome,       
        this.#descricao,  
        this.#preco,      
        this.#foto,       
        this.#id       
    ];
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

  const sql = `SELECT * FROM lanches ${whereFiltro} ORDER BY nome`;
  const banco = new Database();
  const rows = await banco.ExecutaComando(sql, valores);

  const lista = [];

  for (const row of rows) {
    lista.push(new lancheModel(
      row["id"],
      row["nome"],
      row["descricao"],
      row["preco"],
      row["foto"]
    ));
  }

  return lista;
}


toJSON() {
  return {
    id: this.id,
    nome: this.nome,
    descricao: this.descricao,
    preco: this.preco,
    foto: this.foto
  };
}
}

module.exports = lancheModel;
