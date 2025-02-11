const express = require('express'), http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express()

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
// app.use((req, res,next) => {
//     console.log(req.headers);

//     res.statusCode = 200;
//     res.setHeader('Content-Type','type/html');
//     res.end('<html><body><h1>This is an Express Server</h1></body></html>');
// });


const dishRouter = require('./routes/dishRouter');
app.use('/dishes',dishRouter);
app.use('/dishes/:dishId',dishRouter);


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`the server is running at http://${hostname}:${port}/`)
});
