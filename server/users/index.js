import crypto from 'crypto';
import scmp from 'scmp';
import config from '../config';


var passwordCreate = function passwordCreate(password, cb){
	crypto.randomBytes(config.crypto.randomSize, function(err, salt){
		if (err)
			return cb(err, null);
        crypto.pbkdf2(password, salt.toString('base64'), config.crypto.workFactor, config.crypto.keylen, function(err, key){
            cb(null, salt.toString('base64'), key.toString('base64'));
        });
    });
};

var passwordCheck = function passwordCheck(password, derivedPassword, salt, work, cb){
    crypto.pbkdf2(password, salt, work, config.crypto.keylen, function(err, key){
        cb(null, scmp(key.toString('base64'), derivedPassword));
    });
};

var Users = {
	batman: {
		salt: '/T/4Q6I43+VtqMTSnuHOZsNg1XCMZw6dI5SZE3rzNyY=',
		password: 'nUPpnFNFXP2Q8rIs/f25Yr4AFK6K6AVJt/xarHRAweM=',
		work: 50,
		email: 'batman@gmail.com',
		id: 'batman',
		provider: 'local',
        name: 'batman',
	},
	superman: {
		salt: '/T/4Q6I43+VtqMTSnuHOZsNg1XCMZw6dI5SZE3rzNyY=',
		password: 'nUPpnFNFXP2Q8rIs/f25Yr4AFK6K6AVJt/xarHRAweM=',
		work: 50,
		email: 'superman@gmail.com',
		id: 'superman',
		provider: 'local',
        name: 'superman',
	},
	admin: {
		salt: '/T/4Q6I43+VtqMTSnuHOZsNg1XCMZw6dI5SZE3rzNyY=',
		password: 'nUPpnFNFXP2Q8rIs/f25Yr4AFK6K6AVJt/xarHRAweM=',
		work: 50,
		email: 'admin@gmail.com',
		id: 'admin',
		provider: 'local',
        name: 'admin',
	}
};

var findByUsername = function findByUsername(username, cb){
	cb(null, Users[username]);
};

var getAllUser = function getAllUser(){
	var userList = [];
	for (var i in Users) {
		var user = {};
		user.userid = Users[i].id;
		user.name = Users[i].name;
		user.email = Users[i].email;
		user.password = "********";
		userList.push(user);
	}
	return userList;
};

var addUser = function addUser(id, password, email, name, cb){
	//console.log('Users[id]: ' + JSON.stringify(Users[id]));
	if (Users[id] == undefined || Users[id] == null) {
		passwordCreate(password, function(err, salt, password){
			Users[id] = {
				salt: salt,
				password: password,
				work: config.work,
				email: email,
				id: id,
				provider: 'local',
				name: name
			};

			return cb(null, Users[id]);
		});
	}else{
		return cb('User exists!', null);
	}
};

var updatePassword = function(id, password, work){
	passwordCreate(password, function(err, salt, password){
		Users[id].salt = salt;
		Users[id].password = password;
		Users[id].work = work;
	});
};



exports.findByUsername = findByUsername;
exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.updatePassword = updatePassword;

exports.passwordCreate = passwordCreate;
exports.passwordCheck = passwordCheck;