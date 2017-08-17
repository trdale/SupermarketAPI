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
    if (req.query.upperCase === 'true') {
      res.json(apiFunctions.listToUpperCase(list));
    } else {
      res.json(list);
    }
    
  })
  .post(function(req, res){
    apiFunctions.validateProduce(list, req.body, function(err, result){
      if (err) {
        res.status(500).send(err.toString());
      } else {
        req.body.produceCode = req.body.produceCode.toUpperCase();
        res.json({list: apiFunctions.addProduce(list, req.body)});
      }
    });
  });

app.route('/api/produce/:name')
  .delete(function(req, res){
    if (req.params.name != ':name') {
      res.json({list: apiFunctions.deleteProduce(list, req.params.name)});  
    } else {
      res.status(500).send((new Error('must provide name paramater to delete')).toString());
    }
  });
app.use(express.static('./'));
app.listen(port);
console.log('Listening on port ' + port);