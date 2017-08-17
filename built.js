/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

angular.module('myApp', [])
  .controller('mainController', ['$scope', 'Produce', function ($scope, produce) {

    $scope.newProduce = {};
    $scope.isUpperCase = false;
    $scope.produceList = produce.query();

    $scope.getProduce = function() {
      if ($scope.isUpperCase) {
        $scope.produceList = produce.query({upperCase: 'true'});
      }
      else {
        $scope.produceList = produce.query();
      }
    }

    $scope.addProduce = function(data) {
      produce.save(data, function(success){
        $scope.errorMsg = null;
        $scope.produceList = success.list;
        $scope.newProduce = {};
      }, function(err){
        $scope.errorMsg = err.data;
      });
      
    };

    $scope.deleteProduce = function(data) {
      produce.delete(data, function(response){
        if(response.list) {
          $scope.produceList = response.list;
        }
      });
    };

}]);

angular.module('myApp').factory('Produce', ['$resource', function($resource){
  return $resource('api/produce/:name', {
    });
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp', 'ngResource']);
});


/***/ })
/******/ ]);