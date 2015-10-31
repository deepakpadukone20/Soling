app.controller('customersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.customer = {};

    Data.get('customers').then(function (data) {
        $scope.customers = data.data;
    });

    $scope.changecustomerstatus = function (customer) {
        customer.isActive = (customer.isActive == "0" ? "1" : "0");
        Data.put('customers?id=' + customer.id, customer);
    };

    $scope.deletecustomer = function (curcustomer) {
        if (confirm("Are you sure to remove the customer")) {
            Data.delete("customers?id=" + curcustomer.id).then(function (result) {
                $scope.customers = _.without($scope.customers, _.findWhere($scope.customers, { id: curcustomer.id }));
            });
        }
    };

    var customerClass = function () {       
        this.name = "";
        this.address = "";
        this.contactPersonName = "";
        this.phone = "";
        this.date = "";
        this.isActive = 1;
    };

    $scope.showModalWindow = function (curcustomer) {
        if (curcustomer != undefined && curcustomer != null) {
            $scope.customer = curcustomer;
        }
        else {

            $scope.customer = new customerClass();
            $scope.customer.date = new Date();
        }
        $('#myModal').modal('show');
    };

    $scope.saveItem = function () {
        if ($scope.customer.id == undefined) {
            $scope.addNewcustomer();
        }
        else {
            $scope.updatecustomer();
        }

    };

    $scope.updatecustomer = function () {
        Data.put('customers?id=' + $scope.customer.id, $scope.customer).then(function (result) {
            if (result.deleted != 'error') {                
                $('#myModal').modal('hide');
            } else {
                console.log(result);
            }
        });
    };

    $scope.addNewcustomer = function () {
        //Data.post("customers", $scope.item1);
        Data.postservice('customers', $scope.customer)
            .success(function (result) {
                if (result.status != 'error') {
                    $scope.customer.id = result.data;
                    $scope.customers.push($scope.customer);
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
                       { text: "Date", predicate: "Date", sortable: true, dataType: "date" },
                       { text: "Status", predicate: "status", sortable: true },
                       { text: "Action", predicate: "", sortable: false }
    ];

});

