var app = angular.module('solingApp', [
  'ngAnimate','ngSanitize', 'MassAutoComplete','ui.bootstrap'
]);

app.controller('PageCtrl', function  ($rootScope, $location, $http ) {
  
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
app.controller('ModalCtrl',function($scope, $uibModal, $log){
   $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (url,size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/'+url+'.html',
      controller: 'ModalInstanceCtrl',
      size: size ||'lg',
      backdrop :'static',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})
app.controller('SolingCtrl', function ($rootScope, $location, $http ) {

});
app.controller('StockCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});
app.controller('OCustomerCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});
app.controller('SaleCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});
app.controller('ExpenseCtrl', function (/* $scope, $location, $http */) {
  $rootScope.dialog.setBody($('<div></div>').load('partials/soling.html'));
  $rootScope.dialog.show();
});
app.controller('ReceiptCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});


app.service('solingService', ['$http', function($http) {
  this.$http = $http;
  /**
   * Retrieves tasty donuts based on user requirements
   */
  this.getDriverNames = function(studentID) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url)
    .then(function(response) {
      return response.data;
    });
  };
  this.getSolingDetails = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.getVechicleNumbers = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.saveSolingTransaction = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.post(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.saveStockToBunkerTransaction = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.post(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.saveOutsideCustomerSale = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.post(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.getItemsInBunker = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.getItemsInStock = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.saveSaleOrder = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.post(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.saveExpense = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.post(url,data)
    .success(function(response) {
      return response.data;
    });
  };
  this.getDetailsForPrinting = function(data) {
   var url = '../ang/mockdata/payment.js';
   // feed me
   return this.$http.get(url,data)
    .success(function(response) {
      return response.data;
    });
  };

}]);
