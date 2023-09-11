const nodemailer = require("nodemailer");

// Configura el transporte del correo electrónico
const transporter = nodemailer.createTransport({
  service: "Gmail", // Cambia esto al servicio de correo que estés utilizando
  auth: {
    user: "panchovillanueva99@gmail.com", // Cambia esto a tu dirección de correo electrónico
    pass: "zarivmfbiupnapes", // Cambia esto a tu contraseña
  },
});

// Función para enviar el correo electrónico
function enviarCorreo(message, email) {
  const mailOptions = {
    from: "panchovillanuevaj99@gmail.com", // Cambia esto a tu dirección de correo electrónico
    to: email, // Usar la dirección de correo proporcionada en la data
    subject: "Compra realizada!",
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error al enviar el correo:", error);
      return { message: "Error al enviar el correo:" + error };
    } else {
      console.log("Correo electrónico enviado:", info.response);
      return { message: "Mail enviado!" };
    }
  });
}

module.exports = {
  enviarCorreo,
};
