const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const lancheRouter = require('./routes/lancheRoute');
const HomeRouter = require('./routes/homeRoute');
const AcompanhaRouter = require('./routes/acompanhamentoRoute');
const bebidaRouter = require('./routes/bebidaRoute');
const autenticacaoMiddleware = require('./middlewares/autenticacaoMiddleware');
const pedidoRouter = require('./routes/pedidoRoute');
const app = express();
const porta = 5000;

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.set('layout', './layout');
app.use(expressLayouts);

let auth = new autenticacaoMiddleware



app.use('/', HomeRouter);
app.use('/lanche', lancheRouter);
app.use('/acompanhamento', AcompanhaRouter);
app.use('/bebida', bebidaRouter);
app.use('/pedido', pedidoRouter );



app.listen(porta,function(){
    console.log("Servidor em execução")
})