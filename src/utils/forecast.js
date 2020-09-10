const request = require("request");
require("dotenv").config();
const forecast = (lat, lon, callback) => {
  const forecastURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.FORECAST_API_KEY}&units=metric`;
  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location service :(", undefined);
    } else if (body.cod === 400) {
      callback("location could not be found", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.main.temp} out. The wind is blowing at a speed of ${body.wind.speed}m/s`
      );
    }
  });
};

module.exports = forecast;
