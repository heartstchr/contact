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
                controller: '404Controller',
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
                $scope.isUserLoggedIn = false;
                $scope.menu = false;
                $scope.colapseMenu = true;
                $scope.toggleMenu = function () {
                    $scope.menu = ($scope.menu === false) ? true : false;
                };
                $scope.cMenu = function () {
                    $scope.colapseMenu = ($scope.colapseMenu === false) ? true : false;
                };
                $scope.showChilds = function (index) {
                    $scope.menu = true;
                    $scope.items[index].active = !$scope.items[index].active;
                    $scope.items[index].subIcon = "glyphicon glyphicon-chevron-down pull-right";
                    collapseAnother(index);
                };
                $scope.showAllChilds = function (index) {
                    $scope.items[index].active = !$scope.items[index].active;
                    $scope.items[index].subIcon = "glyphicon glyphicon-chevron-down pull-right";
                    collapseAnother(index);
                };

                var collapseAnother = function (index) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if (i != index) {
                            $scope.items[i].active = false;
                            $scope.items[i].subIcon = "glyphicon glyphicon-chevron-right pull-right";
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
            controller: ['$scope', '$filter', function ($scope, $filter) {
                $scope.numoftrans = {
                    options: [10, 25, 50, 75]
                };
                $scope.filteredTrans = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;
            }]
        }
    }
})();
