'use strict'

const express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	ejs = require('ejs'),
	MongoStore = require('connect-mongo')(session)


const app = express()

mongoose.connect('mongodb://admin:admin@ds023523.mlab.com:23523/pollsolutions')

let routes = require('./controllers/user')

require('./config/passport')

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(routes)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cookieParser)

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({mongooseConnection: mongoose.connection})

}))

app.use(passport.initialize())
app.use(passport.session())



app.listen(3000, () => {
	console.log('listening on port 3000')
})