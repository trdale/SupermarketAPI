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
