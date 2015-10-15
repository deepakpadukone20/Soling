app.controller('itemsCtrl', function ($scope, $modal, $filter, Data) {
    $scope.item = {};
    Data.get('items').then(function(data){
        $scope.items = data.data;
    });
    $scope.changeitemdeleted = function(item){
        item.sellable = (item.sellable=="1" ? "0" : "1");
        Data.put("items?id="+item.id,{sellable:item.sellable});
    };
    $scope.deleteitem = function(item){
        if(confirm("Are you sure to remove the item")){
            Data.delete("items?id="+item.id).then(function(result){
                $scope.items = _.without($scope.items, _.findWhere($scope.items, {id:item.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/itemEdit.html',
          controller: 'itemEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.items.push(selectedObject);
                $scope.items = $filter('orderBy')($scope.items, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.quantity = selectedObject.quantity;
                p.price = selectedObject.price;
                p.modifieddate = selectedObject.modifieddate;
                p.name = selectedObject.name;
            }
        });
    };
    
 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Price",predicate:"price",sortable:true},
                    {text:"Stock",predicate:"quantity",sortable:true},
                    {text:"Added Date",predicate:"date",sortable:true},
                    {text:"Last Updated",predicate:"modifieddate",sortable:true},
                    {text:"Sellable",predicate:"sellable",sortable:true},
                    {text:"Status",predicate:"deleted",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});


app.controller('itemEditCtrl', function ($scope, $modalInstance, item, Data,$filter) {

        $scope.item = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.item.modifieddate = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss")
        $scope.item.date =  $scope.item.modifieddate

        $scope.title = (item.id > 0) ? 'Edit item' : 'Add item';
        $scope.buttonText = (item.id > 0) ? 'Update item' : 'Add New item';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.item);
        }
        $scope.saveitem = function (item) {
            if(item.id > 0){
                Data.put('items?id='+item.id, item).then(function (result) {
                    if(result.deleted != 'error'){
                        var x = angular.copy(item);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                item.deleted = '0';
                Data.post('items', item).then(function (result) {
                    if(result.deleted != 'error'){
                        var x = angular.copy(item);
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
