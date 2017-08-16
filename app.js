var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var path          = require('path');
var apiFunctions  = require('./js/apiFunctions'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var startingData = require('./data');

var list = startingData.getList();


app.route('/')
  .get(function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.route('/api/produce')
  .get(function(req, res){
    res.json(list);
  })
  .post(function(req, res){
    res.json({list: apiFunctions.addProduce(list, req.body)});
  });

app.route('/api/produce/:name')
  .delete(function(req, res){
    res.json({list: apiFunctions.deleteProduce(list, req.params.name)});
  });

app.listen(port);
console.log('Listening on port ' + port);