const http=require('http');
const fs = require('fs');
const path = require('path');

const hostname='localhost';
const port=3000;

const server = http.createServer((req,res) => {

    console.log("Request for "+req.url+"is recieved with request method "+req.method);

    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);
        const fileExt=path.extname(filePath);

        if(fileExt == '.html'){
            fs.exists(filePath,(exists) => {           //callback function
                if(!exists){
                    res.statusCode = 404;            //can access this variable due to property of closure
                    res.setHeader('Content-tpye','html/text');
                    res.end('<html><body><h1>Error 404:file does not exist</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-type','html/text');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode = 404;            //can access this variable due to property of closure
            res.setHeader('Content-tpye','html/text');
            res.end('<html><body><h1>Error 404:not an html page</h1></body></html>');
            return;
        }
        
    }
    else{
        res.statusCode = 404;            //can access this variable due to property of closure
        res.setHeader('Content-tpye','html/text');
        res.end('<html><body><h1>Error 404:method is not supported</h1></body></html>');
        return;
    }
    // res.statusCode=200;
    // res.setHeader('Contesnt-type','text/html');
    // res.end('<html><body><h1>Hello world</h1></body></html>');
})

server.listen(port,hostname,()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
});