app.controller('outsidetostockCtrl', function ($scope,$location, $http, Data,$modalInstance) {
    
    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
     };

    $scope.init = function(){
        $scope.transact ={};
         Data.get('suppliers').then(function (data) {
             var d = new Date();
             $scope.transact.date = d;
             $scope.transact.time = d;
            $scope.suppliers = data.data;
        });

    }
    $scope.ok = function(){
       
        var transactdata = {
            date:$scope.transact.date|| "",
            time:$scope.transact.time || "",
            unitType:$scope.transact.unitType ,
            noOfUnits:$scope.transact.noOfUnits || 0,
            amount:$scope.transact.amount ||0,
            supplierId:$scope.transact.supplierId || -1
        }
        Data.post('transaction',transactdata).then(function () {
            
        });
    
    }
    $scope.init();
});