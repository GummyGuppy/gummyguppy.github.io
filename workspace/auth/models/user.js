const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = mongoose.Schema({
	username: {type: String},
	password: {type: String}
})

UserSchema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

module.exports = mongoose.model('User', UserSchema)

