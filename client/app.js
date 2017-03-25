//CREATE NEW ANGULAR APP
var app = angular.module('chirperProject', ['ngRoute', 'ngResource', 'chirperProject.factories']);
//ANGULAR ROUTING
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome.html',
            controller: 'WelcomeController'
        })
        .when('/chirps', {
            templateUrl: 'list.html',
            controller: 'ListController'
        })
        .when('/chirps/:id', {
            templateUrl: 'single_view.html',
            controller: 'SingleController'
        })
        .when('/chirps/:id/update', {
            templateUrl: 'single_update.html',
            controller: 'UpdateController'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);
//ANGULAR CONTROLLERS
//WELCOME PAGE CONTROLLER
app.controller('WelcomeController', ['$scope', function ($scope) {
    $scope.welcomeMessage = 'WELCOME TO CHIRPER';
}]);
//ALL CHIRPS AND USERS CONTROLLER
app.controller('ListController', ['$scope', '$http', '$location', 'ChirpFactory', 'UserFactory', function ($scope, $http, $location, ChirpFactory, UserFactory) {
    //ALL CHIRPSGET REQUEST
    $scope.chirps = ChirpFactory.query();
    //ALL USERS GET REQUEST
    $scope.users = UserFactory.query();
    //LINK TO SINGLE CHIRP PAGE
    $scope.clickChirp = function (id) {
        $location.path("/chirps/" + id)
    }
}]);
//SINGLE CHIRP CONTROLLER
app.controller('SingleController', ['$scope', '$http', '$routeParams', '$location', 'ChirpFactory', function ($scope, $http, $routeParams, $location, ChirpFactory) {
    var id = $routeParams.id;
    //SINGLE CHIRP GET REQUEST
    $scope.chirp = ChirpFactory.query({ id: $routeParams.id }, function (success) {
        console.log(success[0]);
        $scope.deleteChirp = function (chirp) {
            ChirpFactory.$delete({ id: $routeParams.id }, function () {
                console.log('Deleted from server');
            });
        }
    });
    //DELETE FUNCTION FOR SINGLE CHIRP
    // $scope.deleteChirp = function () {
    //     $scope.chirp.$delete();
    //     // $http({
    //     //     method: 'DELETE',
    //     //     url: 'http://localhost:3000/api/chirps/' + id
    //     // }).then(function (success) {
    //     //     $location.path("/chirps")
    //     // })
    // }
    //UPDATE BUTTON ON SINGLE PAGE
    $scope.updateBtn = function () {
        $location.path("/chirps/" + id + "/update")
    }
}]);
//SINGLE UPDATE CONTROLLER
app.controller('UpdateController', ['$scope', '$http', '$routeParams', '$location', 'ChirpFactory', function ($scope, $http, $routeParams, $location, ChirpFactory) {
    var id = $routeParams.id;
    //SINGLE CHIRP GET REQUEST
    $scope.chirp = ChirpFactory.query({ id: $routeParams.id }, function (success) {
        console.log(success[0]);
    });
    //UPDATE FUNCTION FOR PUT REQUEST
    $scope.updateChirp = function () {
        var chngChirp = {
            userID: id,
            message: $("#msg").val()
        }
        $http({
            method: "PUT",
            url: "http://localhost:3000/api/chirps/" + id,
            contentType: 'application/json',
            data: JSON.stringify(chngChirp)
        }).then(function (success) {
            console.log(success);
            $location.path("/chirps");
        }, function (err) {
            console.log(err);
        })
    };

}]);

