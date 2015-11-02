app.controller('usersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.user = {};

    Data.get('users').then(function (data) {
        $scope.users = data.data;
    });

    $scope.changeUserStatus = function (user) {

        user.isActive = (user.isActive == "0" ? "1" : "0");
        Data.put('users?id=' + user.id, user);
    };


    $scope.deleteuser = function (curuser) {
        if (confirm("Are you sure to remove the user")) {
            Data.delete("users?id=" + curuser.id).then(function (result) {
                $scope.users = _.without($scope.users, _.findWhere($scope.users, { id: curuser.id }));
            });
        }
    };

    var userClass = function () {       
        this.name = "";
        this.date = "";
        this.isActive = 1;
    };    

    $scope.showModalWindow = function (curuser) {
        if (curuser != undefined && curuser != null) {
            $scope.user = curuser;
        }
        else {

            $scope.user = new userClass();
          
            
            $scope.user.date = new Date();
        }
        $('#myModal').modal('show');
    };

    $scope.saveItem = function () {
        if ($scope.user.id == undefined) {
            $scope.addNewuser();
        }
        else {
            $scope.updateuser();
        }

    };

    $scope.updateuser = function () {
        Data.put('users?id=' + $scope.user.id, $scope.user).then(function (result) {
            if (result.deleted != 'error') {                
                $('#myModal').modal('hide');
            } else {
                console.log(result);
            }
        });
    };

    $scope.addNewuser = function () {
        //Data.post("users", $scope.item1);
        Data.postservice('users', $scope.user)
            .success(function (result) {
                if (result.status != 'error') {
                    $scope.user.id = result.data;
                    $scope.users.push($scope.user);
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
                       { text: "Date", predicate: "date", sortable: true, dataType: "date" },
                       { text: "Status", predicate: "isActive", sortable: true },
                       { text: "Action", predicate: "", sortable: false },

    ];

});

