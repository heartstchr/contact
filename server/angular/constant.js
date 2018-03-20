(function () {
    'use strict';

    angular
        .module('app')
        .constant('MENU', {
            list: [
                {
                    name: "Dashboard",
                    icon: "glyphicon glyphicon-dashboard",
                    url: "#/"
                },
                {
                    name: "Contacts",
                    icon: "glyphicon glyphicon-book",
                    url: "#/contacts"
                }
            ]
        })
        .constant('CONTACT_LIST', {
            default: [],
            type: ["Work", "Personal", "Mobile", "Home", "Main"],
            defaultEmail: [
                {id: '1', name: 'Email1'}
            ],
            defaultPhone: [
                {id: '1', name: 'Phone1'}
            ]
        })
})();