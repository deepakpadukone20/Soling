app.controller('saleCtrl', function ($scope,$location,$q, Data,$modalInstance) {
    
    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
     };

    $scope.init = function(){
        $scope.transact ={};
        

        $q.all([
        Data.get('items'),
        Data.get('suppliers')
        ]).then(function(results) {
            $scope.items = results[0].data;
            $scope.vehicles = results[1].data;
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