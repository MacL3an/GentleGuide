const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/routes', function(req, res) {
  res.json([
      {
          "name": "Hakanpiggen",
          "duration": 5,
          "ascent": 1200,
          "elevation": 1300,
          "terrainComplexity": 3,
          "description": "A magnificent peak"
      },
      {
          "name": "Minitind",
          "duration": 2,
          "ascent": 300,
          "elevation": 400,
          "terrainComplexity": 1,
          "description": "A boring peak"
      }

  ]);
})

app.get('/api/avalancheForecast/', function(req, res) {
  const url = 'https://api01.nve.no/hydrology/forecast/avalanche/v4.0.2/api/AvalancheWarningByCoordinates/Simple/69.57584871428688/20.206546093750035/2/2019-02-11/2019-02-11'
  fetch(url)
    .then(result => result.json())  
    .then(result => {
      res.json(result);
    });

  //lyngseidet
  //https://api01.nve.no/hydrology/forecast/avalanche/v4.0.2/api/AvalancheWarningByCoordinates/Simple/69.57584871428688/20.206546093750035/2/2019-02-11/2019-02-11

});

app.listen(port, () => console.log(`Listening on port ${port}`));