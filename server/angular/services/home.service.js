(function () {
    'use strict';

    angular
    .module('app')
    .factory('contactService', contactService);

    contactService.$inject = ['$http','CONTACT_LIST','$rootScope'];
    function contactService($http,CONTACT_LIST,$rootScope) {
        var service = {};

        service.GetAll = GetAll;
        service.Save = Save;

        return service;

        function GetAll() {
            return $http.get('/contacts')
                .then(handleSuccess, handleError('Error getting all contacts'));
            // return CONTACT_LIST.default;
        }

        function Save(data) {
            return $rootScope.Contacts.push(data);
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
