var startingData = require('../data');

var checkRequired = function (obj, prop) {
  if (typeof obj[prop] === 'undefined' || !obj[prop]) {
    return false;
  }
  return true;
};

var alphanumericNameCheck = function (string) {
  var reg = /^([a-zA-Z0-9 ]+)$/g;
  return reg.test(string);
};

var alphanumericProduceCodeCheck = function (string) {
  var reg = /^([a-zA-Z0-9 -]+)$/g;
  return reg.test(string);
};

var produceCodeFormatCheck = function (string) {
  var reg = /^([a-zA-Z0-9]{4}[-]{1}){3}[a-zA-Z0-9]{4}$/g;
  if (string.length === 19) {
    return reg.test(string);
  }
  return false;
};

var priceIsNumber = function (price) {
  price = Number.parseFloat(price);
  if (Number.isNaN(price)) {
    return false;
  }
  return true;
};

var convertPriceToTwoDigit = function (price) {
  return Number.parseFloat(price).toFixed(2);
};

var validateProduceName = function (list, produce, cb) {
  if (checkRequired(produce, 'name')) {
    if (alphanumericNameCheck(produce.name)) {
      if (checkUniqueProp(list, produce, 'name')) {
        return cb(null, true);
      } else {
        return cb(new Error('name is not unique, please provide unique name'));
      }
    } else {
      return cb(new Error('name contains invalid characters, alphanumeric only'));
    }
  } else {
    return cb(new Error('name required'));
  }
};

var validateProduceCode = function (list, produce, cb) {
  if (checkRequired(produce, 'produceCode')) {
    if (alphanumericProduceCodeCheck(produce.produceCode)) {
      if (produceCodeFormatCheck(produce.produceCode)) {
        if (checkUniqueProp(list, produce, 'produceCode')) {
          return cb(null, true);
        } else {
          return cb(new Error('produce code is not unique, please provide unique produce code'));
        }
      } else {
        return cb(new Error('produceCode must be sixteen characters long, with dashes separating each four character group'));
      }
    } else {
      return cb(new Error('produce code contains invalid characters, alphanumeric and dashes only'));
    }
  } else {
    return cb(new Error('produceCode required'));
  }
};

var validateUnitPrice = function (produce, cb) {
  if (checkRequired(produce, 'unitPrice')) {
    if (priceIsNumber(produce.unitPrice)) {
      produce.unitPrice = convertPriceToTwoDigit(produce.unitPrice);
      return cb(null, true);
    } else {
      return cb(new Error('unitPrice is not a number'));
    }
  } else {
    return cb(new Error('unitPrice required'));
  }
};

var validateProduce = function (list, produce, cb) {
  validateProduceName(list, produce, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      validateProduceCode(list, produce, function (err, result) {
        if (err) {
          return cb(err);
        } else {
          validateUnitPrice(produce, function (err, result) {
            if (err) {
              return cb(err);
            } else {
              return cb(null, true);
            }
          });
        }
      });
    }
  });
};

var deleteProduce = function (data, name, cb) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase() === name.toUpperCase()) {
      data.splice(i, 1);
      return cb(null, data);
    }
  }
  return cb(new Error('Name not found, unable to delete'));
};

var addProduce = function (list, produce) {
  list.push(produce);
  return list;
};

var getProduce = function () {
  return startingData.getList();
};

var listToUpperCase = function (list) {
  var upperCaseList = JSON.parse(JSON.stringify(list));
  for (var i = 0; i < upperCaseList.length; i++) {
    upperCaseList[i].name = upperCaseList[i].name.toUpperCase();
  }
  return upperCaseList;
};

var checkUniqueProp = function (list, obj, prop) {
  var found = list.some(function (element) {
    return element[prop].toUpperCase() === obj[prop].toUpperCase();
  });

  if (!found) {
    return true;
  } else {
    return false;
  }
};

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
  produceCodeFormatCheck: produceCodeFormatCheck,
  listToUpperCase: listToUpperCase,
  checkUniqueProp: checkUniqueProp
};
