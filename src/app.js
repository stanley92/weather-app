const path = require('path');
const express = require('express');
const hbs  = require('hbs');
const geoCode  = require('./utils/geoCode');
const forecast  = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Stanley',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Stanley',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Stanley',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address!'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log('Error: ', error);
            return res.send({ error });
        } else if (latitude && longitude && location) {
            console.log('Data: ', latitude, longitude, location);
            forecast(latitude, longitude, (error, forecast) => {
                if (error) {
                    console.log('Error', error);
                    return res.send({ error });
                } else {
                    console.log('forecast: ', forecast);
                    res.send({
                        forecast,
                        location,
                        address: req.query.address
                    });
                }
            });
        }
    });


});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
    } else {
        res.send({
            products: []
        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Stanley',
        errorMessage: 'Help Article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Stanley',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});