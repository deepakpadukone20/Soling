var app = angular.module('solingApp', [
  'ngAnimate','ngRoute','ngSanitize', 'MassAutoComplete','ui.bootstrap','toaster'
]);


app.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider
    .when('/suppliers', {
      title: 'Suppliers',
      templateUrl: 'partials/suppliers.html',
      controller: 'suppliersCtrl',
      data: {
        requireLogin: true
      }

    })
    .when('/items', {
      title: 'Items',
      templateUrl: 'partials/items.html',
      controller: 'itemsCtrl',
      data: {
        requireLogin: true
      }
    })
    .when('/drivers', {
        title: 'Drivers',
        templateUrl: 'partials/drivers.html',
        controller: 'driversCtrl',
      data: {
        requireLogin: true
      }
    })
    .when('/vehicles', {
        title: 'Vehicles',
        templateUrl: 'partials/vehicles.html',
        controller: 'vehiclesCtrl',
      data: {
        requireLogin: true
      }
    })
    .when('/users', {
        title: 'Users',
        templateUrl: 'partials/users.html',
        controller: 'usersCtrl',
      data: {
        requireLogin: true
      }
    })
    .when('/customers', {
        title: 'customers',
        templateUrl: 'partials/customers.html',
        controller: 'customersCtrl',
      data: {
        requireLogin: true
      }
    })
    .when('/home', {
        title: 'Home',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl',
      data: {
        requireLogin: true
      }
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'partials/index.html',
    });
  
}]);
     

app.controller('PageCtrl', function  ($rootScope, $location, $http ) {
  
});
app.run(function ($rootScope,$location) {

  $rootScope.$on('$routeChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data && toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.uid === 'undefined') {
      event.preventDefault();
        $location.path('/')
    }
  });

});
app.controller('ModalCtrl',function($scope, $uibModal, $log){

  $scope.animationsEnabled = true;

  $scope.open = function (url,size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/'+url+'.html',
      controller: url+'Ctrl',
      size: size ||'md',
      openedClass: 'login',
      backdrop:false,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function () {
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
