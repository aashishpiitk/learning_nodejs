const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log("connected to the database");

    // var newDish = Dishes({
    //     name:"uthapizza",
    //     description:"uthappam+pizza"
    // });

    // newDish.save()
    Dishes.create({
        name:"uthappizza",
        description:"uthappam + pizza"
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description:"updated description"}
        },
        {
            new:true
        })
        .exec();
    })
    .then((dishes) => {

        console.log(dishes);

        dishes.comments.push({
            rating:4,
            comment:"good",
            author:"aashishp"
        });

        return dishes.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.remove({});
    })
    .then((result) => {

        console.log(result);

        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));