var request = require('request');
var assert = require('assert');
var app = require('../app.js');
var apiFunctions = require('../js/apiFunctions');
var startingData = require('../data');

var port = process.env.PORT || 3000;
var baseUrl = 'http://localhost:' + port + '/';

describe('data model', function () {
  describe('the produce list', function () {
    it('is an array', function () {
      assert.equal(Array.isArray(startingData.getList()), true);
    });
  });
  describe('the produce object', function () {
    var produce = startingData.getExampleProduce();

    it('is an object', function () {
      assert.equal(typeof produce, 'object');
    });
    describe('validateProduceName()', function () {
      it("has required property 'name'", function () {
        assert.equal(apiFunctions.checkRequired(produce, 'name'), true);
      });
      it('returns error when DOEST NOT have property name', function () {
        var validateBool;
        apiFunctions.validateProduceName(startingData.getList(), {produceCode: '1234-!GH7-QPL9-3GXZ', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
      it('contains only alphanumerics and spaces', function () {
        assert.equal(apiFunctions.alphanumericNameCheck(produce.name), true);
      });
      it('checks if it is a unique name', function () {
        assert.equal(apiFunctions.checkUniqueProp(startingData.getList(), {name: 'Banana', produceCode: 'FG3X-Q52A-HN4D-6Y7N', unitPrice: '0.50'}, 'name'), true);
      });
      it('checks if its NOT a unique name', function () {
        assert.equal(apiFunctions.checkUniqueProp(startingData.getList(), {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'}, 'name'), false);
      });
    });
    describe('validateProduceCode()', function () {
      it("has required property 'produceCode'", function () {
        assert.equal(apiFunctions.checkRequired(produce, 'produceCode'), true);
      });
      it('contains only alphanumerics and dashes', function () {
        assert.equal(apiFunctions.alphanumericProduceCodeCheck(produce.produceCode), true);
      });
      it('returns error when DOEST NOT have only alphanumerics and dashes', function () {
        var validateBool;
        apiFunctions.validateProduceCode(startingData.getList(), {name: 'Grapes!!', produceCode: '1234-!GH7-QPL9-3GXZ', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
      it('is sixteen characters long, with dashes separating each four character group', function () {
        assert.equal(apiFunctions.produceCodeFormatCheck(produce.produceCode), true);
      });
      it('returns error when DOEST NOT have 16 chars, in sets of 4 seperated by dashes', function () {
        var validateBool;
        apiFunctions.validateProduceCode(startingData.getList(), {name: 'Grapes!!', produceCode: '1234A-GH7-QPL9-3GXZ', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
      it('checks if it is a unique produce code', function () {
        assert.equal(apiFunctions.checkUniqueProp(startingData.getList(), {name: 'Banana', produceCode: 'FG3X-Q52A-HN4D-6Y7N', unitPrice: '0.50'}, 'produceCode'), true);
      });
      it('returns error when DOEST NOT have unique code', function () {
        var validateBool;
        apiFunctions.validateProduceCode(startingData.getList(), {name: 'Grapes!!', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
    });
    describe('validateUnitPrice()', function () {
      it("returns true when has valid property 'unitPrice' ", function () {
        var validateBool;
        apiFunctions.validateUnitPrice({name: 'Grapes!!', produceCode: '1234-4GH7-QPL9-3GXZ', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = false;
          } else {
            validateBool = true;
          }
        });
        assert.equal(validateBool, true);
      });
      it("returns error when DOEST NOT have required property 'unitPrice' ", function () {
        var validateBool;
        apiFunctions.validateUnitPrice({name: 'Grapes!!', produceCode: '1234-4GH7-QPL9-3GXZ'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
      it('returns true when it is a number', function () {
        assert.equal(apiFunctions.priceIsNumber(produce.unitPrice), true);
      });
      it('returns false when not a number', function () {
        assert.equal(apiFunctions.priceIsNumber('stringThatsNotANumber'), false);
      });
      it('succesfully converts to two digits', function () {
        assert.equal(apiFunctions.convertPriceToTwoDigit(produce.unitPrice), '0.51');
      });
    });
    describe('validateProduce()', function () {
      it('returns true when has valid produce object', function () {
        var validateBool;
        apiFunctions.validateProduce(startingData.getList(), produce, function (err, bool) {
          validateBool = bool;
        });
        assert.equal(validateBool, true);
      });
      it('returns error when name is invalid', function () {
        var validateBool;
        apiFunctions.validateProduce(startingData.getList(), {name: 'Grapes!!', produceCode: '1234-4GH7-QPL9-3GXZ', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = true;
          } else {
            validateBool = false;
          }
        });
        assert.equal(validateBool, true);
      });
      it('returns error when produceCode is invalid', function () {
        var validateBool;
        apiFunctions.validateProduce(startingData.getList(), {name: 'Grapes', unitPrice: '3.46'}, function (err, bool) {
          if (err) {
            validateBool = false;
          } else {
            validateBool = true;
          }
        });
        assert.equal(validateBool, false);
      });
      it('returns error when unitPrice is invalid', function () {
        var validateBool;
        apiFunctions.validateProduce(startingData.getList(), {name: 'Grapes', produceCode: '1234-4GH7-QPL9-3N4M', unitPrice: 'arandomstring'}, function (err, bool) {
          if (err) {
            validateBool = false;
          } else {
            validateBool = true;
          }
        });
        assert.equal(validateBool, false);
      });
    });
  });
});

describe('apiFunctions', function () {
  describe('listToUpperCase()', function () {
    it('converts produceList names to upper case', function () {
      var data = [
        {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
        {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
        {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
        {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];
      var uppercaseData = [
        {name: 'LETTUCE', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
        {name: 'PEACH', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
        {name: 'GREEN PEPPER', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
        {name: 'GALA APPLE', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];
      data = apiFunctions.listToUpperCase(data);
      assert.deepEqual(data, uppercaseData);
    });
  });
  describe('produceCodeFormatCheck()', function () {
    it('returns true with valid produce code', function () {
      assert.equal(apiFunctions.produceCodeFormatCheck('1234-4GH7-QPL9-3N4M'), true);
    });
    it('returns false with invalid characters in produceCode', function () {
      assert.equal(apiFunctions.produceCodeFormatCheck('123!-4GH7-QPL9-3N4M'), false);
    });
    it('returns false with invalid incorrect length', function () {
      assert.equal(apiFunctions.produceCodeFormatCheck('4GH7-QPL9-3N4M'), false);
    });
  });
  describe('checkRequired()', function () {
    it('returns true if required prop exsists', function () {
      assert.equal(apiFunctions.checkRequired({required: 'imRequired'}, 'required'), true);
    });
    it('returns false if required prop DOES NOT exsist', function () {
      assert.equal(apiFunctions.checkRequired({notRequired: 'imUseless'}, 'required'), false);
    });
  });
  describe('.getProduce()', function () {
    it('retrieves the list of data', function () {
      assert.deepEqual(apiFunctions.getProduce(), startingData.getList());
    });
  });
  describe('addProduce()', function () {
    it('adds produce to data object', function () {
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
  describe('deleteProduce()', function () {
    describe('removes a produce object based on name', function () {
      it('removes from middle of array', function () {
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
        apiFunctions.deleteProduce(data, 'peach', function (err, result) {
          if (err) {
            // do nothing will assert fail
          } else {
            data = result;
          }
        });
        assert.deepEqual(data, dataWithoutPeach);
      });
      it('removes from start of array', function () {
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
        apiFunctions.deleteProduce(data, 'lettuce', function (err, result) {
          if (err) {
            // do nothing will assert fail
          } else {
            data = result;
          }
        });
        assert.deepEqual(data, dataWithoutLettuce);
      });
      it('removes from end of array', function () {
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
        apiFunctions.deleteProduce(data, 'gala apple', function (err, result) {
          if (err) {
            // do nothing will assert fail
          } else {
            data = result;
          }
        });
        assert.deepEqual(data, dataWithoutApple);
      });
      it('returns err if name not found', function () {
        var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
        ];
        var error = 'no error found';
        apiFunctions.deleteProduce(data, 'Banana', function (err, result) {
          if (err) {
            error = err;
          } else {
            // do nothing
          }
        });
        assert.equal(error, 'Error: Name not found, unable to delete');
      });
    });
  });
});

describe('statusCodes', function () {
  describe('Main Page: /', function () {
    it('GET returns status code 200', function (done) {
      request.get(baseUrl, function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it('POST returns status code 404', function (done) {
      request.post(baseUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it('DELETE returns status code 404', function (done) {
      request.delete(baseUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it('PUT returns status code 404', function (done) {
      request.put(baseUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });

  describe('/api/produce', function () {
    var apiUrl = baseUrl + 'api/produce';
    it('GET returns status code 200 without query param', function (done) {
      request.get(apiUrl, function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("GET returns status code 200 with query param 'upperCase=true'", function (done) {
      request.get(apiUrl + '?upperCase=true', function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it("GET with query param 'upperCase=true' returns produce list with uppercase names", function (done) {
      var data = [
          {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
          {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
          {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
          {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];
      request.get(apiUrl + '?upperCase=true', function (error, response, body) {
        data = apiFunctions.listToUpperCase(data);
        body = JSON.parse(body);
        assert.deepEqual(data, body);
        done();
      });
    });
    it('POST returns status code 200 with valid Payload', function (done) {
      request.post({url: apiUrl, form: {'name': 'Banana', 'produceCode': '5GT6-9UI3-TH15-QR88', 'unitPrice': 0.5}}, function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it('POST returns status code 500 with invalid Payload', function (done) {
      request.post({url: apiUrl, form: {'name': 'Lettuce', 'produceCode': '5GT6-9UI3-TH15-QR88', 'unitPrice': 0.5}}, function (error, response, body) {
        assert.equal(500, response.statusCode);
        done();
      });
    });
    it('DELETE returns status code 404', function (done) {
      request.delete(apiUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it('PUT returns status code 404', function (done) {
      request.put(apiUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });

  describe('/api/produce/:name', function () {
    var apiUrl = baseUrl + 'api/produce/:name';
    it('GET returns status code 404', function (done) {
      request.get(apiUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it('POST returns status code 404', function (done) {
      request.post(apiUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
    it('DELETE returns status code 200 when provided name is found and deleted', function (done) {
      request.delete(baseUrl + 'api/produce/peach', function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
    it('DELETE returns status code 500 when provided name is not found', function (done) {
      request.delete(baseUrl + 'api/produce/pickle', function (error, response, body) {
        assert.equal(500, response.statusCode);
        done();
      });
    });
    it('PUT returns status code 404', function (done) {
      request.put(apiUrl, function (error, response, body) {
        assert.equal(404, response.statusCode);
        done();
      });
    });
  });
});
