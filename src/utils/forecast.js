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

            console.log(weatherData.daily);

            const { summary } = weatherData.daily;
            const { temperatureHigh, temperatureLow } = weatherData.daily.data[0];

            callback(null, {
                temperature,
                precipProbability,
                temperatureHigh,
                temperatureLow,
                message: summary + ' It is currently ' + temperature + ' degrees out. The high today is ' + temperatureHigh + ' and the low is ' + temperatureLow + '. There is a ' + precipProbability + '% chance of rain.'
            });
        }
    });
};

module.exports = forecast;