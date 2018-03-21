(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ui.bootstrap'])
        .directive('search', search)
        .directive('pagination', pagination)
        .directive('capitalizeFirst', capitalizeFirst)
        .directive('menu', menu)
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                template: '<h1>Welcome !!</h1>',
                controllerAs: 'cl'
            })
            .when('/contacts', {
                controller: 'HomeController',
                templateUrl: 'views/task/task1.html',
                controllerAs: 'cl'
            })
            .when('/contact/create', {
                controller: 'HomeController',
                templateUrl: 'views/task/create.html',
                controllerAs: 'cl'
            })
            .when('/404', {
                title: '404 ',
                controller: 'HomeController',
                templateUrl: 'views/404.html',
                controllerAs: 'cl'
            })

            .otherwise({redirectTo: '/404'});

    }

    capitalizeFirst.$inject = ['$parse'];

    function capitalizeFirst($parse) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) {
                        inputValue = '';
                    }
                    var capitalized = inputValue.charAt(0).toUpperCase() +
                        inputValue.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        }
    }

//admin
    menu.$inject = ['MENU'];

    function menu(MENU) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "views/includes/nav.html",
            controller: ['$scope', '$filter', function ($scope, $filter) {
                $scope.activate = function (index) {
                    $scope.menu = true;
                    $scope.items[index].active = !$scope.items[index].active;
                    deactivateAnother(index);
                };
                var deactivateAnother = function (index) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if (i != index) {
                            $scope.items[i].active = false;
                        }
                    }
                };
                $scope.items = MENU.list;
            }]
        }
    }

    search.$inject = [];

    function search() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "views/includes/search.html",
            controller: ['$scope', '$filter', function ($scope, $filter) {

            }]
        }
    }

    pagination.$inject = [];

    function pagination() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "views/includes/pagination.html",
            controller: ['$rootScope', '$filter', function ($rootScope, $filter) {
                $rootScope.numoftrans = {
                    options: [10, 25, 50, 75]
                };
                $rootScope.filteredTrans = [];
                $rootScope.currentPage = 1;
                $rootScope.numPerPage = 10;
                $rootScope.maxSize = 5;
            }]
        }
    }
})();
