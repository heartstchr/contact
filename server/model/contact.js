var getAll= function(request, reply){
    var data= [
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
    ];
    reply(JSON.stringify(data, null, 4)).type('application/json');
};

module.exports = {
    GetAll: getAll
};