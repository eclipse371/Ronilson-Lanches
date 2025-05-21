const express = require('express');
const cadastroRouter = require('./routes/cadastroRoute');
const listaRouter = require('./routes/listaRoute');
const app = express();
const porta = 5000;

app.set('views engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", cadastroRouter);
app.use('/lista',listaRouter);

app.listen(porta,function(){
    console.log("Servidor em execução")
})