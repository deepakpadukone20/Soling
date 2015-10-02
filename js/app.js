var app = angular.module('solingApp', [
  'ngRoute','ngAnimate','ngSanitize', 'MassAutoComplete'
]);


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/soling", {templateUrl: "partials/soling.html", controller: "SolingCtrl"})
    .when("/stocktobunker", {templateUrl: "partials/stocktobunker.html", controller: "StockCtrl"})
    .when("/outsidetostock", {templateUrl: "partials/outsidetostock.html", controller: "OCustomerCtrl"})
    .when("/sale", {templateUrl: "partials/sale.html", controller: "SaleCtrl"})
    .when("/expense", {templateUrl: "partials/expense.html", controller: "ExpenseCtrl"})
    .when("/receipt", {templateUrl: "partials/receipt.html", controller: "ReceiptCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});
app.controller('SolingCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
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
  console.log("Page Controller reporting for duty.");
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
