const express = require('express')
const dbOperations = require('./database.js');
const app = express()
const port = 3000

/**To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
**/
app.use(express.static('assets'))

// view engine setup
app.set("view engine", "hbs");

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Rout to  home
app.get('/', function (req, res) {
	
	dbOperations.getAllItems(res);  //Where is this coming from

})

app.post('/update', async function(req, res){

	try{
		var itemID = req.body.deleterecord;
		var aRow = await dbOperations.getOneItem(itemID);
		console.log(aRow);
		res.render('update', {aRow})

	}catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).send('An error occurred while retrieving the item.');
    }


	
});


app.post('/update_item', function (req, res) {
    var itemCount = req.body.item_count;
	var itemName = req.body.item_name;
	var itemID = req.body.item_id;
	
	dbOperations.updateItem(itemName, itemCount, itemID);
	res.redirect('/');

})

// Route to create a grocery list item
 app.post('/create_item', function (req, res) {
	//Getting body parameters
	const { item_name, item_count} =req.body;

	//Execute creatItems method
	dbOperations.createItem(item_name, item_count, res);

	
 })

 // Route that allows me to delete a grocery list item
 app.post('/delete_item', function (req, res) {
	//Getting body parameters
	const { deleterecord} = req.body;
	dbOperations.deleteItem(deleterecord);
	res.redirect('/');
	
 })

 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))