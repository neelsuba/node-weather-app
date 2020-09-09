const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmVlbHN1YmEiLCJhIjoiY2tlZTZvenl1MGRucDJ0bnQ4OGlwdGgxZiJ9.tKqHVSal0LfE0GKh3MeFGg&limit=1";

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services :(", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location, try something else", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
