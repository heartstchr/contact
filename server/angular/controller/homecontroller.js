(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)
        .filter('startFrom',startFrom)
        .filter('propsFilter', propsFilter)
        .filter('tel', tel);

    HomeController.$injector = ['$scope', '$route', '$rootScope', '$timeout', '', 'contactService', 'FlashService', 'CONTACT_LIST'];

    function HomeController($scope, $route, $rootScope, $timeout, $location, contactService, FlashService, CONTACT_LIST) {
        var cl = this;

        cl.contact = {};

        cl.available = {
            type: CONTACT_LIST.type,
            email: CONTACT_LIST.defaultEmail,
            phone: CONTACT_LIST.defaultPhone
        };

        cl.addNewPhone = addNewPhone;
        cl.removePhone = removePhone;
        cl.addNewEmail = addNewEmail;
        cl.removeEmail = removeEmail;
        cl.saveContact = saveContact;
        cl.getContacts = getContacts;
        console.log($rootScope.Contacts);
        if(!$rootScope.Contacts){
            getContacts();
        }
        function getContacts() {
            contactService.GetAll()
                .then(function (data) {
                    $rootScope.Contacts=[];
                    $rootScope.Contacts=data;
                    cl.Contacts = $rootScope.Contacts;
                });
        }

        // cl.Contacts = contactService.GetAll();

        function saveContact() {
            cl.contact.id = $rootScope.Contacts.length + 1;
            cl.contact.name = cl.contact.fname + ' ' + cl.contact.lname;
            contactService.Save(cl.contact);
            FlashService.Success('Contacts Saved Successfully', true);
            $location.path('/contacts');
        }

        function addNewPhone() {
            var newItemNo = cl.available.phone.length + 1;
            cl.available.phone.push({'id': newItemNo, 'name': 'Phone' + newItemNo});
        }

        function removePhone(index) {
            // var lastItem = cl.available.phone.length - 1;
            cl.available.phone.splice(index);
            delete cl.contact.phone[index];
        }

        function addNewEmail() {
            var newItemNo = cl.available.email.length + 1;
            cl.available.email.push({'id': newItemNo, 'name': 'Email' + newItemNo});
        }

        function removeEmail(index) {
            console.log('index',cl.contact.email);
            // var lastItem = cl.available.email.length - 1;
            cl.available.email.splice(index);
            delete cl.contact.email[index];
        }
    }

    function propsFilter() {
        return function (items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop] && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }
                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        }
    }

    function tel() {
        return function (tel) {
            if (!tel) {
                return '';
            }
            var value = tel.toString().trim().replace(/^\+/, '');
            if (value.match(/[^0-9]/)) {
                return tel;
            }
            var country, city, number;
            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = +91;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    city = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }
            number = number.slice(0, 3) + '-' + number.slice(3);
            return ("+" + country + " (" + city + ") " + number).trim();
        };
    }

    function startFrom() {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    }
})();
