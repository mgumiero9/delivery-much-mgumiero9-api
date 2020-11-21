const axios = require('axios').default;
const apiKey = process.env.IMAGE_API_KEY;
const encode = require('form-urlencoded').default;
const host = 'https://api.giphy.com';
const endpoint = '/v1/gifs/search?';

module.exports = function () {

	this.getImage = async function (title) {

		const ALL_AUDIENCES = 'g';
		const ENGLISH = 'en';
		const options = {
			api_key: apiKey,
			q: title,
			limit: 1,
			offset: 0,
			rating: ALL_AUDIENCES,
			lang: ENGLISH
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