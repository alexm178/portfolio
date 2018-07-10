var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/contact", (req, res) => {
  console.log("contact");
  console.log(req.body)
  res.json("200")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("listening")
})
