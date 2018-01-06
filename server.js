//Requiring modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000; //SET DEFAULT TO 3000

//Setting HBS as the engine
app.set('view engine', 'hbs');
//The directory /public is automatically visible
app.use(express.static(__dirname + '/public'));

//Partials under /views/partials
hbs.registerPartials(__dirname + '/views/partials');

//A helper for the footer
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
//This is a middleware that runs the server log
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();
})

//MAINTANANCE -----> ONLY UNCOMMENT IF MAINTAININCE MODE IS REQUIRED!
// app.use((req, res, next) => {
//     res.render('maintanance.hbs');
// })




//My routes

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

app.get('/projects',(req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
})

//404 Route
app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: 'Unable to handle request',
    });
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}.`)
});