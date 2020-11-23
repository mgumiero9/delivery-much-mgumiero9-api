require('dotenv').config();
const assert = require('assert');
const _ = require('lodash');
const axios = require('axios').default;

describe('Test Fetch Recipes Api', () => {
	const uri = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';
	it('should return a text with more than 0 characters', async () => {
		const response = await axios.get(uri);
		assert.ok(_.get(response, 'data.results[0].title').length > 0);
	});
});

describe('Test Fetch API Modules', () => {

	describe('Test Fetch Recipe API Module', () => {
		const Recipe = require('../api/model/recipe');
		const recipe = new Recipe();
		const ingredients = 'onions, cheese';
		it('should return a text with more than 0 characters', async () => {
			const response = await recipe.getRecipes(ingredients);
			assert.ok(_.get(response, 'data.results[0].title').length > 0);
		});
	});

	describe('Test Fetch Image API Module', () => {
		const Image = require('../api/model/image');
		const image = new Image();
		const title = 'Beet With Orange Puree Recipe';
		it('should return a text with more than 0 characters', async () => {
			const response = await image.getImage(title);
			assert.ok(_.get(response, 'data.data["0"].images.original.url').length > 0);
		});
	});
});

describe('Test getAlphaSorted()', () => {
	const Api = require('../api/api').buildApi();
	const txtList = 'onions,garlic';
	it('should return an array with 2 elements: onions and garlic', async () => {
		const result = Api.getAlphaSorted(txtList);
		assert.notStrictEqual(result, ['garlic' ,'onions']);
	});
});
