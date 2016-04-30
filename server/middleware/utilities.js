import config from '../config';
import user from '../users/index';

exports.authenticated = function authenticated(req, res, next){
	console.log('req.session.isAuthenticated: ' + req.session.isAuthenticated);
	res.locals.isAuthenticated = req.session.isAuthenticated;
	if (req.session.isAuthenticated) {
		res.locals.user = req.session.user;
	}
	next();
};

exports.requireAuthentication = function requireAuthentication(req, res, next){
	if (req.session.isAuthenticated) {
		next();
	} else {
		//res.redirect(config.routes.login);
		res.status(400).send(JSON.stringify({
			status: 400,
			message: 'Sorry, login first!',
			detailed_message: 'Sorry, login first!'
		}));
	}
};

exports.auth = function auth(req, res) {
	let username = req.body.userid;
	let password = req.body.password;
	user.findByUsername(username, function(err, profile) {
		if (profile) {
			user.passwordCheck(password, profile.password, profile.salt, profile.work, function(err,isAuth){
				if (isAuth) {
					req.session.isAuthenticated = true;
					res.contentType('application/json').status(200);
					res.send(JSON.stringify({message: 'login OK'}));
				} else {
					console.log('Wrong Password');
					res.status(400).send(JSON.stringify({
						status: 400,
						message: 'Wrong Password',
						detailed_message: 'Wrong Password'
					}));
				}
			});
		} else {
			res.status(400).send(JSON.stringify({
				status: 400,
				message: 'Invalid userid',
				detailed_message: 'Invalid userid'
			}));
		}
	});
};

exports.logOut = function logOut(req){
	req.session.isAuthenticated = false;
	delete req.session.user;
};

exports.register = function register(req, res) {
	console.log(req.body.userid + ', ' + req.body.password + ', ' + req.body.email + ', ' + req.body.name);
	if (req.body.userid && req.body.password && req.body.email && req.body.name) {
		user.addUser(req.body.userid, req.body.password, req.body.email, req.body.name, function(err, profile){
			if (err) {
				console.log(err);
				res.set('Content-Type', 'application/json');
				res.status(400).send(JSON.stringify({
					status: 400,
					message: err ? 'Input error' : 'data error',
					detailed_message: err ? err.message : ""
				}));
			} else {
				res.contentType('application/json').status(200);
				console.log(user.getAllUser.length);
				res.send(JSON.stringify("succeeded to register for " + req.body.userid));
			}
		});
	} else {
		//req.flash('error', 'Please fill out all the fields');
		res.set('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({
			status: 400,
			message: 'Please fill out all the fields',
			detailed_message: 'Please fill out all the fields'
		}));
	}
};

exports.getUserList = function getUserList(req, res) {
	let userList = user.getAllUser();
	console.log(userList);
	res.contentType('application/json').status(200);
	res.send(JSON.stringify(userList));
};

exports.updateUser = function updateUser(req, res) {
	user.updatePassword(req.body.userid, req.body.password, config.work);
	res.contentType('application/json').status(200);
	res.send(JSON.stringify("succeeded to update for " + req.body.userid));
};