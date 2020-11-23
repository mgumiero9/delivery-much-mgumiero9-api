const axios = require('axios').default;
const encode = require('form-urlencoded').default;
const host = 'http://www.recipepuppy.com';
const endpoint = '/api/?';

module.exports = function () {

	this.getRecipes = async function (ingredients) {

		const PAGE_ONE = 1;
		const options = {
			i: ingredients,
			p: PAGE_ONE
		};

		const params = encode(options);
		const uri = `${host}${endpoint}${params}`;

		try {
			return await axios.get(uri);
		} catch (error) {
			return error;
		}
	};

};