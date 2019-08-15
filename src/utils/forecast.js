const request = require('request');

const forecast = (latitude, longitude, callback) => {
    console.log('Checking latitude: ', latitude);
    console.log('Checking longitude: ', longitude);

    const darkSkyUrl = 'https://api.darksky.net/forecast/41c3f7eb47d9ad4340a8a0982b0ed423/' + latitude + ',' + longitude + '?units=si';
    request({ url: darkSkyUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', null);
        } else if (body.error) {
            callback('Unable to find location', null);
        } else {
            const weatherData = body;
            const { temperature, precipProbability } = weatherData.currently;
            const { summary } = weatherData.daily;

            // console.log(temperature);
            // console.log(precipProbability);
            // console.log(summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.');
            callback(null, {
                temperature: temperature,
                precipProbability: precipProbability,
                message: summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.'
            });
        }
    });
};

module.exports = forecast;