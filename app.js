const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs-locals');
const expressJwt = require('express-jwt');
const config = require('config');
const methodOverride = require('method-override');

const app = express();
const dirName = __dirname;

const secret = config.get('app.security.secret');
const {authenticate} = require('./private/utils/authentication');

app.use(cors());
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(`${dirName}/public`));
app.engine('html', ejs);

app.set('views', `${dirName}/views`);
app.set('view engine', 'html');

app.get('*', (req, res, next) => {
	if (req.url.indexOf('/api') !== -1) {
		return next();
	}
	res.render('index');
});

const jwtMiddleware = expressJwt({secret})
	.unless({path: ['/', '/favicon.ico', '/login', '/signup', '/signup/register']});
app.use(jwtMiddleware);

const signupRouter = require('./private/router/signup');
app.use('/', signupRouter);

const settingsRouter = require('./private/router/settings');
app.use('/api/settings', settingsRouter);

const filtersRouter = require('./private/router/filters');
app.use('/api/filters', filtersRouter);

const loginRouter = require('./private/router/login');
app.use('/', authenticate, loginRouter);


const httpServer = http.createServer(app);
httpServer.listen(4001, () => {
	console.log('Running server in port 4001');
});
