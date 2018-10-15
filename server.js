const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/appointment', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
