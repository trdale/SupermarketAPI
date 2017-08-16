var startingData = require('../data');

var checkRequired = function(obj, prop) {
  if (typeof obj[prop] === 'undefined' || !obj[prop]) {
    return false;
  }
  return true;
}

var alphanumericNameCheck = function(string) {
  var reg = /^([a-zA-Z0-9 ]+)$/g;
  return reg.test(string);
}

var alphanumericProduceCodeCheck = function(string) {
  var reg = /^([a-zA-Z0-9 -]+)$/g;
  return reg.test(string);
}


var produceCodeFormatCheck = function(string) {
  var reg = /^([a-zA-Z0-9]{4}[-]{1}){3}[a-zA-Z0-9]{4}$/g;
  if (string.length === 19) {
    return reg.test(string);
  }
  return false;
}

var priceIsNumber = function(price) {
  price = Number.parseFloat(price);
  if (typeof price === 'number') {
    return true;
  }
  return false;
}

var convertPriceToTwoDigit = function(price) {
  return Number.parseFloat(price).toFixed(2);
}

var validateProduceName = function(produce, cb) {
  if (checkRequired(produce, 'name')) {
    if (alphanumericNameCheck(produce.name)){
      return cb(null, true);
    }
    else {
      return cb(new Error('name contains invalid characters, alphanumeric only'));
    }
  } else {
    return cb(new Error('name required'));
  }
}

var validateProduceCode = function(produce, cb) {
  if (checkRequired(produce, 'produceCode')) {
    if (alphanumericProduceCodeCheck(produce.produceCode)){
      if (produceCodeFormatCheck(produce.produceCode)){
        return cb(null, true);
      } else {
        return cb(new Error('produceCode must be sixteen characters long, with dashes separating each four character group'));
      }
    }
    else {
      return cb(new Error('produce code contains invalid characters, alphanumeric and dashes only'));
    }
  } else {
    return cb(new Error('produceCode required'));
  }
}

var validateUnitPrice = function(produce, cb) {
  if (checkRequired(produce, 'unitPrice')) {
    if (priceIsNumber(produce.unitPrice)){
      produce.unitPrice = convertPriceToTwoDigit(produce.unitPrice);
      return cb(null, true);
    } else {
      return cb(new Error('price is not a number'))
    }
  } else {
    return cb(new Error('unit price required'));
  }
}

var validateProduce = function(produce) {
  validateProduceName(produce, function(err, result){
    if (err) {
      return err;
    }
  });

  validateProduceCode(produce, function(err, result){
    if (err) {
      return err;
    }
  });

  validateUnitPrice(produce, function(err, result){
    if (err) {
      return err;
    }
  });

  return true;
}

var deleteProduce = function(data, name) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      data.splice(i, 1);
      break;
    }
  }
  return data;
}

var addProduce = function(list, produce) {
  list.push(produce);
  return list;
}

var getProduce = function() {
  return startingData.getList();
}

module.exports = {
  deleteProduce: deleteProduce,
  addProduce: addProduce,
  getProduce: getProduce,
  validateProduce: validateProduce,
  validateProduceName: validateProduceName,
  validateProduceCode: validateProduceCode,
  validateUnitPrice: validateUnitPrice,
  checkRequired: checkRequired,
  alphanumericNameCheck: alphanumericNameCheck,
  priceIsNumber: priceIsNumber,
  convertPriceToTwoDigit: convertPriceToTwoDigit,
  alphanumericProduceCodeCheck: alphanumericProduceCodeCheck,
  produceCodeFormatCheck: produceCodeFormatCheck
}