const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs  = require('express-handlebars');
const nodemailer = require("nodemailer");


const app = express();


app.engine('handlebars',exphbs());
app.set('view engine', 'handlebars');

app.use('/public' , express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req , res)=>{
    res.render('contact',{layout:false});
});

app.post('/send', (req, res)=> {
    console.log(req.body);
    const output = '${req.body.email}';
});

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'rafaymemon43@gmail.com', // generated ethereal user
        pass: 'Gmail.com123'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"AWH groups & Company" <rafaymemon43@gmail.com>', // sender address
      to: 'wasaya88@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?' // plain text body
    //    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });

app.listen(3000, ()=> console.log('Server Started.....'));
