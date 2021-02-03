const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength: 3
    }, 
    lastname: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength: 3
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }, 
    password: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength: 3
    },
    category: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minlength: 3
    },
    date: {
        type: Date,
        required: true,
    }
}, {
        timestamps: true,
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;