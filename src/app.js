const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Xavier Marchand'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Xavier Marchand'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpNumber: '911',
        title: 'Help',
        name: 'Xavier Marchand'
    })
})



app.get('/weather', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term entered'
        })
    }

    geocode (req.query.search, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send ({error})
        } 

        forecast ( latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.search
                
            })
        })

    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({Error: 'You must provide a search term'})
  
    } else {
         res.send({
        products: []
        })
    }

    console.log(req.query.search)
   
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Xavier Marchand',
        errorMessage: 'Help page not found'
        })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Xavier Marchand',
        errorMessage: 'Page not found'
        })
})


//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})