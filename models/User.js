const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

User.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next
    try{
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }catch(error){
        console.log(error);
    }
});

User.methods.comparePassword = async function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', User)