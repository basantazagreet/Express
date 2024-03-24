const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user',(req, res, next) => {

    res.send('<h2>' + req.body.username + '</h2>');
});

app.get('/',(req, res, next) => {
    res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>');
});



app.listen(8080);