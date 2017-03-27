// var f = angular.module('chirperProject.factories', [])
// f.factory('ChirpFactory', ['$resource', function ($resource) {
//     return $resource('http://localhost:3000/api/chirps/:id', { id: '@id' },
//         {
//             'update': { method: 'PUT' },
//             'query': {
//                 method: 'GET', isArray: true
//             },
//             'delete': { 
//                 method: 'DELETE', isArray: true }
//         });
//     return f;
// }]);
// f.factory('UserFactory', ['$resource', function ($resource) {
//     return $resource('http://localhost:3000/api/users/:id', { id: '@id' },
//         {
//             'update': { method: 'PUT' },
//         });
//     return f;
// }]);

var app = angular.module("chirperProject.factories", [])

app.factory("ChirpFactory", ['$resource', function($resource){
    return $resource("/api/chirps/:id", {id: "@id"}, {
        "update": {method: "PUT"},
        "get": {method: "GET", isArray: true}
    });
}]);

app.factory("UserFactory", ['$resource', function($resource){
    return $resource("/api/users/:id", {id: "@id"});
}]);
