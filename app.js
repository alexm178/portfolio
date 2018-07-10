var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT || 3000, () => {
  console.log("listening")
})
