const request = require ('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8d32fb2e153d7812bf176bfb1e768cfa/'+lat+','+long+'?units=si'
    request ({url, json: true} , (error, { body }) => {
        if (error) {
            callback ('Unable to connect to weather service', undefined) 
        } else if (body.error) {
            callback ('Unable to find location', undefined)
        } else {
            const forecast = body.currently.summary
            callback (undefined, 'It is currently '+body.currently.temperature+' degrees. The forecast is '+body.currently.precipProbability+' chance of rain')
        }
        
    })
}


module.exports = forecast