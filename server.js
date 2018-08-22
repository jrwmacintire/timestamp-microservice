// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?', function(req, res) {
  var milliRegex = /^\d*$/,
      stringRegex = /\d{4}[-]\d{1,2}[-]\d{1,2}/,
      dateString = req.params.date_string,
      date;
  // console.log(dateString);
  if(dateString == undefined) {
    date = new Date();
    var response = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    };
    res.json(response);
  }
  // If the dateString matches the millisecond or hyphen format, process response
  else if(milliRegex.test(dateString) || stringRegex.test(dateString)) {
    if(milliRegex.test(dateString)) dateString = parseInt(dateString);
    date = new Date(dateString);
    var response = {
      "unix": date.getTime(),
      "utc": date.toUTCString()
    };
    // console.log(response);
    res.json(response);
  } else {
    date = new Date(dateString); // use default error values in Date object constructor 
    var response = {
      "error": 'Invalid Date'
    };
    res.json(response);
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your dank app is listening on port ' + listener.address().port);
});
