const http = require('http'); 
const fs = require('fs'); 


const server = http.createServer((req, res) => {
    //handle every single request with this callback

    if(req.url == "/about" && req.method == "GET"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("about.html", function(err, data){

            res.write(data);
            res.end();
        })
        
    }else if(req.url == "/contact" && req.method == "GET"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        fs.readFile("contact.html", function(err, data){

            res.write(data);
            res.end();
        })
        
    }else if(req.url =="/" && req.method == "GET"){
        res.writeHead(200,  {'Content-Type': 'text/html'});
        fs.readFile("index.html", function(err, data){
            res.write(data);
            res.end();
        })
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("Home Page");
        res.end();
    }

  }).listen(3000);



  