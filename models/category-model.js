const mongoose = require('mongoose');
const Schema = mongoose.Schema

//category schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }

);

//category model
const Category = mongoose.model('category', categorySchema);

module.exports = Category;


