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
            default: [
                {
                    id: 1,
                    name: "Gopala Krishnan",
                    email: [
                        {
                            type: "Work",
                            value: "gopalakrishnan@domain.com"
                        },
                        {
                            type: "Personal",
                            value: "gopalakrishnan@domain.com"
                        }
                    ],
                    phone: [
                        {type: "Work", value: "044 432102"},
                        {type: "Work", value: "9876543210"}
                    ]
                },
                {
                    id: 2,
                    name: "Prakashkumar",
                    email: [
                        {
                            type: "Work",
                            value: "prakashkumar@domain.com"
                        },
                        {
                            type: "Personal",
                            value: "prakashkumar@domain.com"
                        }
                    ],
                    phone: [
                        {type: "Work", value: "042 432102"},
                        {type: "Work", value: "9876553210"}
                    ]
                },
                {
                    id: 3,
                    name: "Gopinath",
                    email: [
                        {
                            type: "Work",
                            value: "gopinath@domain.com"
                        },
                        {
                            type: "Personal",
                            value: "gopinath@domain.com"
                        }
                    ],
                    phone: [
                        {type: "Work", value: "0422 432102"},
                        {type: "Work", value: "9876543200"}
                    ]
                }
            ],
            type: ["Work", "Personal", "Mobile", "Home", "Main"],
            defaultEmail: [
                {id: '1', name: 'Email1'}
            ],
            defaultPhone: [
                {id: '1', name: 'Phone1'}
            ]
        })
})();