module.exports.buildApi = () => {
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

	api.getAlphaSorted = (txtList) => {
		let arr = [];
		if (typeof txtList === 'string') {
			txtList = txtList.replace(/ /g, '');
			arr = txtList.split(',');
			arr = arr.sort(function(a, b){
				if(a < b) { return -1; }
				if(a > b) { return 1; }
				return 0;
			});
		}
		return arr;
	}

	api.checkInput = (req, res, next)  => {
		const ingredients = req.query['i'];
		try {
			if (!(typeof ingredients === 'string' &&
				ingredients.length > 0 &&
				ingredients.split(',').length <= 3)) {

				next(createError('Bad Request'));
			}
		} catch (e) {
			next(createError(e));
		}
		return ingredients;
	}

	function sendError(res, e) {
		return res
			.status(e.status || 500)
			.send({
				Error: e
			});
	}

	api.buildModel = async (req, res, next)  =>  {
		try {
			const ingredients = api.checkInput(req, res, next);
			const model = {
				keywords: ingredients,
				recipes: []
			};

			const response = await recipe.getRecipes(ingredients);
			const recipes = response && response.data && response.data.results;
			for (const item of recipes) {
				try {
					const gif = await image.getImage(_.get(item, 'title'));
					model.recipes.push({
						title: item.title,
						ingredients: api.getAlphaSorted(item.ingredients),
						link: item.href,
						gif: _.get(gif, 'data.data["0"].images.original.url', 'image not available...')
					});
				} catch (e) {
					e.intMsg = 'Image API is unavailable. Please try again later.';
					return sendError(res, e);
				}
			}
			return res.send(model);
		} catch (e) {
			e.intMsg = 'Recipe API is unavailable. Please try again later.';
			sendError(res, e);
		}
	}

	api.get('/recipes', async (req, res, next) => {
		await api.buildModel(req, res, next);
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

};
