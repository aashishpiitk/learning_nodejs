const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dishRouter = express.Router();
const Dishes = require('../models/dishes');

dishRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

dishRouter.route('/')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-type',"type/html");
//     next();
// })
.get((req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dishes);


    },(err) => next(err))
    .catch((err) => next(err));
    
})


.post(authenticate.verifyUser, (req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log("dish created");
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("not supported");
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        console.log("all dishes deleted");
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});




dishRouter.route('/:dishId')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-type',"type/html");
//     next();
// })

.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("not supported");
})

.put(authenticate.verifyUser, (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set: req.body
    },{
        new: true
    })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err) => next(err))
    .catch((err) => next(err));
});




dishRouter.route('/:dishId/comments')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-type',"type/html");
//     next();
// })
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null){
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(dish.comments);
        }
        else{
        res.statusCode = 404;
        err = new Error('dish'+req.params.dishId+'not found');
        return next(err);
        } 
    },(err) => next(err))
    .catch((err) => next(err));
    
})


.post(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null){
            dish.comments.push(req.body);//we are pushing comment because comments is an array declared inside dish
            dish.save()
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json(comment);
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
        res.statusCode = 404;
        err = new Error('dish'+req.params.dishId+'not found');
        return next(err);
        } 
    },(err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("not supported");
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null){
            for (var i=(dish.comments.length - 1); i>=0; i--){
                dish.comments.id(dish.comments[i]._id).remove()
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json(dish);
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
        res.statusCode = 404;
        err = new Error('dish'+req.params.dishId+'not found');
        return next(err);
        } 
    },(err) => next(err))
    .catch((err) => next(err));
});







dishRouter.route('/:dishId/comments/:commentId')
// .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('content-type',"type/html");
//     next();
// })

.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null){
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else{
        res.statusCode = 404;
        err = new Error('dish'+req.params.dishId+'not found');
        return next(err);
        } 
    },(err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("not supported");
})

.put(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json(dish);
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
            res.statusCode = 404;
            err = new Error('dish'+req.params.dishId+'not found');
            return next(err);
            }
    },(err) => next(err))
    .catch((err) => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null){
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json(resp);
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
        res.statusCode = 404;
        err = new Error('dish'+req.params.dishId+'not found');
        return next(err);
        } 
    },(err) => next(err))
    .catch((err) => next(err));
});




module.exports = dishRouter;