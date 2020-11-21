const axios = require('axios').default;
const encode = require('form-urlencoded').default;
const host = 'http://www.recipepuppy.com';
const endpoint = '/api/?';

// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

module.exports = function () {

	this.getRecipes = async function (ingredients) {

		const PAGE_ONE = 1;
		const options = {
			i: ingredients.join(','),
			p: PAGE_ONE
		};

		const params = encode(options);
		const uri = `${host}${endpoint}${params}`;

		try {
			const response = await axios.get(uri);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	};

};