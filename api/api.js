(function buildApi() {
	'use strict';

	const env = process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null;
	const createError = require('http-errors');
	const express = require('express');
	const port = process.env.DM_API_PORT || 3000;
	const logger = require('morgan');
	const _ = require('lodash');

	const Recipe = require('./model/recipe');
	const Image = require('./model/image');
	const recipe = new Recipe();
	const image = new Image();

	const api = express();

	api.use(logger('combined'));
	api.use(express.json());

	async function buildModel(req, res) {
		const ingredients = req.params['i'] || ['potato', 'cheese']; // TODO: REMOVE ARRAY MOCKED
		const model = {
			keywords: ingredients,
			recipes: []
		};

		try {
			const response = await recipe.getRecipes(ingredients);
			const recipes = response && response.data && response.data.results;
			for (const item of recipes) {
				const gif = await image.getImage(_.get(item, 'title'));
				model.recipes.push({
					title: item.title,
					ingredients: item.ingredients,
					link: item.href,
					gif: _.get(gif, 'data.data["0"].images.original.url', 'image not available...')
				});
			}
			res.send(model);
		} catch (e) {
			res.send({error: e});
		}
	}

	api.get('/recipes', async (req, res) => {
		await buildModel(req, res);
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

	return api;

})();
