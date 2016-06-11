var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://myangdata.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope
        .$on('$routeChangeError', function(event, next, previous, error) {
            if (error == 'AUTH_REQUIRED') {
                $rootScope.message = 'Sorry, you must be logged in to access that page!';
                $location.path('/login');
            }
        })

}]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        })
        .when('/checkins/:uId/:mId', {
            templateUrl: 'views/checkins.html',
            controller: 'CheckInsController'
        })
        .when('/checkins/:uId/:mId/checkinsList', {
            templateUrl: 'views/checkinsList.html',
            controller: 'CheckInsController'
        })
        .when('/meetings', {
            templateUrl: 'views/meetings.html',
            controller: 'MeetingsController',
            resolve: {
                currentAuth: function(Authentication) {
                    return Authentication.requireAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });

}]);
