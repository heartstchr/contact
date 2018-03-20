
var Contact = require('./model/contact').Contact;
// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next){

    server.route([
        {
            method: 'GET',
            path: '/about',
            config: {
                handler: function(request, reply){
                    reply.view('about', {
                        title: 'Super Informative About Page'
                    });
                },
                id: 'about'
            }
        },
        {
            method: 'GET',
            path: '/',
            config: {
                handler: function(request, reply){
                  // Render the view with the custom greeting
                    reply.view('index', {
                        title: 'Contact List'
                    });
                },
                id: 'index'
            }
        },
        {
            method: 'GET',
            path: '/contacts',
            config: {
                handler: function(request, reply){
                    Contact.GetAll(function (err,data) {
                        reply(JSON.stringify(data, null, 4)).type('application/json');
                    });
                },
                id: 'contacts'
            }
        }
    ]);

    next();
}


exports.register.attributes = {
    name: 'base'
};