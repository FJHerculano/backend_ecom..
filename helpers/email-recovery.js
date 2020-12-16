const transporter = require("nodemailer").createTransport(require("../Config/email"));
const {root: link} = require("../Config/index");

module.exports = ({usuario, recovery}, cb)=>{
  const message = `
  <h1 style= "text-align: center;"> Recuperacao de senha</h1>
  <br />
  <p>
    Aqui está o link para redefinir a sua senha. Acesse-o e e digite sua nova senha:
  </p>
  <a href="${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}">
      ${link}/v1/api/usuarios/senha-recuperada?token=${recovery.token}
  </a>
  <br /><br /><hr />
  <p>
      Obs.: Se você não solicitou uma redefinicao, apenas ignore esse email.
  </p>
  <br />
  <p> Atenciosamente, Loja TI</p>
  `;

  const opcoesEmail = {
    from: "naoresponder@lojati.com",
    to: usuario.email,
    subject: "redefinir senha loja TI",
    html: message
  };

  if(process.env.NODE_ENV === "production"){
    transporter.sendMail(opcoesEmail, (error, info)=>{
      if(error){
        console.log(error);
        return cb("aconteceu um erro no envio do email, tente novamente.");       
      } else {
        return cb(null, "link para redefinição de senha foi enviado com sucesso para seu email");
      }
    });
  }else {
    console.log(opcoesEmail);
    return cb(null, "link para redefinição de senha foi enviado com sucesso para seu email"); 
  }

}