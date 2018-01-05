const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.set('view engine', 'hbs');


var text = {
    name: 'Vineet',
    likes: 'Biking',
};
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
})
//MAINTANANCE
app.use((req, res, next) => {
    res.render('maintanance.hbs');
})


app.use(express.static(__dirname + '/public'));



app.get('/', (req, res)=> {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to the homepage',
    });
});

app.get('/about',(req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: 'Unable to handle request',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}.`)
});