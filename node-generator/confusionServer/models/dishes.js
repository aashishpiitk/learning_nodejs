const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
},  {
    timestamps: true
    }
);

var dishSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            required: true
        },
        comments:[commentSchema],
        price:{
            type: Currency,
            required: true,
            min: 0
        }
    },
    
    {
        timestamps: true
    }
);


var Dishes = mongoose.model('Dish',dishSchema);
// var Comments = mongoose.model('Comment',commentSchema);

// module.exports = Comments;
module.exports = Dishes;