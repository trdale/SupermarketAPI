angular.module('myApp', [])
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.newProduce = {};
    $scope.isUpperCase = false;
    $scope.produceList = [];
    $scope.getDelErrMsg = null;

    var init = function () {
      $http.get('api/produce')
          .then(function (response) { $scope.produceList = response.data; });
    };
    init();

    $scope.getProduce = function () {
      if ($scope.isUpperCase) {
        $http.get('api/produce?upperCase=true')
          .then(function (response) {
            $scope.getDelErrMsg = null;
            $scope.produceList = response.data;
          });
      } else {
        $http.get('api/produce')
          .then(function (response) {
            $scope.getDelErrMsg = null;
            $scope.produceList = response.data;
          });
      }
    };

    $scope.addProduce = function (data) {
      $http.post('api/produce', data)
        .then(function (response) {
          $scope.errorMsg = null;
          $scope.newProduce = {};
          $scope.produceList = response.data.list;
        })
        .catch(function (response) {
          $scope.errorMsg = response.data;
        });
    };

    $scope.deleteProduce = function (data) {
      $http.delete('api/produce/' + data.name)
        .then(function (response) {
          $scope.getDelErrMsg = null;
          $scope.produceList = response.data.list;
        })
        .catch(function (response) {
          $scope.getDelErrMsg = response.data;
        });
    };
  }]);
