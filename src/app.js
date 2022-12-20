import path from 'path';
import {fileURLToPath} from 'url';
import express from "express";
import hbs from 'hbs';
import {geocode} from './utils/geocode.js';
import {forecast} from './utils/forecast.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath); //If we use another name of the folder (not 'views')
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Render the handlebar template
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brandon Bautista'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Brandon Bautista'
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This page is to help',
        title: 'Help',
        name: 'Brandon Bautista'
    });
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search adress'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            
            res.send ({
                forecast: forecastData,
                location,
                adress: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Brandon Bautista',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon Bautista',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})