'use strict'

const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../models/user')

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/signup', (req, res) => {
	res.render('signup')
})

router.post('/signup', passport.authenticate('local', {

	successRedirect: '/profile',
	failureRedirect: '/index',
	failureFash: true
}))

router.get('/profile', (req, res) => {
	res.render('profile',{user: req.user})
})

router.get('/login', (req, res) => {
	res.render('login')
})

module.exports = router