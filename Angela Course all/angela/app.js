
const express = require('express');
const app = express();
// const path = require('path');

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

function getDayType(){
    const day = new Date().getDay();
    return day==0 || day==6 ?'the weekend' : 'a weekday';
}

function getMessage(){
    const day = new Date().getDay();
    return day==0 || day==6 ?"Its time to have fun.": "Its time to work.";
}

app.get('/' , (req, res)=>{
    const day_type = getDayType();
    const msg = getMessage();
    res.render('index.ejs', {day_type,msg});
});

app.get('/fruits', (req, res)=> {
    fav_fruits = ['mango', 'Lichi', 'Custardapple', 'Jackfruit'];
    res.render('fruits.ejs', {fruits: fav_fruits})
});



app.listen(8080, ()=>{
    console.log('App running at 8080');
});