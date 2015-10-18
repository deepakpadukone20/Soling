app.controller('authCtrl', function ($scope,$location, $http, Data,$rootScope,$modalInstance) {
    $scope.login = {};
    $scope.signup = {};
    $scope.isSignUpMode = false;
    $scope.signUpMode = "Login";
    $scope.mode = "in";
    $scope.signInMsg = "Sign Up Now!";
    $scope.setSetSignupMode = function(){
        $scope.isSignUpMode = !$scope.isSignUpMode;
        if($scope.isSignUpMode){
            $scope.signUpMode = "Register";
            $scope.mode = "up";
            $scope.signInMsg = "Sign in!";
        }else{
            $scope.signUpMode = "Login";
            $scope.mode = "in";
            $scope.signInMsg = "Sign Up Now!";
        }
    }
    $scope.ok = function(){
        var user = {
            name:$scope.user.name || "",
            email:$scope.user.email || "",
            password:$scope.user.password
        }
        if($scope.isSignUpMode){
            signUp(user);
        }else{
            doLogin(user);
        }
    }
    function doLogin (user){
        Data.post('login', user).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $rootScope.uid = results.id;
                $rootScope.username = results.name;
                $modalInstance.close();
                $location.path('/');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:''};
    function signUp (user){
        Data.post('signUp', user).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            if(results.status == "success"){
                $rootScope.uid = "0";
                $rootScope.username = "";
            }
        });
    }
});