/* globals locals:true */

const env = process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null;
const createError = require('http-errors');
const express = require('express');
const api = express();
const port = process.env.DM_API_PORT || 3000;
const logger = require('morgan');

api.use(logger('combined'));
api.use(express.json());


api.get('/', (req, res) => {
	res.send(process.env);
});

// catch 404 and forward to error handler
api.use(function(req, res, next) {
	next(createError(404));
});

// error handler
api.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send({error: err});
});

api.listen(port, () => {
	console.log(`Example API listening at http://localhost:${port}`);
});
