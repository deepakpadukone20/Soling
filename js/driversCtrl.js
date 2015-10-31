app.controller('driversCtrl', function ($scope, $modal, $filter, Data) {
    $scope.driver = {};

    Data.get('drivers').then(function (data) {
        $scope.Drivers = data.data;
    });

    $scope.changeDriverstatus = function (driver) {

        driver.isActive = (driver.isActive == "0" ? "1" : "0");
        Data.put('drivers?id=' + driver.id, driver);
    };

    $scope.changeisOwnEmployee = function (driver) {

        driver.isOwnEmployee = (driver.isOwnEmployee == "0" ? "1" : "0");
        Data.put('drivers?id=' + driver.id, driver);
    };


    $scope.deletedriver = function (curdriver) {
        if (confirm("Are you sure to remove the driver")) {
            Data.delete("drivers?id=" + curdriver.id).then(function (result) {
                $scope.Drivers = _.without($scope.Drivers, _.findWhere($scope.Drivers, { id: curdriver.id }));
            });
        }
    };

    var driverClass = function () {       
        this.name = "";
        this.address = "";
        this.phone="";
        this.isOwnEmployee = 1;
        this.date = "";
        this.isActive = 1;
        this.salary="0"
    };    

    $scope.showModalWindow = function (curdriver) {
        if (curdriver != undefined && curdriver != null) {
            $scope.driver = curdriver;
        }
        else {

            $scope.driver = new driverClass();
          
            
            $scope.driver.date = new Date();
        }
        $('#myModal').modal('show');
    };

    $scope.saveItem = function () {
        if ($scope.driver.id == undefined) {
            $scope.addNewdriver();
        }
        else {
            $scope.updatedriver();
        }

    };

    $scope.updatedriver = function () {
        Data.put('drivers?id=' + $scope.driver.id, $scope.driver).then(function (result) {
            if (result.deleted != 'error') {                
                $('#myModal').modal('hide');
            } else {
                console.log(result);
            }
        });
    };

    $scope.addNewdriver = function () {
        //Data.post("Drivers", $scope.item1);
        Data.postservice('drivers', $scope.driver)
            .success(function (result) {
                if (result.status != 'error') {
                    $scope.driver.id = result.data;
                    $scope.Drivers.push($scope.driver);
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
                       { text: "Phone", predicate: "phone", reverse: true, sortable: true, dataType: "number" },
                       { text: "Is Own Employee", predicate: "isOwnEmployee", sortable: true },
                       { text: "Date", predicate: "Date", sortable: true, dataType: "date" },
                       { text: "Status", predicate: "status", sortable: true },
                       { text: "Salary", predicate: "salary", reverse: true, sortable: true, dataType: "number" },
                       { text: "Action", predicate: "", sortable: false },

    ];

});

