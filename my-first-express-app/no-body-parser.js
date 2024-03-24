const express = require('express');

const app = express();


app.use((req, res, next) => {

    let body = '';

    req.on('end', () => {
        const username = body.split('=')[1];
        if (username) {
            req.body = { name: username };
        }
        next();
    });

    req.on('data', chunk => {
        body += chunk;
    });

});


app.use((req, res, next) => {
    if (req.body) {
        return res.send('<h2>' + req.body.name + '</h2>');
    }

    res.send('<form method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>');
});

app.listen(8080);