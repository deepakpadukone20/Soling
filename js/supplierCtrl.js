app.controller('suppliersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.supplier = {};
    Data.get('suppliers').then(function(data){
        $scope.suppliers = data.data;
    });
    $scope.changesupplierstatus = function(supplier){
        supplier.status = (supplier.status=="Active" ? "Inactive" : "Active");
        Data.put("suppliers/"+supplier.id,{status:supplier.status});
    };
    $scope.deletesupplier = function(supplier){
        if(confirm("Are you sure to remove the supplier")){
            Data.delete("suppliers/"+supplier.id).then(function(result){
                $scope.suppliers = _.without($scope.suppliers, _.findWhere($scope.suppliers, {id:supplier.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/supplierEdit.html',
          controller: 'supplierEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.suppliers.push(selectedObject);
                $scope.suppliers = $filter('orderBy')($scope.suppliers, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.stock = selectedObject.stock;
                p.packing = selectedObject.packing;
            }
        });
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


app.controller('supplierEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.supplier = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit supplier' : 'Add supplier';
        $scope.buttonText = (item.id > 0) ? 'Update supplier' : 'Add New supplier';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.supplier);
        }
        $scope.savesupplier = function (supplier) {
            supplier.uid = $scope.uid;
            if(supplier.id > 0){
                Data.put('suppliers/'+supplier.id, supplier).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(supplier);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                supplier.status = 'Active';
                Data.post('suppliers', supplier).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(supplier);
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
