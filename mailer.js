var EventEmitter = require('events');
var nodemailer = require("nodemailer");
exports.sendMail = function(email, link){
    var emitter = new EventEmitter()
    let transporter = nodemailer.createTransport({
       service: "gmail",
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
         user: 'lekhi.sahab@gmail.com', // generated ethereal user
         pass: 'test@12345' // generated ethereal password
       }
     });
     // setup email data with unicode symbols
     let mailOptions = {
       from: '"Fred Foo 👻" <foo@example.com>', // sender address
       to: email, // list of receivers
       subject: "Hello ✔", // Subject line
       text: "Hello world?", // plain text body
       html: `<b>Hello world?</b>
       <div><a href="`+link+`" target="_blank">Click here</a> to verify your account.</div>` // html body
     };
   
     // send mail with defined transport object
   transporter.sendMail(mailOptions , function(err,info){
   
       emitter.emit('DONE')
       console.log("error in sending mail", err)
   
       //console.log("Message sent: %s", info.messageId);
       // Preview only available when sending through an Ethereal account
       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   }) 

   return emitter
 }