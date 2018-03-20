
var Contact = require('./model/contact');
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
                handler:Contact.GetAll,
                id: 'contacts'
            }
        }
    ]);

    next();
}


exports.register.attributes = {
    name: 'base'
};