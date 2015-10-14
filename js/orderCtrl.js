app.controller('ordersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.order = {};
    Data.get('orders').then(function(data){
        $scope.orders = data.data;
    });
    $scope.changeorderstatus = function(order){
        order.status = (order.status=="Active" ? "Inactive" : "Active");
        Data.put("orders/"+order.id,{status:order.status});
    };
    $scope.deleteorder = function(order){
        if(confirm("Are you sure to remove the order")){
            Data.delete("orders/"+order.id).then(function(result){
                $scope.orders = _.without($scope.orders, _.findWhere($scope.orders, {id:order.id}));
            });
        }
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Price",predicate:"price",sortable:true},
                    {text:"Stock",predicate:"stock",sortable:true},
                    {text:"Packing",predicate:"packing",reverse:true,sortable:true,dataType:"number"},
                    {text:"Description",predicate:"description",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('orderPrintCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.order = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Print order' : 'Add order';
        $scope.buttonText = (item.id > 0) ? 'Update order' : 'Add New order';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.order);
        }
        $scope.saveorder = function (order) {
            order.uid = $scope.uid;
            if(order.id > 0){
                Data.put('orders/'+order.id, order).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(order);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                order.status = 'Active';
                Data.post('orders', order).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(order);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
