const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }, 
    comment_author: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }, 
    comment_status: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }, 
    comment_post_id: {
        type: Number,
        required: true
    },
    comment_id: {
        type: Number,
        required: true
    },
    comment_content: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },   
    comment_date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;