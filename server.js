//Create a server that send back static files
const http = require('http');
const fs = require('fs');
const url = require('url');
const PORT = 5678;
const hostName = 'localhost'

//Create HTTP Server
const server = http.createServer((req, res) =>{
    //Handle the request and send back a static file
    let parsedURL = url.parse(req.url, true);

    //Routing to appropriate file name
    let path = parsedURL.path;
    if(path =="/"){
        path = "index.html";
    }else if (path == "/about"){
        path = "about.html";
    }else if (path == "/contact"){
        path = "contact.html";
    }else{
        console.log(`Requested path ${path}`);
    }
    //Set path of file to read
    let file = __dirname + "/"+path

    //async read file function useing callback function
    fs.readFile(file, function (err, content){
        if(err){
            //If incorect URL entered in the browser
            console.log(`File Not Found ${file}`);
            res.writeHead(404);
            res.end('Page Not Found');
        }else{
            //Specify the content type in the response
            console.log(`Returning ${path}`);
            res.setHeader("X-Content-Type-Options", "nosniff");
            switch(path){
                case "/index.css":
                    res.writeHead(200, { "Content-Type" : "text/css"});
                    break;
                case "index.html":
                    res.writeHead(200, { "Content-Type" : "text/html"});
                    break;
                case "about.html":
                    res.writeHead(200, { "Content-Type" : "text/html"});
                    break;
                case "contact.html":
                    res.writeHead(200, { "Content-Type" : "text/html"});
                    break;
            }
            res.end(content)
        }
    });
});

//Listen to localhost server on the specified Port
server.listen(PORT, hostName, () =>{
    console.log('Listening in port 5678');
});
