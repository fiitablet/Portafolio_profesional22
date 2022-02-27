var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('Contacto', { // ve el hsb
        isContacto:true
    }); // enlaza con  hbs igual
});
// forma abreviada de poner funcion y aca VEO LO Q ENVIA EN EL FORMULARIO
router.post('/', async (req, res, next) => {
    console.log(req.body);
    var nombre = req.body.nombre;
    var email = req.body.email;
    var tell = req.body.tell;
    var comentario = req.body.comentario;

    var odj={
        to:"sofiblet@gmail.com",
        subject: "CONTACTO WEB",
        html: nombre + " acaba de enviar un mensaje mediante el formulario y quiere obtener una respuesta .<br> su mail es : " + email + ".<br> y su mensaje/consulta envíada es : " + comentario + ".<br>  tel : " + tell
    }
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    var info = await transport.sendMail(odj); //envia el mail
    res.render("Contacto",{
        message: "Muchas Gracias " + nombre + ",su mensaje ha sido envíado 😊 " // avisa q se envio
    });    
    });


module.exports = router;


module.exports = router;
