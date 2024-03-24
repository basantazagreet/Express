import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => { 
  var fname = req.body["fName"];
  var lname = req.body["lName"];
  var name = fname.concat('',lname)
  let letter_numbers = name.length;
  res.render('index.ejs', {letter_numbers});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
