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
app.controller('ListController', ['$scope', '$location', 'ChirpFactory', 'UserFactory', function ($scope, $location, ChirpFactory, UserFactory) {
    //ALL CHIRPSGET REQUEST
    $scope.chirps = ChirpFactory.query();
    //ALL USERS GET REQUEST
    $scope.users = UserFactory.query();
    //FUNCTION TO POST A NEW CHIRP
    $scope.postChirp = function () {
        var newChirp = new ChirpFactory({
            message: $("#target").val(),
            userID: Number($("select").val())
        });
        newChirp.$save(function (success) {
            $scope.chirps = ChirpFactory.query();
            location.reload();
        });
    }
    //LINK TO SINGLE CHIRP PAGE
    $scope.clickChirp = function (id) {
        $location.path("/chirps/" + id)
    }
}]);
//SINGLE CHIRP CONTROLLER
app.controller('SingleController', ['$scope', '$routeParams', '$location', 'ChirpFactory', function ($scope, $routeParams, $location, ChirpFactory) {
    var id = $routeParams.id;
    //SINGLE CHIRP GET REQUEST
    ChirpFactory.get({ id: $routeParams.id }, function (success) {
        $scope.chirp = success[0];
    });
    $scope.deleteChirp = function () {
        $scope.chirp.$delete(function (success) {
            $location.path('/chirps');
        });
    };
    //UPDATE BUTTON ON SINGLE PAGE
    $scope.updateBtn = function () {
        $location.path("/chirps/" + id + "/update")
    }
}]);
//SINGLE UPDATE CONTROLLER
app.controller('UpdateController', ['$scope', '$routeParams', '$location', 'ChirpFactory', function ($scope, $routeParams, $location, ChirpFactory) {
    var id = $routeParams.id;
    //SINGLE CHIRP GET REQUEST
    ChirpFactory.get({ id: $routeParams.id }, function (success) {
        $scope.chirp = success[0];
    });
    //UPDATE FUNCTION FOR PUT REQUEST
    $scope.updateChirp = function () {
        $scope.chirp.message = $("#msg").val();
        $scope.chirp.$update(function (success) {
            $location.path("/chirps/" + id);
        })
        // var chngChirp = {
        //     id: id,
        //     message: $("#msg").val()
        // };
        // $scope.chngChirp.$update(function (success) {
        //     $location.path("/chirps/" + id + "/update");
        // });
        // $http({
        //     method: "PUT",
        //     url: "http://localhost:3000/api/chirps/" + id,
        //     contentType: 'application/json',
        //     data: JSON.stringify(chngChirp)
        // }).then(function (success) {
        //     console.log(success);
        //     $location.path("/chirps");
        // }, function (err) {
        //     console.log(err);
        // })
    };

}]);

