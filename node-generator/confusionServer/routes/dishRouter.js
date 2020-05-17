const express = require('express');
const bodyParser = require('body-parser')

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type',"type/html");
    next();
})

.get((req, res, next) => {
    res.end("will send details of  all the dishes");
})

.post((req, res, next) => {
    res.end("new dish is created");
})

.put((req, res, next) => {
    res.end("not supported");
})

.delete((req, res, next) => {
    res.end("delete all the dishes");
});




dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type',"type/html");
    next();
})

.get((req, res, next) => {
    res.end("will send details of  the dishe to you with dish id"+req.params.dishId);
})

.post((req, res, next) => {
    res.end("not supported");
})

.put((req, res, next) => {
    res.end("will modify the dish with "+req.params.dishId);
})

.delete((req, res, next) => {
    res.end("delete the dishe"+req.params.dishId);
});



module.exports = dishRouter;