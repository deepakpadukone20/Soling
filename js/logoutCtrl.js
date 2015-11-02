app.controller('logoutCtrl', function ($scope,$rootScope,$modalInstance,Data) {
   $scope.logout = function () {
        Data.put('logout').then(function (results) {
            if(results.status == "success"){
                setTimeout(function(){
                    $rootScope.uid = undefined;
                    $rootScope.username = undefined;
                     $modalInstance.close();
                },1000)
            }
        });
    }
    $scope.logout();
});
