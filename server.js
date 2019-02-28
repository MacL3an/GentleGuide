const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var GoogleSpreadsheet = require('google-spreadsheet');
const SPREADSHEET_ID = '1-aIFZ5EafxqlgcVrkI_n_1Pp_NAikdjWALZXPypCp9U';

app.get('/api/routes', function(req, res) {
  var doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  // doc.useServiceAccountAuth(creds, function (err) {
    let routes = [];
    doc.getRows(1, function (err, rows) {
      for (let i = 0; i < rows.length; i++) {
        console.log(rows[i].name);
        let row = rows[i];
        if (row.name && row.name && row.trailhead && row.terraindetails) {
          row.trailhead = JSON.parse(row.trailhead);
          row.terraindetails = JSON.parse(row.terraindetails);
          if (row.trailhead.x && row.trailhead.y) {
            routes.push(row);  
          }
        }
      }
      res.json(routes);
    });
  // });
});

app.get('/api/avalancheForecast/:x/:y/:date', function(req, res) {
  const url = `https://api01.nve.no/hydrology/forecast/avalanche/v4.0.2/api/AvalancheWarningByCoordinates/Detail/${req.params.x}/${req.params.y}/2/${req.params.date}/${req.params.date}`
  fetch(url)
    .then(result => result.json())  
    .then(result => {
      res.json(result);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}