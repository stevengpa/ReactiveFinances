const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs-locals');

const app = express();
const dirName = __dirname;

app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(`${dirName}/public`));
app.engine('html', ejs);

app.set('views', `${dirName}/views`);
app.set('view engine', 'html');

app.get('*', (req, res) => {
	res.render('index');
});

const httpServer = http.createServer(app);
httpServer.listen(4001, () => {
	console.log('Running server in port 4001');
});
