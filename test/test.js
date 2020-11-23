require('dotenv').config();
const assert = require('assert');
const _ = require('lodash');
const axios = require('axios').default;

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.strictEqual([1, 2, 3].indexOf(4), -1);
		});
	});
});

describe('Fetch Recipes Api', function() {
	const uri = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';
	it('should return a text with more than 0 characters', async function() {
		const response = await axios.get(uri);
		assert.ok(_.get(response, 'data.results[0].title').length > 0);
	});
});

describe('Fetch Recipe API Module', function() {
	const Recipe = require('../api/model/recipe');
	const recipe = new Recipe();
	const ingredients = 'onions, cheese';
	it('should return a text with more than 0 characters', async function() {
		const response = await recipe.getRecipes(ingredients);
		assert.ok(_.get(response, 'data.results[0].title').length > 0);
	});
});

describe('Fetch Image API Module', function() {
	const Image = require('../api/model/image');
	const image = new Image();
	const title = 'Beet With Orange Puree Recipe';
	it('should return a text with more than 0 characters', async function() {
		const response = await image.getImage(title);
		assert.ok(_.get(response, 'data.data["0"].images.original.url').length > 0);
	});
});