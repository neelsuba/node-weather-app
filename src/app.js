const path = require("path");
require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const app = express();

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
//define paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirPath = path.join(__dirname, "../public");

//setup handle bars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//using static directory
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather",
    name: "neel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "neel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help: "Help hehehehehe",
    title: "help",
    credit: "neel",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "No address provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   location: "mumbai",
  //   temperature: 25.6,
  //   windSpeed: 4.5,
  //   address: req.query.address,
  // });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", { errorMessage: "Help article not found :(" });
});

app.get("*", (req, res) => {
  res.render("404", { errorMessage: "PAGE NOT FOUND" });
});
// app.com

app.listen(3000, () => {
  console.log("server has started!");
});
