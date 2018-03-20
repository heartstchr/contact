(function () {
    'use strict';

    angular
    .module('app')
    .factory('contactService', contactService);

    contactService.$inject = ['$http','CONTACT_LIST'];
    function contactService($http,CONTACT_LIST) {
        var service = {};

        service.GetAll = GetAll;

        return service;

        function GetAll() {
            return $http.get('/contacts')
                .then(handleSuccess, handleError('Error getting all contacts'));
            // return CONTACT_LIST.default;
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
