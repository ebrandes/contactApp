var myApp = angular.module('myApp', ['ngDialog', 'ngMessages', 'ui.utils.masks', 'ngRoute', 'angularFileUpload']);

myApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/',
            controller: 'contactCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    //$httpProvider.interceptors.push('authInterceptor');
}]);