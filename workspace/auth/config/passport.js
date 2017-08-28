'use strict'

const passport = require('passport')
//require strategy
const LocalStrategy = require('passport-local').Strategy

//require model
const User = require('../models/user')

//save user sessions

//serialize //get user id and save in session
passport.serializeUser((user, done) => {
	done(null, user.id)
})
//deserialize
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.use('local', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, (req, username, password, done) => {

	User.findOne({username : username}, (err, user) => {
		if(err) {return done(err)}
		if(user){
			return done(null, false)
		}

		let newUser = new User()
		newUser.username = req.body.username
		newUser.password = newUser.encryptPasssword(req.body.password)

		newUser.save((err) => {
			if(err) {return done(err)}
			return done(null, newUser)
		})
	})
}))