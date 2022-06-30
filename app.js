
const express = require("express");
const https = require("https")
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "087322b0a8999a52524677ee989dbc3c"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp - 273;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> the current weather is " + desc + " </p>")
      res.write("<h1>the temperature of " + query + " is " + temp + " degree celcius</h1>");
      res.write("<img src = " + imageUrl + ">");
      res.send();

    });


  });


});


app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
