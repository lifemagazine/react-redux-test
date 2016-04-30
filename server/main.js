import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes/index';
import util from './middleware/utilities';
import cookieParser from 'cookie-parser';



const app = express();

app.use(cookieParser(config.secret));
app.use(session({secret: config.secret}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(util.authenticated);
 


app.use('/', express.static(__dirname + '/../public'));
 
//app.get('/hello', (req, res) => {
//    return res.send('test');
//});
 

app.post('/login', routes.login);
app.post('/logout', [util.requireAuthentication], routes.logout);
app.post('/register', routes.register);
app.get('/users', [util.requireAuthentication], routes.getUserList);
app.post('/users/:userid', [util.requireAuthentication], routes.updateUser);

 
 
const server = app.listen(config.port, () => {
    console.log('Express listening on port', config.port);
});
