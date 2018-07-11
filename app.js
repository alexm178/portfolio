var express = require("express");
var app = express();
var bodyParser = require("body-parser");


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alexandermiller178@gmail.com',
    pass: 'nohackers'
  }
});




app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/contact", (req, res) => {
  var mailOptions = {
    from: req.body.name + " <" + req.body.email + ">",
    to: 'alexandermiller178@gmail.com',
    subject: req.body.subject,
    text: req.body.content + "\n" + req.body.phone
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.end("500")
      console.log(error);
    } else {
      res.end("200")
      console.log('Email sent: ' + info.response);
    }
  });


})

app.listen(process.env.PORT || 3000, () => {
  console.log("listening")
})
