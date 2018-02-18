var express = require('express');
var cors = require('cors');

var app = express();


// your manifest must have appropriate CORS headers, you could also use 'https://trello.com'
app.use(cors({ origin: '*' }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.post('/auth', function (request, response){
  // This is the route that we'll have an API POST UN + PW
  response.send({ token: '198374638a1caca81e1827376460201982baed5155e6c4934784625fa52372f' });
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});  