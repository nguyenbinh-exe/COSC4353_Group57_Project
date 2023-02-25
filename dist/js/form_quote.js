const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/form_quote.html")
});

app.post("/", (req,res) => {
  const gal = Number(req.body.gallons);
  const addy = req.body.d_address;
  const date = req.body.d_date;
  const price = Number(req.body.suggested_price);
  const t = Number(req.body.total_amount);
  console.log("WE DON'T HAVE A DATABASE YET. YOUR DATA WILL BE LOST.")
});

app.listen(3000, () =>
{
  console.log("Server is running on port 3000.")
});

function calculatePrice()
{
  const price = Number(document.getElementById("price").value);
  const gal = Number(document.getElementById("gals").value);
  const total_price = price * gal;
  document.getElementById("total").value = total_price.toFixed(2);
}
