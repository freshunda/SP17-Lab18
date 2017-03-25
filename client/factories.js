var f = angular.module('chirperProject.factories', [])
f.factory('ChirpFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/api/chirps/:id', { id: '@id' },
        {
            'update': { method: 'PUT' },
            'query': {
                method: 'GET', isArray: true
            },
            'delete': { method: 'DELETE' }
        });
    return f;
}]);
f.factory('UserFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/api/users/:id', { id: '@id' },
        {
            'update': { method: 'PUT' },
        });
    return f;
}]);
