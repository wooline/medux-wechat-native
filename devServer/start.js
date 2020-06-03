const express = require('express');
const chalk = require('chalk');
const path = require('path');

const {createProxyMiddleware} = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const devMock = require('@medux/dev-utils/dist/express-middleware/dev-mock');
const {proxy, server, mock} = require('./env.json');
const app = express();
const [, , port] = server.split(/:\/*/);

app.use('/client', express.static(path.join(__dirname, './client'), {fallthrough: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(devMock(mock, proxy, true, path.join(__dirname, './mock')));
app.use('/api', createProxyMiddleware(proxy['/api/**']));
app.listen(port, () => console.info(chalk`.....${new Date().toLocaleString()} starting {red Demo Server} on {green ${server}/} \n`));
