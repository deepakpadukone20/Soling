app.controller('saleCtrl', function ($scope,$location,$q, Data,$modalInstance) {
    
    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
     };

    $scope.init = function(){
        $scope.transact ={};
        

        $q.all([
        Data.get('items'),
        Data.get('vehicles'),
        Data.get('customers')
        ]).then(function(results) {
            $scope.items = results[0].data;
            $scope.vehicles = results[1].data;
            $scope.customers = results[2].data;
        });
    }
    $scope.ok = function(){
       
        var transactdata = {
            date:$scope.transact.date|| "",
            unitType:$scope.transact.unitType ,
            quantity:$scope.transact.noOfUnits || 0,
            amount:$scope.transact.amount ||0,
            custId:$scope.transact.custId || -1,
            itemIds:$scope.transact.selectedItems||[],
            driverId:$scope.transact.driverId ||-1,
            vehicleId:$scope.transact.vehicleId ||-1
        }
        Data.post('transaction?type=sale',transactdata).then(function () {
            
        });
    
    }
    $scope.init();
});