const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

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

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));