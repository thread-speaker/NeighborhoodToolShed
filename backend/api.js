var app = require('./express.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//

// example GET api endpoint
app.get('/api', function (req, res) {
  console.log("api was accessed!");
	res.json({api: true});
});
