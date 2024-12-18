var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./grocerydb.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});
/**
 * The sqlite3 Node.js package gives a handful of different methods for executing queries, but the ones I will be focusing on in this tutorial are:

        run: used to create or alter tables and to insert or update table data
        get: select a single row of data from one or more tables
        all: select multiple rows of data from one or more tables
 */


//Create a Grocery List Item
let createItem = (item_name, item_count, res) =>{
    var createGroceryListItem = 'INSERT INTO grocery_item (item_name, item_count) VALUES (?,?)' //Parameterized Query
    var params = [item_name, item_count];
    
    db.run(createGroceryListItem, params, function(err){

        if(err){
            return console.log(err.message);
        }
        
        console.log("Grocery Item Created");
        console.log(`Rows inserted ${this.changes}`);
    })
    getAllItems(res);

}


//Get One Item

let getOneItem = (itemID) => {

  return new Promise((resolve, reject) => {

    var getOneItem = 'SELECT itemID, item_name, item_count FROM grocery_item WHERE itemID = ?';
    var params =  [itemID];
    db.get(getOneItem, params,function(err, row){
        if (err) {
         
            reject(err);
          }
          /*rows.forEach((row) => {
            console.log(row.item_name);
          });*/
          //console.log(row);
          resolve(row);
          
          //res.render('update', {row})

    })

  })

  
}

//Display all Grocery all grocery List Items
let getAllItems = (res) => {
    var getAllGroceryItems = 'SELECT itemID, item_name, item_count FROM grocery_item';
    db.all(getAllGroceryItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          /*rows.forEach((row) => {
            console.log(row.item_name);
          });*/
          console.log(rows);
          res.render('index', {rows})

    })
}

//Update item
let updateItem = (item_name, item_count, itemID) => {
    var updateItem = 'UPDATE grocery_item SET item_name =? , item_count=? WHERE itemID = ?';
    var params =[item_name, item_count,itemID];

    db.run(updateItem, params, function(err, rows){
        if (err) {
         
            throw err;
          }
          /*rows.forEach((row) => {
            console.log(row.item_name);
          });*/
          console.log("Item Updated");
          

    })
}

let deleteItem = (recordToDelete) =>{
    
  var deleteGroceryItem = 'DELETE FROM grocery_item WHERE itemID = ?';

  var params = [recordToDelete];

db.run(deleteGroceryItem, params, function(err){
  if (err){
    return console.log(err.message);
  }
  

  console.log("Grocery Item Deleted");
  console.log(`Rows deleted ${this.changes}`);	  
});

}

//Delete a Grocery List Item
/*let deleteItem = (recordToDelete, res) =>{
    
    var deleteGroceryItem = 'DELETE FROM grocery_item WHERE itemID = ?';
	
    var params = [recordToDelete];

	db.run(deleteGroceryItem, params, function(err){
		if (err){
			return console.log(err.message);
		}
    

		console.log("Grocery Item Deleted");
		console.log(`Rows deleted ${this.changes}`);	  
	});

    getAllItems(res);
}*/

module.exports = {deleteItem, createItem, getAllItems, updateItem, getOneItem}
