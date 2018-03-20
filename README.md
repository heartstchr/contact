#Steps to follow


>To clone git repository
````sh
git clone
````
>To get all dependencies of server
````sh
npm install
````
>To get all dependencies of client
````sh
bower install
````
>To run server
````sh
forever -w server.js
````
>To view in browser
````sh
http://localhost:7777
````


##**_Optimisation_**

	* Minified css.
	* css at the top and js at bottom.
	* No use of Bootstrap to reduce load time.
	* Reduce DNS lookup.
