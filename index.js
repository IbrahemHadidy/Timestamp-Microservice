// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

// Define route handler for /api/:date?
app.get("/api/:date?", function (req, res) {
  // Get the date parameter from the request
  const dateParam = req.params.date;

  // Check if dateParam exists and if it's a valid date
  if (!dateParam) {
    // If dateParam is empty, return the current time
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
    return;
  }

  // Check if dateParam is a valid Unix timestamp (i.e., a number)
  if (!isNaN(dateParam)) {
    const unixTimestamp = parseInt(dateParam);
    const utcString = new Date(unixTimestamp).toUTCString();
    res.json({ unix: unixTimestamp, utc: utcString });
    return;
  }

  // Otherwise, attempt to parse the date string
  const inputDate = new Date(dateParam);

  // Check if the inputDate is valid
  if (!isNaN(inputDate.getTime())) {
    // Create Unix timestamp
    const unixTimestamp = inputDate.getTime();

    // Create UTC string
    const utcString = inputDate.toUTCString();

    // Return the response
    res.json({ unix: unixTimestamp, utc: utcString });
    return;
  }

  // If date is invalid, return an error message
  res.status(400).json({ error: "Invalid Date" });
});


// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
