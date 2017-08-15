var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var data = [
  {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
  {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
  {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
  {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
];

var deleteProduce = function(name) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      data.splice(i, 1);
      break;
    }
  }
}

app.route('/')
  .get(function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.route('/api/produce')
  .get(function(req, res){
    res.json(data);
  })
  .post(function(req, res){
    data.push(req.body);
    res.json({list: data});
  });

app.route('/api/produce/:name')
  .delete(function(req, res){
    deleteProduce(req.params.name);
    res.json({list: data});
  });

app.listen(port);
console.log('Listening on port ' + port);