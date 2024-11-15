const express = require('express')
const app = express()
const port = 3000

/*To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
*/
app.use(express.static('assets'))

// view engine setup -> We'll use handlebars.js as our templating engine
app.set('view engine', 'html');
// allows our application to use .html extension | *Create a views folder and add your HTML documents
app.engine('html', require('hbs').__express);

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) {
	console.log("Sent as a get request");
    var username = req.params.username;

	res.render('home', { title: "Routing in Action!",  username: username})
})

app.get('/users/:id', function (req, res) {
	//Getting id parameter
	var id = req.params.id;
    var username = req.params.username;
	console.log("Sent as a get request");
	res.render('home', { title: "Routing in Action!", user_id : id})
})

app.get('/contact', function (req, res) {

	res.render( 'contact', {title : "Contact Page"})
 })

 app.post('/submit', function (req, res) {
	//Getting body parameters
	var data = req.body;
	var firstName = data.fname;
	var lastName = data.lname;
	var id = data.id;

	console.log("Sent as a post request");
	console.log(firstName + " " + lastName + " " + id );
	res.render( 'contact', {title : "Contact Page", firstName: firstName, lastName: lastName, id: id})
 })

 app.post('/submit_form_two', function (req, res) {
	//Getting body parameters
	var data = req.body;
	var firstName = data.fname;
	var lastName = data.lname;
	var id = data.id;

	console.log("Sent as a post request");
	console.log(firstName + " " + lastName + " " + id );
	res.render( 'contact', {title : "Contact Page", firstName: firstName, lastName: lastName, id: id})
 })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))