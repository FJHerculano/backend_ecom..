// PACOTES
const compression = require("compression");
const express = require("express");
const ejs = require ("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// START INICIAL
const app = express();

// VARIAVEIS DO AMBIENTE
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3500;

//ARQUIVOS ESTATICOS 
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// SETUP MONGODB
const dbs = require("./Config/database.json");
const dbURI = isProduction ? dbs.dbProduction :dbs.dbTeste;
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('conectou ao BD'))
.catch(error => console.log('Erro de conexão ao BD: ', error.message));

//SETUP EJS
app.set("view engine", "ejs");

// CONFIGURAÇÕES 
if( !isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

//SETUP BODY PARSER 
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5*1024*1024}));
app.use(bodyParser.json({ limit: 1.5*1024*1024}));

//MODELS
require("./models");
//ROTAS 
app.use("/", require("./routes"));

// 404 ROTAS DE ERRO 
app.use((req, res, next)=>{
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//ROTA - 422, 500, 401 OU DEMAIS...
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  if(err.status !== 404) console.warn("Error:" , err.message, new Date());
  res.json({erros:{message:err.message, status:err.status }});
});

// EXECUTAR SERVIDOR 
app.listen(PORT, (err)=>{
if(err) throw err;
console.log(`rodando na //localhost:${PORT}`);
})


