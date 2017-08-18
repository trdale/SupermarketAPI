var defaultGetData = [
  {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
  {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
  {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
  {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
];

describe('mainController', function () {
  beforeEach(function () {
    module('myApp');
  });

  var $controller;
  var $httpBackend;

  beforeEach(inject(function (_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('newProduce is an as empty object on load', function () {
    var $scope = {};
    var controller = $controller('mainController', { $scope: $scope});

    assert.deepEqual($scope.newProduce, {});
  });
  it('isUpperCase is default set to false', function () {
    var $scope = {};
    var controller = $controller('mainController', { $scope: $scope});

    assert.equal($scope.isUpperCase, false);
  });
  it('on init of controller sets produceList to starting data', function () {
    var $scope = {};
    var controller = $controller('mainController', { $scope: $scope});

    $httpBackend.expectGET('api/produce').respond(200, defaultGetData);
    $httpBackend.flush();

    assert.deepEqual($scope.produceList, defaultGetData);
  });
  it('errorMsg is set to null on init', function () {
    var $scope = {};
    var controller = $controller('mainController', { $scope: $scope});

    assert.equal($scope.errorMsg, null);
  });
  it('getDelErrMsg is set to null on init', function () {
    var $scope = {};
    var controller = $controller('mainController', { $scope: $scope});

    assert.equal($scope.getDelErrMsg, null);
  });
  describe('getProduce()', function () {
    it('should call get all produce from server', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});

      // we expect two cause init always runs and sets the produceList
      $httpBackend.expectGET('api/produce').respond(200, defaultGetData);
      $httpBackend.flush();

      // this is us expecting it again when getProduce() is called
      $httpBackend.expectGET('api/produce').respond(200, defaultGetData);

      $scope.getProduce();

      $httpBackend.flush();

      assert.deepEqual($scope.produceList, defaultGetData);
    });
    it('should call get all produce from server with upperCase names woth query param "UpperCase=true"', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});
      var expectedData = [
        {name: 'LETTUCE', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
        {name: 'PEACH', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
        {name: 'GREEN PEPPER', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
        {name: 'GALA APPLE', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];

      // we expect two cause init always runs and sets the produceList
      $httpBackend.expectGET('api/produce').respond(200, defaultGetData);
      $httpBackend.flush();

      // this is us expecting it again when getProduce() is called
      $scope.isUpperCase = true;
      $httpBackend.expectGET('api/produce?upperCase=true').respond(200, expectedData);
      $scope.getProduce();

      $httpBackend.flush();

      assert.deepEqual($scope.produceList, expectedData);
    });
  });
  describe('addProduce()', function () {
    it('should add produce when valid object is passed in', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});
      var produce = {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'};
      var expectedData = [
            {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
            {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
            {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
            {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
            {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'}
      ];

      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectPOST('api/produce', produce).respond(200, {list: expectedData});

      $scope.addProduce(produce);

      $httpBackend.flush();

      assert.deepEqual($scope.produceList, expectedData);
    });
    it('when given valid object should set errorMsg to null', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});

      $scope.errorMsg = 'thisShouldTurnNull';
      var produce = {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'};
      var expectedData = [
            {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
            {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
            {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
            {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
            {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'}
      ];

      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectPOST('api/produce', produce).respond(200, {list: expectedData});

      $scope.addProduce(produce);

      $httpBackend.flush();

      assert.equal($scope.errorMsg, null);
    });
    it('when given valid object should set newProduce to empty Object ({})', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});

      $scope.newProduce = {name: 'hey im not empty'};
      $scope.errorMsg = 'thisShouldTurnNull';
      var produce = {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'};
      var expectedData = [
            {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
            {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
            {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
            {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
            {name: 'Banana', produceCode: '1234-ABCD-5678-EFGH', unitPrice: '0.50'}
      ];

      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectPOST('api/produce', produce).respond(200, {list: expectedData});

      $scope.addProduce(produce);

      $httpBackend.flush();

      assert.deepEqual($scope.newProduce, {});
    });
    it('should set $scope.errorMsg when invalid produce is provided', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});
      var produce = {name: 'Banana', produceCode: '1234', unitPrice: '0.50'};
      var expectedData = 'Error';

      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectPOST('api/produce', produce).respond(500, expectedData);

      $scope.addProduce(produce);

      $httpBackend.flush();

      assert.equal($scope.errorMsg, expectedData);
    });
  });
  describe('deleteProduce()', function () {
    it('should delete something from the list (Peach)', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});
      var expectedData = [
            {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
            {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
            {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
      ];
      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectDELETE('api/produce/peach').respond(200, {list: expectedData});

      $scope.deleteProduce({name: 'peach'});

      $httpBackend.flush();

      assert.deepEqual($scope.produceList, expectedData);
    });
    it('should set $scope.getDelErrMsg when invalid name is provided', function () {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope});
      var expectedData = 'error';
      $httpBackend.expectGET('api/produce').respond(defaultGetData);
      $httpBackend.flush();

      $httpBackend.expectDELETE('api/produce/p!each').respond(500, expectedData);

      $scope.deleteProduce({name: 'p!each'});

      $httpBackend.flush();

      assert.deepEqual($scope.getDelErrMsg, expectedData);
    });
  });
});
