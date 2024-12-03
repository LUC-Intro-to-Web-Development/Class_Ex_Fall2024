
//User object
var res = {
    name: "C. Fulton",
    course: "COMP 251",
    calcNums: function(){
        return 2 + 5;
    }
}

var aNumber = 23;
var aNumberAgain = 44;

//Call function
someFunction(3, 2, res);


//Define function with three parameters
function someFunction(num1, num2, someUser){
    var sum = num1 + num2;
    console.log("Total: " + sum + " User: " + someUser.name);
}



