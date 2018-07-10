var express - require(express);
var app = express();

app.get("/", (req, res) => {
  res.sendFile("./index.html")
})
