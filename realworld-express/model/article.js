const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    tagList: {
        type: [String],
        default: null
    },
    favorited: {
        type: Boolean,
        default: false
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
})
module.exports = articleSchema;