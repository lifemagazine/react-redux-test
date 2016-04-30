import express from 'express';
import util from '../middleware/utilities';
import user from '../users/index';


function login(req, res) {
	if (req.body.userid && req.body.password) {
		util.auth(req, res);
	} else {
		//req.flash('error', 'Please fill out all the fields');
		res.set('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({
			status: 400,
			message: 'Please fill out all the fields',
			detailed_message: 'Please fill out all the fields'
		}));
	}
}

function logout(req, res) {
	util.logOut(req);
	res.contentType('application/json').status(200);
	res.send(JSON.stringify("succeeded to logout"));
}

function register(req, res) {
	util.register(req, res);
}

function getUserList(req, res) {
	util.getUserList(req, res);
}

function updateUser(req, res) {
	if (req.body.userid && req.body.password) {
		util.updateUser(req, res);
	} else {
		//req.flash('error', 'Please fill out all the fields');
		res.set('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({
			status: 400,
			message: 'Please fill out all the fields',
			detailed_message: 'Please fill out all the fields'
		}));
	}
}
 
exports.login = login;
exports.logout = logout;
exports.register = register;
exports.getUserList = getUserList;
exports.updateUser = updateUser;