// const request = require('request')
import request from 'request';

export const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiYnJhbmJhdXRpc3RhIiwiYSI6ImNsYnFydjR2bTBoaGkzb3A5YmVjaHIzZ2kifQ.bEvJZ9N7LfXOn2faX0D8Yg`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if (body.features.length === 0) {
            console.log(body.features)
            callback('Unable to find location. Try another search.', {undefined, undefined, undefined});
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// module.exports = geocode