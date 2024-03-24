require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const databaseUrl = process.env.DB_URL;
const UserRoutes = require('./routes/UserRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/user', UserRoutes);

app.use((req, res, next) => {
    return res.json({message: "The route not found", status: 404});
});



mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(port, () => {
        console.log("Connected on "+port)
        });
}).catch((err)=> {
    console.log('Error connecting database' +err);
})



