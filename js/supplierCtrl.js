app.controller('suppliersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.supplier = {};

    Data.get('suppliers').then(function (data) {
        $scope.suppliers = data.data;
    });

    $scope.changesupplierstatus = function (supplier) {
        supplier.isActive = (supplier.isActive == "0" ? "1" : "0");
        Data.put('suppliers?id=' + supplier.id, supplier);
    };

    $scope.deletesupplier = function (curSupplier) {
        if (confirm("Are you sure to remove the supplier")) {
            Data.delete("suppliers?id=" + curSupplier.id).then(function (result) {
                $scope.suppliers = _.without($scope.suppliers, _.findWhere($scope.suppliers, { id: curSupplier.id }));
            });
        }
    };

    var supplierClass = function () {
        this.name = "";
        this.address = "";
        this.contactPersonName = "";
        this.phone = "";
        this.isActive = 1;
    };

    $scope.showModalWindow = function (curSupplier) {
        if (curSupplier != undefined && curSupplier != null) {
            $scope.supplier = curSupplier;
        }
        else {

            $scope.supplier = new supplierClass();
        }
        $('#myModal').modal('show');
    };

    $scope.saveItem = function () {
        if ($scope.supplier.id == undefined) {
            $scope.addNewSupplier();
        }
        else {
            $scope.updateSupplier();
        }

    };

    $scope.updateSupplier = function () {
        Data.put('suppliers?id=' + $scope.supplier.id, $scope.supplier).then(function (result) {
            if (result.deleted != 'error') {                
                $('#myModal').modal('hide');
            } else {
                console.log(result);
            }
        });
    };

    $scope.addNewSupplier = function () {
        //Data.post("suppliers", $scope.item1);
        Data.postservice('suppliers', $scope.supplier)
            .success(function (result) {
                if (result.status != 'error') {                    
                    $scope.suppliers.push($scope.supplier);
                    $('#myModal').modal('hide');
                } else {
                    console.log(result);
                }
            })
            .error(function () {
                alert("error");
            })
        ;
    };

    $scope.columns = [
                       { text: "ID", predicate: "id", sortable: true, dataType: "number" },
                       { text: "Name", predicate: "name", sortable: true },
                       { text: "Address", predicate: "address", sortable: true },
                       { text: "Contact Person", predicate: "contactPersonName", sortable: true },
                       { text: "Phone", predicate: "phone", reverse: true, sortable: true, dataType: "number" },
                       { text: "Status", predicate: "status", sortable: true },
                       { text: "Action", predicate: "", sortable: false }
    ];

});

