const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const port = 3000;

// Using bodyparser middlerware for accessing request object
app.use(bodyParser.urlencoded({ extended: true }));

//router Import
//path
app.use(express.static(path.join(__dirname, "public"))); //html

const pdfRoute = require("./routes/pdfmake");

app.get("/", (req, res) => {
  res.send("index.html");
});

app.use("/pdfmake", pdfRoute);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
