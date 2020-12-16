module.exports = {  
  secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "DB6DT54HBD6F4B6DE84D654BG6E74945F5F5F5F",
  API: process.env.NODE_ENV === "production" ? "https://api.loja-teste.ampliee.com" : "http://localhost:3000",
  loja: process.env.NODE_ENV === "production" ? "https://loja-teste.ampliee.com" : "http://localhost:8000",
};