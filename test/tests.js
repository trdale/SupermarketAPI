var request       = require("request");
var assert        = require('assert');
var app           = require("../app.js");
var apiFunctions  = require("../js/apiFunctions");
var startingData  = require('../data');

var port = process.env.PORT || 3000;
var baseUrl = 'http://localhost:' + port + '/';

describe("data model", function() {
  describe("the produce list", function() {
    it("is an array", function() {
      assert.equal(Array.isArray(startingData.getList()), true);
    });
  })
  describe("the produce object", function() {

    var produce = startingData.getExampleProduce()

    it("is an object", function() {
      assert.equal(typeof produce, 'object');
    });
    describe("validateProduceName()", function() {
      it("has required property 'name'", function(){
        assert.equal(apiFunctions.checkRequired(produce, 'name'), true);
      });
      it("contains only alphanumerics and spaces", function(){
        assert.equal(apiFunctions.alphanumericNameCheck(produce.name), true);
      });
    });
    describe("validateProduceCode()", function() {
      it("has required property 'produceCode'", function(){
        assert.equal(apiFunctions.checkRequired(produce, 'produceCode'), true);
      });
      it("contains only alphanumerics and dashes", function(){
        assert.equal(apiFunctions.alphanumericProduceCodeCheck(produce.produceCode), true);
      });
      it("is sixteen characters long, with dashes separating each four character group", function(){
        assert.equal(apiFunctions.produceCodeFormatCheck(produce.produceCode), true);
      });
    });
    describe("validateUnitPrice()", function() {
      it("has required property 'unitPrice'", function(){
        assert.equal(apiFunctions.checkRequired(produce, 'unitPrice'), true);
      });
      it("is a number", function(){
        assert.equal(apiFunctions.priceIsNumber(produce.unitPrice), true);
      });
      it("succesfully converts to two digits", function(){
        assert.equal(apiFunctions.convertPriceToTwoDigit(produce.unitPrice), '0.51');
      })
    });
  });
});

describe('apiFunctions', function() {
  describe('.getProduce()', function() {
    it("retrieves the list of data", function() {
      assert.deepEqual(apiFunctions.getProduce(), startingData.getList());
    });
  });
  describe("addProduce()", function() {
    it("adds produce to data object", function() {
      var data = [
        {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
        {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
        {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
        {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];
      var produceToAdd = {name: 'Banana', produceCode: 'FG3X-Q52A-HN4D-6Y7N', unitPrice: '0.50'};
      var dataWithAddedProduce = [
        {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
        {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
        {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
        {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
        {name: 'Banana', produceCode: 'FG3X-Q52A-HN4D-6Y7N', unitPrice: '0.50'}
      ];
      assert.deepEqual(apiFunctions.addProduce(data, produceToAdd), dataWithAddedProduce);
    });
  });
  describe("deleteProduce()", function() {
    describe("removes a produce object based on name", function() {
      it("removes from middle of array", function() {
        var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        var dataWithoutPeach = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        assert.deepEqual(apiFunctions.deleteProduce(data, 'Peach'), dataWithoutPeach);
      });
      it("removes from start of array", function(){
        var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        var dataWithoutLettuce = [
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        assert.deepEqual(apiFunctions.deleteProduce(data, 'Lettuce'), dataWithoutLettuce);
      });
      it("removes from end of array", function(){
        var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        var dataWithoutApple = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'}
        ];
        assert.deepEqual(apiFunctions.deleteProduce(data, 'Gala Apple'), dataWithoutApple);
      });
      it("array stays the same if name not found", function(){
        var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        var dataWithoutChange = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        assert.deepEqual(apiFunctions.deleteProduce(data, 'Banana'), dataWithoutChange);
      });
    });
  });
});

describe("statusCodes", function() {
  describe("Main Page: /", function() {
    it("GET returns status code 200", function(done) {
      request.get(baseUrl, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("POST returns status code 404", function(done) {
      request.post(baseUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it("DELETE returns status code 404", function(done) {
      request.delete(baseUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it("PUT returns status code 404", function(done) {
      request.put(baseUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });
     
  describe("/api/produce", function() {
    var apiUrl = baseUrl + 'api/produce';
    it("GET returns status code 200", function(done) {
      request.get(apiUrl, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("POST returns status code 200", function(done) {
      request.post(apiUrl, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("DELETE returns status code 404", function(done) {
      request.delete(apiUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it("PUT returns status code 404", function(done) {
      request.put(apiUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });

  describe("/api/produce/:name", function() {
    var apiUrl = baseUrl + 'api/produce/:name';
    it("GET returns status code 404", function(done) {
      request.get(apiUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it("POST returns status code 404", function(done) {
      request.post(apiUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it("DELETE returns status code 200", function(done) {
      request.delete(apiUrl, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("PUT returns status code 404", function(done) {
      request.put(apiUrl, function(error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });
});