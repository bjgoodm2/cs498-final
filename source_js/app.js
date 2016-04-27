var app = angular.module('carpool',['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl : './partials/home.html',
            controller : 'homeController'
        })
        .when('/find', {
            templateUrl : './partials/find.html',
            controller : 'findController'
        })
        .when('/drive', {
            templateUrl : './partials/drive.html',
            controller : 'driveController'
        })
        .when('/profile', {
            templateUrl : './partials/profile.html',
            controller : 'profileController'
        })
        .otherwise({
            redirectTo: '/home'
        })
})